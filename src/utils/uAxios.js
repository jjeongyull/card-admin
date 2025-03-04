/**
 * axios 함수 및 전처리
 * RESTful API 디자인 원칙에 따라 GET, POST, PUT, PATCH, DELETE 구현
**/

import axios from 'axios'
import { uMessage, uRouter, uCommon } from '@/assets/utils'
import { errorMsg } from '@/config/constants'
import storeGlobal from '@/store/helper/global/storeGlobal'

/* axios instance */
const instance = axios.create({
  /**
   * TODO : 환경 변수에 기본값 설정 필요
   * baseURL : import.meta.env.VITE_API_BASE_URL (환경 변수에 설정)
   * timeout : import.meta.env.VITE_API_TIMECOUT (환경 변수에 설정)
   */
  baseURL: '',
  timeout: 30000,
})

/**
 * 요청 interceptors
 * TODO : Authorization 누락 시 예외 처리 필요. storeGlobal.getToken()이 null 또는 undefined일 경우, Bearer null이 될 수 있으므로 Authorization 헤더를 조건부로 설정 필요.
 * const token = storeGlobal.getToken();
 * ...(token && { Authorization: `Bearer ${token}` }),
 * ==> ...(스프레드 연산자)의 역할 확인할 것
**/
instance.interceptors.request.use(
  function (config) {
    if (config.method === 'delete') {
      config.headers.permit = 'd'
    }
    const token = storeGlobal.getToken();
    config.headers = {
      Authorization: 'Bearer ' + storeGlobal.getToken(),
      'Content-type': 'application/json',
      menuid: storeGlobal.getLastMenuMenuId(),
      permit: config.headers.permit || '',
      refreshtoken: config.headers.refreshtoken || ''
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/* 응답 interceptors */
instance.interceptors.response.use(
  function (response) {
    if (response.config.url !== '/api/test/app/info') storeGlobal.setLoginInterval()
    // console.log('method.js', response)
    return response
  },
  function (error) {
    try {
      const data = error.response.data
      if (data.status === 4001) {
        return resolveAuth(error.config)
      } else if (data.status === 4002) {
        forceToLogout(data.msg)
      } else if (data.status === 4003) {
        // uAPIPersonal.login()
        storeGlobal.clearAuth()
        uRouter.replace('Error', { title: data.status, message: data.msg })
      } else {
        /* 기타 오류 모달 알림 */
        const msg = data.msg || errorMsg.e503.message
        /**
         * TODO : showSingleAlertBox에 직접 HTML 전달되지 않도록 (consts.js에 상수 처리)
        **/
        uMessage.showSingleAlertBox('알림', '<span class="ti ti-alert-circle error-alert-msg">&nbsp;' + msg + '</span>', '확인')
      }
    } catch (e) {
      uMessage.showSingleAlertBox('알림', '<span class="ti ti-alert-circle error-alert-msg">&nbsp;' + errorMsg.e0.message + '</span>', '확인')
    }
    return Promise.reject(error)
  }
)

/**
 * access token 만료로 재발급 요청 및 마지막 요청 retry 
 * TODO : config가 없을 경우 처리 필요, config가 undefined일 경우, instance.request(config) 실행 시 에러 발생. 상세 에러 처리 필요
 const resolveAuth = async (config = {}) => { // 기본값 설정정
  try {
    const response = await instance.get(process.env.API_SERVER.API.PERSONAL.RESOLVE_AUTH.URI, { 
      headers: { refreshtoken: storeGlobal.getRefreshToken() }
    });

    if (response.status === 200) {
      const headers = response.headers;
      storeGlobal.setToken(headers.accesstoken);
      storeGlobal.setRefreshToken(headers.refreshtoken);
      return instance.request(config);
    } else {
      console.error(`[ERROR] Auth resolve failed: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('[ERROR] Failed to resolve auth token', {
      url: config.url || 'UNKNOWN', // 요청한 API URL
      message: error.message || 'No error message', // 에러 메시지
      responseData: error.response?.data || 'No response data', // 응답 데이터
      status: error.response?.status || 'Unknown status', // 응답 상태 코드
      headers: error.response?.headers || 'No headers', // 응답 헤더
    });

    throw error; // 에러를 다시 던져서 상위에서 처리할 수 있도록 함
  }
};
**/
const resolveAuth = async (config) => {
  const response = await instance.get(process.env.API_SERVER.API.PERSONAL.RESOLVE_AUTH.URI,
    { headers: { refreshtoken: storeGlobal.getRefreshToken() } })
  if (response.status === 200) {
    const headers = response.headers
    storeGlobal.setToken(headers.accesstoken)
    storeGlobal.setRefreshToken(headers.refreshtoken)
    return instance.request(config)
  } else {
    /**
     * TODO : 에러 처리를 위와 같이 해야 함. 단순히 error만 찍으면 안됨
     */
    console.log('error')
  }
}

const resolveAuthWithTimer = async () => {
  const response = await instance.get(process.env.API_SERVER.API.PERSONAL.RESOLVE_AUTH.URI,
    { headers: { refreshtoken: storeGlobal.getRefreshToken() } })
  if (response.status === 200) {
    const headers = response.headers
    storeGlobal.setToken(headers.accesstoken)
    storeGlobal.setRefreshToken(headers.refreshtoken)
  } else {
    console.log('error')
  }
}

/**
 * 모든 인증 실패로 자동 로그아웃 처리
 * 참고 : 4002는 accesstoken 및 refreshtoken 모두 만료 코드
 * TODO : forceToLogout이 중복 호출될 가능성 존재, isLogOut 변수를 사용해 한번만 실행되도록 수정해야 함.
 * let isLogOut = false;  // 글로벌 변수 처리 필요
**/
const forceToLogout = (msg) => {
  /** 코드 추가 필요
   * if (isLogOut) return; // 이미 로그아웃 중이면 실행하지 않음
        isLogOut = true;
  **/
  storeGlobal.clearLoginInterval()
  if (!uCommon.isEmpty(msg)) uMessage.showMessage(msg, 'error')
  storeGlobal.clearAuth()
  uRouter.replace('Login')
  /** 코드 추가 필요
   * setTimeout(() => {
      isLogOut = false; // 3초 후 다시 실행 가능하도록 초기화
      }, 3000
   */
}

/*********************************************************************
업무로직 api crud request는 get post, patch, del 템플릿 함수 사용!
단 특수한 경우 instance로 직접 작성 사용
참고 : 업무로직 crud는 권한 확인을 위해 headers에 permit이 필수이다.
instance 직접로 작성하는 경우 permit이 필요하지 않은 로직에 사용!
*********************************************************************/
/* 조회 */
const get = (api, condition) => {
  const query = condition || ''
  return instance.get(api + query,
    {
      headers: { permit: 'r' }
    }
  )
}

/**
 * CREATE 
 * @param {*} api 
 * @param {*} body 
 * @returns 
 * TODO : 에러 처리 필요, PUT, DEL 모두 처리 필요요
    try {
      return await instance.post(api, body, { headers: { permit: 'c' } });
    } catch (error) {
      console.error(`[POST ERROR] ${api} -`, error.response?.data || error.message);
      throw error;
    }
 */
const post = (api, body) => {
  return instance.post(api, body,
    {
      headers: { permit: 'c' }
    }
  )
}

/* 수정 */
const put = (api, body) => {
  return instance.put(
    api,
    body,
    {
      headers: { permit: 'u' }
    }
  )
}

/* 삭제 */
const del = (api, body) => {
  return instance.delete(
    api,
    body,
    {
      headers: { permit: 'u' }
    }
  )
}

/**
 * 업로드 처리
 * TODO : 업로드 취소 기능 추가 필요
 * @param {*} api 
 * @param {*} body 
 * @param {*} progressCallback 
 * @returns 
 * 
  const upload = (api, body, progressCallback) => {
    const controller = new AbortController(); // ✅ 업로드 취소 컨트롤러 생성

    const request = instance.post(api, body, {
      timeout: 180000,
      headers: { permit: 'c', 'Content-Type': 'multipart/form-data' },
      signal: controller.signal, // ✅ 요청 취소 기능 추가
      onUploadProgress: progressEvent => {
        progressCallback(progressEvent);
      }
    });

    request.cancel = () => controller.abort(); // ✅ 요청 취소 함수 추가
    return request;
    };
  */
const upload = (api, body, progressCallback) => {
  return instance.post(api, body,
    {
      timeout: 180000,
      headers: { permit: 'c', 'Content-Type': 'multipart/form-data' },
      onUploadProgress: progressEvent => {
        progressCallback(progressEvent)
      }
    }
  )
}

const download = (api, progressCallback) => {
  return instance.get(api,
    {
      timeout: 180000,
      headers: { permit: 'r' },
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        if (!uCommon.isEmpty(progressCallback)) {
          progressCallback(progressEvent)
        }
      }
    }
  )
}

const excelDownload = (api, condition, progressCallback) => {
  const query = condition || ''
  return instance.get(api + query,
    {
      timeout: 180000,
      headers: { permit: 'r' },
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        if (!uCommon.isEmpty(progressCallback)) {
          progressCallback(progressEvent)
        }
      }
    }
  )
}

const postExcelDownload = (api, condition, progressCallback) => {
  return instance.post(api, condition,
    {
      timeout: 180000,
      headers: { permit: 'r' },
      responseType: 'blob',
      onDownloadProgress: progressEvent => {
        if (!uCommon.isEmpty(progressCallback)) {
          progressCallback(progressEvent)
        }
      }
    }
  )
}

export default {
  instance,
  upload,
  download,
  excelDownload,
  postExcelDownload,
  get,
  post,
  put,
  del,
  resolveAuthWithTimer,
  forceToLogout
}
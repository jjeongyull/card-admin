/**
 * 상수 정의 (메시지 등)
**/
export const ui = {
  theme: {
    indigo:
      { value: 'indigo', label: '인디고' },
    white:
      { value: 'white', label: '밀크화이트' },
    blue:
      { value: 'blue', label: '딥오션' },
    black:
      { value: 'black', label: '다크' }
  },
  cookies: { theme: 'theme' }
}

export const aesKey = 'aeskey1234567898'

export const attachment = {
  /*
  1MB: 1048576
  5MB: 5242880
  10MB: 10485760
  20MB: 20971520
  50MB: 52428800
  100MB: 104857600
  참고: API서버는 max 100MB로 되어 있음
  */
  maxSize: 20971520,
  whiteList: ['jpg', 'jpeg', 'bmp', 'png', 'pdf', 'hwp', 'hwpx', 'doc', 'docx', 'xls', 'xlsx', 'xlsb', 'ppt', 'pptx', 'cell', 'csv', 'txt', 'htm', 'html', 'xml', 'json', 'zip'],
  imgWhiteList: ['jpg', 'jpeg', 'bmp', 'png']
}

export const message = {
  auth: {
    m1: '로그인 되었습니다.',
    m2: '로그아웃 되었습니다.'
  }
}

export const errorMsg = {
  e0: { status: 0, message: '네트워크 오류로 인해 서비스를 이용할 수 없습니다.' },
  e1: { status: 0, message: '이미 조회중입니다.' },
  /* 표준 http status */
  e401: { status: 401, message: ['접근권한이 없거나 로그인하지 않았습니다.', '접근권한이 없거나 세션이 만료되었습니다.'] },
  e404: { status: 404, message: '알수없는 페이지로 접근하였습니다.' },
  e503: { status: 503, message: '서비스를 이용할 수 없습니다. 관리자에게 문의하세요.' },
  /* 내부 오류 코드 정의 */
  e4003: { status: 4003, message: ['접근권한이 없거나 로그인하지 않았습니다.', '접근권한이 없거나 세션이 만료되었습니다.'] }
}

/* 검색범위 */
export const searchScope = {
  a: { code: 'A', name: '전체조회' },
  d: { code: 'D', name: '본부조회' },
  t: { code: 'T', name: '부서조회' },
  p: { code: 'P', name: '개인조회' }
}

/* 권한 */
export const taskCode = {
  nep: { code: 'NEP', name: '일반' },
  nth: { code: 'NTH', name: '부서장' },
  ndh: { code: 'NDH', name: '본부장' },
  aph: { code: 'APH', name: '물리' },
  ama: { code: 'AMA', name: '관리' },
  ate: { code: 'ATE', name: '기술' },
  apr: { code: 'APR', name: '개인정보' },
  aaa: { code: 'AAA', name: '관리자' }
}

/* 정책분야 */
export const policyPart = {
  ma: { code: 'MA', name: '관리' },
  ph: { code: 'PH', name: '물리' },
  te: { code: 'TE', name: '기술' },
  pr: { code: 'PR', name: '개인정보' },
  et: { code: 'ET', name: '기타' },
  na: { code: 'NA', name: 'N/A' }
}

/* 보안성심의 담당자 구분 */
export const secReviewManagerType = {
  ma: { code: 'MA', name: '관리' },
  ph: { code: 'PH', name: '물리' },
  te: { code: 'TE', name: '기술' },
  pr: { code: 'PR', name: '개인정보' },
  pt: { code: 'PT', name: '모의해킹' },
  ra: { code: 'RA', name: '보안대표자동결재상신자' }
}

/* 보안성심의 상태 */
export const secReviewStatus = {
  a: { code: 'A', name: '임시저장' },
  b: { code: 'B', name: '현업결재' },
  c: { code: 'C', name: '신청' },
  d: { code: 'D', name: '보안결재' },
  e: { code: 'E', name: '검토' },
  f: { code: 'F', name: '이행/검증' },
  g: { code: 'G', name: '최종현업결재' },
  h: { code: 'H', name: '최종보안결재' },
  i: { code: 'I', name: '심의완료' }
}

/* 보안성심의 이행/검증 코드 */
export const secReviewImplType = {
  po: { code: 'PO', name: '보안정책' },
  te: { code: 'TE', name: '기술점검' },
  pt: { code: 'PT', name: '모의해킹' }
}

/* 보안성심의 이행/검증 코드 */
export const secReviewImplStatusCode = {
  a: { code: 'A', name: '점검전' },
  b: { code: 'B', name: '이행중' },
  c: { code: 'C', name: '검증중' },
  d: { code: 'D', name: '완료' }
}

import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 
    'Content-Type': 'application/json'  
  },
});

/**
 * localStorage에 토큰이 있을때 자동으로 header에 토큰을 추가해서
 * 호출을 보낸다
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터 (에러 처리)
 * - 성공적인 응답은 response 그대로 반환
 * - 에러가 발생하면 에러를 호출한 곳으로 전달
 * ex) apiService.get("/invalid-endpoint").catch(error => console.error("에러 발생:", error));
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 에러:", error);
    return Promise.reject(error);
  }
);

/**
 * 각 요청별로 함수 정의
 * @endpoint process.env.BASE_URL 뒤에 붙을 엔드포인트('/user')
 * @params 각 요청에 맞는 데이터
 * 
 * ex) apiService.post("/users", { name: "John", age: 30 });
 */
export const apiService = {
  get: (endpoint, params = {}) => api.get(`${endpoint}`, { params }),
  post: (endpoint, data = {}) => api.post(`${endpoint}`, data),
  put: (endpoint, data = {}) => api.put(`${endpoint}`, data),
  delete: (endpoint, params = {}) => api.delete(`${endpoint}`, { params }),
};

export default api;
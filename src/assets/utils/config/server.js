/*
서버 정보
*/
const api = require('./api/api.js')
module.exports = {
  LOCAL: {
    PORT: 8443,
    DOMAIN: 'https://localhost',
    DESCRIPTION: '로컬 서버 정보',
    API: api
  },
  STAGING: {
    PORT: 50443,
    DOMAIN: 'https://com.liveapp.co.kr',
    DESCRIPTION: '개발(스테이징)서버 정보',
    API: api
  },
  PROD: {
    PORT: 443,
    DOMAIN: 'https://localhost',
    DESCRIPTION: '운영 서버 정보',
    API: api
  }
}

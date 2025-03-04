/**
 * 단위 정책 RESTful API
**/
module.exports = {
  INFO: {
    URI: '/api/compliance/policy/item/info',
    METHOD: 'GET',
    DESCRIPTION: '정책항목 정보 조회'
  },
  CATEGORY_ITEM_CNT: {
    URI: '/api/compliance/policy/item/category/cnt',
    METHOD: 'GET',
    DESCRIPTION: '정책분류 내 정책항목 개수'
  },
  LIST: {
    URI: '/api/compliance/policy/item/list',
    METHOD: 'GET',
    DESCRIPTION: '정책항목 리스트 조회'
  },
  SIMPLE_LIST: {
    URI: '/api/compliance/policy/item/simple/list',
    METHOD: 'GET',
    DESCRIPTION: '정책항목 심플 리스트 조회(no pageable and for search item by name)'
  },
  CREATE: {
    URI: '/api/compliance/policy/item/create',
    METHOD: 'PUT',
    DESCRIPTION: '정책저장소 정책항목 정보 등록'
  },
  UPDATE: {
    URI: '/api/compliance/policy/item/update',
    METHOD: 'PUT',
    DESCRIPTION: '정책항목 정보 수정'
  },
  UPDATE_SORT: {
    URI: '/api/compliance/policy/item/sort/update',
    METHOD: 'PUT',
    DESCRIPTION: '정책항목 순서 변경'
  },
  DELETE: {
    URI: '/api/compliance/policy/item/delete',
    METHOD: 'DELETE',
    DESCRIPTION: '정책항목 삭제'
  },
  CREATE_REF: {
    URI: '/api/compliance/policy/item/ref/create',
    METHOD: 'PUT',
    DESCRIPTION: '일반 컴플라이언스 정책저장소 정책항목 참조 정보 등록'
  },
  LIST_SIMPLE_REF: {
    URI: '/api/compliance/policy/item/ref/simple/list',
    METHOD: 'GET',
    DESCRIPTION: '일반 컴플라이언스 심플 리스트 조회'
  }
}

/**
 * 자산 관리리 RESTful API
**/
module.exports = {
  FIND_ASSET_CIA_LIST: {
    URI: '/api/asset/cia/list',
    METHOD: 'GET',
    DESCRIPTION: 'CIA 조회'
  },
  CREATE_ASSET_CIA: {
    URI: '/api/asset/cia/create',
    METHOD: 'POST',
    DESCRIPTION: 'CIA 등록'
  },
  UPDATE_ASSET_CIA: {
    URI: '/api/asset/cia/update',
    METHOD: 'PUT',
    DESCRIPTION: 'CIA 수정'
  },
  DELETE_ASSET_CIA: {
    URI: '/api/asset/cia/delete',
    METHOD: 'DELETE',
    DESCRIPTION: 'CIA 삭제'
  },
  FIND_ASSET_CATEGORY_LIST: {
    URI: '/api/asset/category/list',
    METHOD: 'GET',
    DESCRIPTION: '자산구분 조회'
  },
  CREATE_ASSET_CATEGORY: {
    URI: '/api/asset/category/create',
    METHOD: 'POST',
    DESCRIPTION: '자산구분 등록'
  },
  UPDATE_ASSET_CATEGORY: {
    URI: '/api/asset/category/update',
    METHOD: 'PUT',
    DESCRIPTION: '자산구분 수정'
  },
  DELETE_ASSET_CATEGORY: {
    URI: '/api/asset/category/delete',
    METHOD: 'DELETE',
    DESCRIPTION: '자산구분 삭제'
  },
  EXCEL_ASSET_LIST: {
    URI: '/api/asset/group/excel',
    METHOD: 'POST',
    DESCRIPTION: '자산목록 엑셀다운로드'
  },
  FIND_ASSET_INSPECTION_GROUP_LIST: {
    URI: '/api/asset/inspection/group/list',
    METHOD: 'GET',
    DESCRIPTION: '점검그룹 리스트 조회'
  },
  FIND_ASSET_INSPECTION_GROUP: {
    URI: '/api/asset/inspection/group/find',
    METHOD: 'GET',
    DESCRIPTION: '점검그룹 리스트 단건 조회'
  },
  CREATE_ASSET_INSPECTION_GROUP: {
    URI: '/api/asset/inspection/group/create',
    METHOD: 'POST',
    DESCRIPTION: '점검그룹 등록'
  },
  UPDATE_ASSET_INSPECTION_GROUP: {
    URI: '/api/asset/inspection/group/update',
    METHOD: 'PUT',
    DESCRIPTION: '점검그룹 수정'
  },
  DELETE_ASSET_INSPECTION_GROUP: {
    URI: '/api/asset/inspection/group/delete',
    METHID: 'DELETE',
    DESCRIPTION: '점검그룹 삭제'
  },
  FIND_ASSET_GROUP_LIST: {
    URI: '/api/asset/group/list',
    METHOD: 'GET',
    DESCRIPTION: '자산그룹 조회'
  },
  FIND_ASSET_GROUP: {
    URI: '/api/asset/group/',
    METHOD: 'GET',
    DESCRIPTION: '자산그룹 단건 조회'
  },
  CREATE_ASSET_GROUP: {
    URI: '/api/asset/group/create',
    METHOD: 'POST',
    DESCRIPTION: '자산그룹 등록'
  },
  UPDATE_ASSET_GROUP: {
    URI: '/api/asset/group/update',
    METHOD: 'PUT',
    DESCRIPTION: '자산그룹 수정'
  },
  DELETE_ASSET_GROUP: {
    URI: '/api/asset/group/delete',
    METHOD: 'DELETE',
    DESCRIPTION: '자산그룹 삭제'
  },
  FIND_ASSET_INFO: {
    URI: '/api/asset/info/',
    METHOD: 'GET',
    DESCRIPTION: '자산 단건 조회'
  },
  FIND_ASSET_INFO_LIST: {
    URI: '/api/asset/info/list',
    METHOD: 'POST',
    DESCRIPTION: '자산 조회'
  },
  CREATE_ASSET_INFO: {
    URI: '/api/asset/info/create',
    METHOD: 'POST',
    DESCRIPTION: '자산 등록'
  },
  UPDATE_ASSET_INFO: {
    URI: '/api/asset/info/update',
    METHOD: 'PUT',
    DESCRIPTION: '자산 수정'
  },
  UPDATE_BATCH_ASSET_INFO: {
    URI: '/api/asset/info/update/batch',
    METHOD: 'PUT',
    DESCRIPTION: '자산 일괄 수정'
  },
  INSERT_BATCH_ASSET_INFO: {
    URI: '/api/asset/info/insert/batch',
    METHOD: 'POST',
    DESCRIPTION: '자산 일괄 수정'
  },
  DELETE_ASSET_INFO: {
    URI: '/api/asset/info/delete',
    METHOD: 'DELETE',
    DESCRIPTION: '자산 삭제'
  },
  FIND_ASSET_HIST_LIST: {
    URI: '/api/hist/list',
    METHOD: 'GET',
    DESCRIPTION: '자산 및 그룹 이력 조회'
  },
  FIND_ASSET_HIST: {
    URI: '/api/hist/find',
    METHOD: 'GET',
    DESCRIPTION: '자산 및 그룹 이력 단건 조회'
  },
  COMPARE_HIST: {
    URI: '/api/hist/compare',
    METHOD: 'GET',
    DESCRIPTION: '자산 및 그룹 이력 비교내역 조회'
  },
  CREATE_ASSET_GROUP_INFO: {
    URI: '/api/asset/group/create/batch',
    METHOD: 'POST',
    DESCRIPTION: '자산그룹 등록'
  },
  FIND_ASSET_CATEGORY_GROUP_BY_LIST: {
    URI: '/api/asset/info/category/list',
    METHOD: 'POST',
    DESCRIPTION: '자산구분별 조회'
  },
  FIND_ASSET_INFRA_LIST: {
    URI: '/api/asset/info/infra/list',
    METHOD: 'POST',
    DESCRIPTION: '자산인프라 조회'
  },
  FIND_ASSET_DELETED_LIST: {
    URI: '/api/asset/info/deleted/list',
    METHOD: 'POST',
    DESCRIPTION: '자산인프라 조회'
  }
}

/*******************************************************
공통 함수 모음
*******************************************************/
import { toRaw, isRef } from 'vue'
import { uMessage, uRouter } from '@/assets/utils'
import storeGlobal from '@/store/helper/global/storeGlobal'
import * as Yup from 'yup'
import xss from 'xss'
import dayjs from 'dayjs'
import cryptojs from 'crypto-js'
import Uset from '@/assets/utils/uSet'

/**
 * 주어진 평면 배열 데이터를 트리 구조로 변환하는 함수입니다.
 *
 * 이 함수는 주어진 데이터를 `parentKey`와 `key`를 기준으로 트리 구조로 변환하고,
 * 부모 메뉴 ID가 `startMenuId`인 항목들을 찾아 트리의 루트로 설정합니다.
 * 또한, 항목들을 `sortKey`를 기준으로 정렬합니다.
 *
 * @param {Array} items - 트리 구조로 변환할 평면 배열 데이터입니다.
 * @param {string} parentKey - 부모 항목의 ID를 나타내는 키입니다.
 * @param {string} key - 각 항목의 고유 ID를 나타내는 키입니다.
 * @param {string} startMenuId - 트리 구조의 루트로 설정할 부모 항목의 ID입니다.
 * @param {string} [sortKey='sort'] - 항목들을 정렬할 키입니다. 기본값은 `'sort'`입니다.
 *
 * @returns {Array} 트리 구조로 변환된 배열을 반환합니다.
 *
 * @example
 * const flatData = [
 *   { menuId: '1', parentMenuId: '0', sort: 1 },
 *   { menuId: '2', parentMenuId: '0', sort: 2 },
 *   { menuId: '3', parentMenuId: '1', sort: 1 },
 *   { menuId: '4', parentMenuId: '1', sort: 2 },
 * ];
 * const treeData = buildTree(flatData, 'parentMenuId', 'menuId', '0');
 * console.log(treeData);
 *
 * // 결과:
 * [
 *   {
 *     menuId: '1',
 *     parentMenuId: '0',
 *     sort: 1,
 *     children: [
 *       { menuId: '3', parentMenuId: '1', sort: 1, children: [] },
 *       { menuId: '4', parentMenuId: '1', sort: 2, children: [] }
 *     ]
 *   },
 *   {
 *     menuId: '2',
 *     parentMenuId: '0',
 *     sort: 2,
 *     children: []
 *   }
 * ]
 */
const buildTree = (items, parentKey, key, startMenuId, sortKey) =>
  items.sort((a, b) => { return a.sort - b.sort }).filter(item => item[parentKey] === startMenuId).map(item => ({ ...item, children: buildTree(items, parentKey, key, item[key]) }))

/**
 * 주어진 평면 배열 데이터에서 특정 값을 가진 항목을 조회하는 함수입니다.
 *
 * 이 함수는 주어진 배열에서 특정 `key`의 값이 `value`와 일치하는 항목들을 필터링하여 반환합니다.
 *
 * @param {Array} items - 조회할 평면 배열 데이터입니다.
 * @param {string} key - 조회할 항목의 키입니다.
 * @param {string|number} value - 조회할 값입니다. 이 값이 `key`에 해당하는 항목들과 일치하는 항목을 필터링합니다.
 *
 * @returns {Array} `key` 값이 `value`와 일치하는 항목들의 배열을 반환합니다.
 *
 * @example
 * const flatData = [
 *   { menuId: '1', name: 'Home' },
 *   { menuId: '2', name: 'About' },
 *   { menuId: '2.1', name: 'Team' }
 * ];
 * const result = findItem(flatData, 'menuId', '2.1');
 * console.log(result);
 *
 * // 결과:
 * [
 *   { menuId: '2.1', name: 'Team' }
 * ]
 */
const findItem = (items, key, value) => items.filter(item => item[key] === value)

/**
 * 주어진 배열에서 특정 값을 가진 항목을 조회하고, 결과가 없으면 기본값을 반환하는 함수입니다.
 *
 * 이 함수는 주어진 배열에서 특정 `key`의 값이 `value`와 일치하는 항목들을 필터링하여 반환합니다.
 * 만약 결과가 비어 있다면, 기본값인 `defaultArr`를 반환합니다.
 *
 * @param {Array} items - 조회할 평면 배열 데이터입니다.
 * @param {string} key - 조회할 항목의 키입니다.
 * @param {string|number} value - 조회할 값입니다. 이 값이 `key`에 해당하는 항목들과 일치하는 항목을 필터링합니다.
 * @param {Array} defaultArr - 결과가 비었을 경우 반환할 기본 배열입니다.
 *
 * @returns {Array} `key` 값이 `value`와 일치하는 항목들의 배열 또는 기본 배열을 반환합니다.
 *
 * @example
 * const flatData = [
 *   { menuId: '1', name: 'Home' },
 *   { menuId: '2', name: 'About' }
 * ];
 * const result = findItemIfEmpty(flatData, 'menuId', '2.1', []);
 * console.log(result);
 *
 * // 결과:
 * []
 *
 * const defaultResult = findItemIfEmpty(flatData, 'menuId', '1', [{ menuId: 'default', name: 'Default' }]);
 * console.log(defaultResult);
 *
 * // 결과:
 * [{ menuId: '1', name: 'Home' }]
 */
const findItemIfEmpty = (items, key, value, defaultArr) => {
  const arr = items.filter(item => item[key] === value)
  if (arr.length > 0) {
    return arr
  } else {
    return defaultArr
  }
}

/**
 * 배열에서 특정 `key`의 값이 `value`와 일치하는 첫 번째 항목을 제거하는 함수입니다.
 *
 * 이 함수는 주어진 배열에서 특정 `key`의 값이 `value`와 일치하는 항목을 찾아 제거하고, 변경된 배열을 반환합니다.
 * 항목이 배열에서 제거되면, 원본 배열에서 해당 항목이 삭제됩니다.
 *
 * @param {Array} items - 항목을 제거할 대상 배열입니다.
 * @param {string} key - 조회할 항목의 키입니다.
 * @param {string|number} value - 제거할 항목의 `key` 값입니다. 이 값이 `key`와 일치하는 첫 번째 항목을 찾아 제거합니다.
 *
 * @returns {Array} 변경된 배열을 반환합니다. 항목이 제거되지 않으면 원본 배열이 그대로 반환됩니다.
 *
 * @example
 * const arr = [
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' },
 *   { id: 3, name: 'Item 3' }
 * ];
 * const result = removeObjectInArray(arr, 'id', 2);
 * console.log(result);
 *
 * // 결과:
 * [
 *   { id: 1, name: 'Item 1' },
 *   { id: 3, name: 'Item 3' }
 * ]
 */
const removeObjectInArray = (items, key, value) => {
  const targetIdx = items.findIndex(item => item[key] === value)
  items.splice(targetIdx, 1)
  return items
}

/**
 * 배열에서 특정 `key`의 값이 `values` 배열에 포함된 항목들을 찾아 반환하는 함수입니다.
 *
 * 이 함수는 주어진 배열에서 특정 `key`의 값이 `values` 배열에 포함된 항목들을 모두 찾아 `result` 배열에 추가하고 반환합니다.
 *
 * @param {Array} items - 조회할 대상 배열입니다.
 * @param {string} key - 항목을 조회할 키입니다.
 * @param {Array} values - `key` 값과 비교할 여러 값들이 포함된 배열입니다. `key` 값이 이 배열에 포함되면 해당 항목을 `result` 배열에 추가합니다.
 * @param {Array} [result=[]] - 결과 배열로, 기본값은 빈 배열입니다. 필터링된 항목들이 이 배열에 추가됩니다.
 *
 * @returns {Array} `key` 값이 `values` 배열에 포함되는 항목들을 담은 배열을 반환합니다.
 *
 * @example
 * const arr = [
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' },
 *   { id: 3, name: 'Item 3' }
 * ];
 * const result = findItems(arr, 'id', [1, 3]);
 * console.log(result);
 *
 * // 결과:
 * [
 *   { id: 1, name: 'Item 1' },
 *   { id: 3, name: 'Item 3' }
 * ]
 */
const findItems = (items, key, values, result = []) => {
  items.forEach(item => {
    values.forEach(value => {
      if (item[key] === value) {
        result.push(item)
      }
    })
  })
  return result
}

/**
 * 배열에서 특정 `key`의 값들을 추출하여 반환하는 함수입니다.
 *
 * 이 함수는 주어진 배열에서 각 항목의 `key` 값을 추출하여 결과 배열에 담아 반환합니다.
 *
 * @param {Array} items - 값을 추출할 대상 배열입니다.
 * @param {string} key - 값을 추출할 항목의 키입니다.
 * @param {Array} [result=[]] - 결과 배열로, 기본값은 빈 배열입니다. 추출된 값들이 이 배열에 추가됩니다.
 *
 * @returns {Array} 각 항목의 `key` 값이 담긴 배열을 반환합니다.
 *
 * @example
 * const arr = [
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' },
 *   { id: 3, name: 'Item 3' }
 * ];
 * const result = extractValueByProp(arr, 'id');
 * console.log(result);
 *
 * // 결과:
 * [1, 2, 3]
 */
const extractValueByProp = (items, key, result = []) => {
  items.forEach(item => {
    result.push(item[key])
  })
  return result
}

/**
 * 중첩된 배열에서 특정 `key` 값을 추출하여 평평한(flat) 배열로 반환하는 함수입니다.
 *
 * 이 함수는 중첩된 배열 구조에서 지정된 `arrayKey`를 따라가며 각 항목의 `targetKey` 값을 추출하여
 * 평탄화된 배열로 반환합니다. 중첩된 배열이 있을 경우 재귀적으로 탐색하여 값을 추출합니다.
 *
 * @param {Array} arr - 값을 추출할 중첩된 배열입니다.
 * @param {string} arrayKey - 중첩된 배열을 나타내는 키입니다.
 * @param {string} targetKey - 추출할 값을 포함하는 키입니다.
 * @param {Array} [flatData=[]] - 추출된 값을 저장할 결과 배열입니다. 기본값은 빈 배열입니다.
 *
 * @returns {Array} `targetKey` 값들이 담긴 평탄화된 배열을 반환합니다.
 *
 * @example
 * const arr = [
 *   { id: 1, items: [{ name: 'Item 1' }, { name: 'Item 2' }] },
 *   { id: 2, items: [{ name: 'Item 3' }] }
 * ];
 * const result = flatNestedArrayNodeDataForExtractTargetValue(arr, 'items', 'name');
 * console.log(result);
 *
 * // 결과:
 * ['Item 1', 'Item 2', 'Item 3']
 */
const flatNestedArrayNodeDataForExtractTargetValue = (arr, arrayKey, targetKey, flatData = []) => {
  if (!isEmpty(arr)) {
    if (Array.isArray(arr)) {
      arr.forEach((data) => {
        flatData.push(data[targetKey])
        if (data[arrayKey] instanceof Array && data[arrayKey].length > 0) {
          flatNestedArrayNodeDataForExtractTargetValue(data[arrayKey], arrayKey, targetKey, flatData)
        }
      })
    }
  }
  return flatData
}

/**
 * 부모 항목을 포함한 특정 항목을 찾는 함수입니다.
 *
 * 이 함수는 주어진 `value` 값을 `separator`로 구분하여 부모 항목들을 하나씩 찾아가며,
 * 해당 항목을 `key` 값을 기준으로 `items`에서 검색합니다. 각 부모 항목을 추적하며
 * 일치하는 항목을 `result` 배열에 추가합니다.
 *
 * @param {Array} items - 항목들이 담긴 배열입니다.
 * @param {string} key - 항목에서 검색할 키입니다.
 * @param {string} value - 검색할 값으로, 부모 항목들을 구분할 `separator`를 포함한 값입니다.
 * @param {string} separator - 부모 항목을 구분하는 구분자입니다.
 *
 * @returns {Array} `key`와 일치하는 항목들을 포함하는 배열을 반환합니다.
 * 여러 부모 항목이 있을 경우 각각의 항목을 포함합니다.
 *
 * @example
 * const items = [
 *   { menuId: '1', name: 'Menu 1' },
 *   { menuId: '1.1', name: 'Sub Menu 1.1' },
 *   { menuId: '1.1.1', name: 'Sub Sub Menu 1.1.1' },
 *   { menuId: '2', name: 'Menu 2' }
 * ];
 * const result = findItemWidthParents(items, 'menuId', '1.1.1', '.');
 * console.log(result);
 *
 * // 결과:
 * [
 *   { menuId: '1', name: 'Menu 1' },
 *   { menuId: '1.1', name: 'Sub Menu 1.1' },
 *   { menuId: '1.1.1', name: 'Sub Sub Menu 1.1.1' }
 * ]
 */
const findItemWidthParents = (items, key, value, separator) => {
  const tmps = value.split(separator)
  const result = []
  let lastMenuId = null
  tmps.forEach(menuId => {
    lastMenuId = lastMenuId === null ? menuId : lastMenuId + separator + menuId
    const is = findItem(items, key, lastMenuId)
    if (is !== null && is.length) {
      result.push(toRaw(is[0]))
    }
  })

  return result
}

/**
 * 트리 구조에서 특정 항목을 찾는 함수입니다.
 *
 * 이 함수는 트리 구조의 데이터를 순회하며, 주어진 `compareKey`와 `compareValue`를 기준으로
 * 일치하는 항목을 찾습니다. 트리 구조의 각 항목은 `nestedItemKey`에 의해 자식 항목을 포함할 수 있습니다.
 * 자식 항목들이 있는 경우 해당 자식 항목들을 재귀적으로 탐색합니다.
 *
 * @param {Array} items - 트리 구조로 된 항목들이 담긴 배열입니다.
 * @param {string} nestedItemKey - 자식 항목들이 저장된 키입니다.
 * @param {string} compareKey - 비교할 키입니다.
 * @param {any} compareValue - 비교할 값입니다. `compareKey`의 값과 일치하는 항목을 찾습니다.
 *
 * @returns {Object|null} `compareKey`와 `compareValue`가 일치하는 항목을 반환합니다.
 * 항목이 없으면 `null`을 반환합니다.
 *
 * @example
 * const tree = [
 *   {
 *     id: '1',
 *     name: 'Menu 1',
 *     children: [
 *       { id: '1.1', name: 'Sub Menu 1.1', children: [] },
 *       { id: '1.2', name: 'Sub Menu 1.2', children: [] }
 *     ]
 *   },
 *   {
 *     id: '2',
 *     name: 'Menu 2',
 *     children: []
 *   }
 * ];
 * const result = findItemFromTree(tree, 'children', 'id', '1.1');
 * console.log(result);
 *
 * // 결과:
 * { id: '1.1', name: 'Sub Menu 1.1', children: [] }
 */
const findItemFromTree = (items, nestedItemKey, compareKey, compareValue) => {
  if (items === undefined) return []

  let result = null
  for (const item of items) {
    if (item[compareKey] === compareValue) {
      result = item
      break
    } else {
      const has = findItemFromTree(item[nestedItemKey], nestedItemKey, compareKey, compareValue)
      if (has) {
        result = has
      }
    }
  }
  return result
}

/**
 * 공통코드를 선택할 때 사용할 데이터를 준비하는 함수입니다.
 *
 * 이 함수는 주어진 `data`에서 공통코드를 추출하고, 선택 항목의 첫 번째 항목에 헤더명을 추가하거나
 * '전체' 항목을 맨 앞에 추가할 수 있습니다. 또한, `doAppendAllLabel` 값에 따라 '전체' 항목을 선택적으로
 * 포함시킬 수 있습니다.
 *
 * @param {Array} data - 공통코드 데이터 배열입니다. 첫 번째 항목이 헤더명을 포함하고 있습니다.
 * @param {boolean} doAppendAllLabel - '전체' 항목을 포함할지 여부를 나타내는 플래그입니다.
 *
 * @returns {Array} 선택된 공통코드의 children 배열을 반환합니다.
 * '전체' 항목을 추가할 경우, 첫 번째 항목에 '전체' 항목이 포함됩니다.
 *
 * @example
 * const data = [
 *   { parentName: '카테고리', children: [{ code: '1', name: '전자기기' }, { code: '2', name: '가전' }] },
 * ];
 * const result = makeCommonCodeSelect(data, true);
 * console.log(result);
 *
 * // 결과:
 * [
 *   { code: '', name: '카테고리', children: null, parentCode: null, parentName: null },
 *   { code: '1', name: '전자기기' },
 *   { code: '2', name: '가전' }
 * ]
 */
const makeCommonCodeSelect = (data, doAppendAllLabel) => {
  if (data === null || data === undefined) { console.log('공통코드 데이터 없음!!!') }
  /* DB에 공통코드 sort 첫번째가 헤더명 */
  const rawData = toRaw(data[0])
  const allLabel = { code: '', name: rawData.parentName, children: null, parentCode: null, parentName: null }
  const cloned = cloneData(rawData)
  if (doAppendAllLabel) {
    cloned.children.unshift(allLabel)
  }
  return cloned.children
}

/**
 * 공통코드를 선택할 때 사용할 데이터를 준비하는 함수입니다.
 *
 * 이 함수는 주어진 `data`에서 공통코드를 추출하고, 첫 번째 항목에서 부모 이름을 `placeholder`로 설정한 후
 * 그 값을 포함한 배열을 반환합니다. 반환되는 배열은 첫 번째 요소로 `parentName`을 포함하고, 두 번째 요소로
 * `children` 배열을 포함합니다.
 *
 * @param {Array} data - 공통코드 데이터 배열입니다. 첫 번째 항목에서 부모 이름과 자식 항목들을 가져옵니다.
 *
 * @returns {Array} 첫 번째 요소는 `parentName`이고, 두 번째 요소는 `children` 배열입니다.
 * `children` 배열은 공통코드의 실제 항목들입니다.
 *
 * @example
 * const data = [
 *   { parentName: '카테고리', children: [{ code: '1', name: '전자기기' }, { code: '2', name: '가전' }] },
 * ];
 * const result = makeCommonCodeSelect2(data);
 * console.log(result);
 *
 * // 결과:
 * [
 *   '카테고리',
 *   [{ code: '1', name: '전자기기' }, { code: '2', name: '가전' }]
 * ]
 */
const makeCommonCodeSelect2 = (data) => {
  if (data === null || data === undefined) { console.log('공통코드 데이터 없음!!!') }
  /* DB에 공통코드 sort 첫번째가 헤더명 */
  const rawData = toRaw(data[0])
  const placeholder = rawData.parentName
  const cloned = cloneData(rawData)
  return [placeholder, cloned.children]
}

/**
 * 주어진 데이터의 특정 키를 기준으로 공통 코드 데이터를 필터링하여 반환하는 함수입니다.
 *
 * 이 함수는 `data` 배열의 각 항목에서 주어진 `key`에 해당하는 값을 추출하여, 이를 기반으로 `commonCodes`에서
 * 일치하는 항목을 찾아 반환합니다. 반환된 항목들은 `code`와 일치하는 값에 대해 필터링됩니다.
 *
 * @param {Array} data - 항목을 포함한 데이터 배열입니다. 각 항목에서 주어진 `key`에 해당하는 값을 추출합니다.
 * @param {string} key - 데이터를 필터링할 때 기준이 되는 키입니다.
 * @param {Array} commonCodes - 공통 코드 배열입니다. `code` 속성을 기준으로 데이터를 필터링합니다.
 *
 * @returns {Array} 공통 코드 배열에서 `code`가 `data`에서 추출한 값들에 해당하는 항목들로 필터링된 결과입니다.
 *
 * @example
 * const data = [
 *   { id: 1, code: 'A' },
 *   { id: 2, code: 'B' },
 * ];
 * const commonCodes = [
 *   { code: 'A', name: 'Active' },
 *   { code: 'B', name: 'Blocked' },
 *   { code: 'C', name: 'Closed' }
 * ];
 * const result = makeCodeSelectDependingOnDatasCode(data, 'code', commonCodes);
 * console.log(result);
 *
 * // 결과:
 * [
 *   { code: 'A', name: 'Active' },
 *   { code: 'B', name: 'Blocked' }
 * ]
 */
const makeCodeSelectDependingOnDatasCode = (data, key, commonCodes) => {
  const list = new Uset()
  data.forEach(item => {
    // eslint-disable-next-line no-eval
    list.add(eval('item.' + key))
  })
  return findItems(commonCodes, 'code', list.asArray())
}

/**
 * 주어진 공통 코드 배열에서 특정 `targetCode`에 해당하는 코드의 이름을 반환하는 함수입니다.
 *
 * 이 함수는 `data` 배열에서 `targetCode`에 해당하는 항목을 찾아 그 이름을 반환합니다. 만약 `targetCode`가
 * `'Z'`인 경우, '삭제'라는 문자열을 반환하고, `targetCode`가 비어 있는 경우에는 기본값(`defaultEmptyName`)을 반환합니다.
 * 공통 코드 데이터가 없는 경우나 데이터 구조가 잘못된 경우에는 경고 메시지를 출력합니다.
 *
 * @param {Array} data - 공통 코드 데이터를 포함하는 배열입니다. 각 항목은 `code`와 `name`을 포함하는 객체여야 합니다.
 * @param {string} targetCode - 찾고자 하는 코드입니다.
 * @param {string} [defaultEmptyName=''] - `targetCode`가 비어 있을 경우 반환할 기본값입니다. 기본값은 빈 문자열입니다.
 *
 * @returns {string} `targetCode`에 해당하는 코드의 이름을 반환합니다.
 *                   해당 코드가 없거나 데이터가 비어 있으면 기본값을 반환하거나 경고 메시지를 출력합니다.
 *
 * @example
 * const data = [
 *   { code: 'A', name: 'Active', children: [{ code: 'B', name: 'Blocked' }] },
 *   { code: 'C', name: 'Closed', children: [] }
 * ];
 * const result = convertCommonCodeToName(data, 'B');
 * console.log(result);  // "Blocked"
 *
 * @example
 * const result2 = convertCommonCodeToName(data, 'Z');
 * console.log(result2);  // "삭제"
 *
 * @example
 * const result3 = convertCommonCodeToName(data, '', 'No Name');
 * console.log(result3);  // "No Name"
 */
const convertCommonCodeToName = (data, targetCode, defaultEmptyName) => {
  defaultEmptyName = defaultEmptyName || ''
  if (isEmpty(data) || data.length === 0) { console.log('공통코드 데이터 없음!!!') }
  if (targetCode === 'Z') return '삭제'
  if (isEmpty(targetCode)) return defaultEmptyName
  const rawData = toRaw(data[0])
  try {
    if (!isEmpty(rawData.children.filter(row => row.code === targetCode)[0])) {
      return rawData.children.filter(row => row.code === targetCode)[0].name
    }
  } catch (error) {
    alert('공통코드 관련 정보(데이터 구조)가 맞지 않음!!!!!')
    console.log(error)
  }
}

/**
 * 주어진 공통 코드 배열에서 여러 `targetCodes`에 해당하는 코드들의 이름을 반환하는 함수입니다.
 *
 * 이 함수는 `data` 배열에서 `targetCodes`에 포함된 각 코드에 대해 해당하는 이름을 찾아서 반환합니다.
 * 코드들이 하나 이상의 항목을 포함하는 경우, 결과 이름들을 주어진 구분자(`separator`)로 연결하여 반환합니다.
 * 만약 코드가 없거나 데이터 구조가 잘못된 경우에는 경고 메시지를 출력합니다.
 *
 * @param {Array} data - 공통 코드 데이터를 포함하는 배열입니다. 각 항목은 `code`와 `name`을 포함하는 객체여야 합니다.
 * @param {Array} targetCodes - 찾고자 하는 코드들의 배열입니다.
 * @param {string} separator - 이름들을 구분할 구분자입니다. 기본값은 `', '`입니다.
 * @param {Array} [result=[]] - 내부적으로 결과를 누적할 배열입니다. 기본값은 빈 배열입니다.
 *
 * @returns {string} `targetCodes`에 해당하는 코드들의 이름을 구분자로 연결하여 반환합니다.
 *                   해당 코드가 없거나 데이터 구조가 잘못된 경우, 기본적으로 빈 문자열을 반환하거나 경고 메시지를 출력합니다.
 *
 * @example
 * const data = [
 *   { code: 'A', name: 'Active', children: [{ code: 'B', name: 'Blocked' }] },
 *   { code: 'C', name: 'Closed', children: [] }
 * ];
 * const result = convertCommonCodesToNames(data, ['A', 'B'], ', ');
 * console.log(result);  // "Active, Blocked"
 *
 * @example
 * const result2 = convertCommonCodesToNames(data, ['Z'], ', ');
 * console.log(result2);  // "" (빈 문자열)
 */
const convertCommonCodesToNames = (data, targetCodes, separator, result = []) => {
  if (isEmpty(data)) { console.log('공통코드 데이터 없음!!!') }
  if (isEmpty(targetCodes)) return result
  separator = separator || ', '
  const rawData = toRaw(data[0])
  try {
    rawData.children.forEach(rd => {
      if (targetCodes.includes(rd.code)) {
        result.push(rd.name)
      }
    })
    return result.join(separator)
  } catch (error) {
    alert('공통코드 관련 정보(데이터 구조)가 맞지 않음!!!!!')
    console.log(error)
  }
}

/**
 * 공통 코드 데이터에서 특정 코드에 맞는 이름을 설정하는 함수입니다.
 *
 * 주어진 `targetCode` 배열에 있는 값들을 순차적으로 `data` 배열의 `children` 항목의 `name` 필드에 설정합니다.
 * `targetCode`의 값들이 `children`의 `name`에 차례대로 할당되며, 결과적으로 변경된 `children` 배열을 반환합니다.
 *
 * @param {Array} data - 공통 코드 데이터를 포함하는 배열입니다. 각 항목은 `children` 배열을 포함하고 있어야 합니다.
 * @param {Array} targetCode - 각 `children` 항목의 `name`을 대체할 값들을 포함하는 배열입니다.
 *
 * @returns {Array} 변경된 `children` 배열을 반환합니다. 각 항목의 `name` 필드는 `targetCode` 배열의 값들로 교체됩니다.
 *
 * @example
 * const data = [
 *   { children: [{ code: 'A', name: 'Old Name 1' }, { code: 'B', name: 'Old Name 2' }] }
 * ];
 * const targetCode = ['New Name 1', 'New Name 2'];
 * const result = getCommonNameBysetName(data, targetCode);
 * console.log(result);  // [{ code: 'A', name: 'New Name 1' }, { code: 'B', name: 'New Name 2' }]
 */
const getCommonNameBysetName = (data, targetCode) => {
  let i = 0
  const rawData = toRaw(data[0])
  const reRawData = []
  const cloned = cloneData(rawData)
  reRawData.children = cloned.children.map(row => {
    row.name = targetCode[i]
    i++
    return row
  })
  return reRawData.children
}

/**
 * 객체를 깊은 복사하는 함수입니다.
 *
 * 주어진 객체를 JSON 문자열로 변환한 뒤, 다시 객체로 변환하여 원본 객체와 완전히 독립적인 새로운 객체를 생성합니다.
 * 이 방식은 객체 내의 중첩된 객체들까지 모두 복사하여 새로운 객체를 생성하는 깊은 복사 방식입니다.
 *
 * @param {Object} from - 깊은 복사를 할 원본 객체입니다.
 *
 * @returns {Object} 원본 객체와 동일한 구조를 가지지만, 새로운 참조를 가진 복사된 객체를 반환합니다.
 *
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copied = cloneData(original);
 * copied.b.c = 3;
 * console.log(original.b.c);  // 2
 * console.log(copied.b.c);    // 3
 */
const cloneData = (from) => {
  return JSON.parse(JSON.stringify(from))
}

/**
 * 주어진 객체를 기반으로 URL 쿼리 문자열을 생성하는 함수입니다.
 * 객체의 각 키와 값을 `key=value` 형식으로 변환하고, 이를 `&`로 구분하여 쿼리 문자열을 만듭니다.
 * null 또는 undefined인 값은 제외됩니다.
 *
 * @param {Object|Ref} props - 쿼리 문자열로 변환할 객체 또는 Vue의 ref 객체.
 *                              객체일 경우, 그 값은 `toRaw()`로 변환하여 처리합니다.
 *
 * @returns {string} 생성된 쿼리 문자열. 예: `key1=value1&key2=value2`
 */
const makeUserQuery = (props) => {
  if (props === undefined || props === null) { return '' }
  if (isRef(props)) {
    props = toRaw(props.value)
  } else {
    props = toRaw(props)
  }

  let result = ''
  Object.keys(props).forEach(function (key, index) {
    if (!isEmpty(props[key])) {
      result += '&'.concat(key).concat('=').concat(encodeURIComponent(props[key]))
    }
  })
  return result.substring(1, result.length)
}

/**
 * 주어진 값이 비어 있는지 확인하는 함수입니다.
 * 문자열, 객체, 배열, 숫자, null, undefined 등 다양한 타입에 대해 비어있는지 체크할 수 있습니다.
 * 선택적으로, 숫자 0을 비어있다고 간주할지 여부를 결정할 수 있습니다.
 *
 * @param {*} value - 비어있는지 확인할 값. 문자열, 객체, 배열, 숫자 등 다양한 타입을 받을 수 있습니다.
 * @param {boolean} [isCheckWithZero=false] - 숫자 0을 비어있는 값으로 간주할지 여부를 결정하는 옵션. 기본값은 `false`입니다.
 *
 * @returns {boolean} 비어있는 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isEmpty("");            // true (빈 문자열)
 * isEmpty("   ");         // true (공백만 있는 문자열)
 * isEmpty(null);          // true (null 값)
 * isEmpty(undefined);     // true (undefined 값)
 * isEmpty([]);            // true (빈 배열)
 * isEmpty({});            // true (빈 객체)
 * isEmpty(0);             // false (기본적으로 0은 비어있지 않다고 간주)
 * isEmpty(0, true);       // true (0을 비어있는 값으로 간주할 경우)
 * isEmpty(false);         // false (false는 값으로 간주됨)
 * isEmpty({ key: "val" }); // false (속성이 있는 객체)
 * isEmpty([1, 2, 3]);     // false (요소가 있는 배열)
 */
const isEmpty = (value, isCheckWithZero = false) => {
  if (typeof value === 'string') {
    value = value.trim()
  }
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0) ||
    (isCheckWithZero && value === 0)
  )
}

/**
 * 주어진 값이 비어있으면 특정 값으로 변환하는 함수입니다.
 * 값이 비어있는 경우 `to` 값을 반환하고, 그렇지 않으면 원래 값을 그대로 반환합니다.
 *
 * @param {*} value - 확인할 값. 빈 값(빈 문자열, null, undefined 등)을 체크합니다.
 * @param {*} to - 값이 비어있을 경우 반환할 값입니다.
 *
 * @returns {*} 비어있는 경우 `to` 값을 반환하고, 그렇지 않으면 원래 `value` 값을 반환합니다.
 */
const convertEmptyTo = (value, to) => {
  if (isEmpty(value)) {
    return to
  } else {
    return value
  }
}

/**
 * 주어진 값이 비어 있으면 `to` 값을 반환하고, 그렇지 않으면 `elseTo` 값을 반환합니다.
 *
 * @param {*} value - 확인할 값. 빈 값(빈 문자열, null, undefined 등)을 체크합니다.
 * @param {*} to - 값이 비어 있을 경우 반환할 값입니다.
 * @param {*} elseTo - 값이 비어있지 않을 경우 반환할 값입니다.
 *
 * @returns {*} 주어진 `value`가 비어 있으면 `to`, 그렇지 않으면 `elseTo` 값을 반환합니다.
 */
const convertEmptyToOrElse = (value, to, elseTo) => {
  return isEmpty(value) ? to : elseTo
}

/**
 * 숫자 값을 천 단위로 콤마(,)를 추가하여 반환합니다.
 * 비어 있는 값이 주어지면 빈 문자열을 반환합니다.
 *
 * @param {*} val - 콤마를 추가할 값. 숫자나 문자열을 입력으로 받을 수 있습니다.
 *
 * @returns {string} 콤마가 추가된 값 혹은 빈 문자열을 반환합니다.
 */
const comma = (val) => {
  if (!isEmpty(val)) {
    val = String(val + '')
    return val.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  } else {
    return ''
  }
}

/**
 * 콤마(,)가 포함된 숫자 문자열에서 콤마를 제거하고 순수 숫자만 반환합니다.
 * 비어 있는 값이 주어지면 빈 문자열을 반환합니다.
 *
 * @param {*} val - 콤마를 제거할 값. 숫자나 문자열을 입력으로 받을 수 있습니다.
 *
 * @returns {string} 콤마가 제거된 숫자 문자열을 반환합니다. 빈 값이 주어지면 빈 문자열을 반환합니다.
 */
const unComma = (val) => {
  if (!isEmpty(val)) {
    val = String(val + '')
    return val.replace(/[^\d]+/g, '')
  } else {
    return ''
  }
}

/**
 * 문자열에서 콤마(,)의 개수를 셉니다.
 * 비어 있는 값이 주어지면 0을 반환합니다.
 *
 * @param {*} val - 콤마를 셀 대상 문자열입니다. 숫자나 문자열을 입력으로 받을 수 있습니다.
 *
 * @returns {number} 콤마의 개수를 반환합니다. 빈 값이 주어지면 0을 반환합니다.
 *
 * @example
 * countComma('1,000,000') // 2
 * countComma('12345') // 0
 * countComma('1,2,3,4,5') // 4
 * countComma('') // 0
 */
const countComma = (val) => {
  if (isEmpty(val)) {
    return 0
  } else {
    return val.split(',').length - 1
  }
}

/**
 * 주어진 `from` 객체의 데이터를 `to` 객체로 바인딩합니다.
 * 옵션에 따라 빈 값(empty value)이나 0을 제외한 값만 바인딩할 수 있습니다.
 *
 * @param {Object} from - 값을 가져올 객체입니다.
 * @param {Object} to - 값을 바인딩할 대상 객체입니다.
 * @param {boolean} [isExceptEmptyValue=false] - 빈 값이나 0을 제외할지 여부를 지정합니다. 기본값은 `false`입니다.
 *
 * @returns {void} - 반환값이 없습니다. `to` 객체는 직접 수정됩니다.
 *
 * @example
 * const from = { name: 'Alice', age: 0, city: 'New York' };
 * const to = { name: '', age: 0, city: '' };
 * bindData(from, to, true);
 * console.log(to);
 * // { name: 'Alice', age: 0, city: 'New York' }
 *
 * bindData(from, to, false);
 * console.log(to);
 * // { name: 'Alice', age: 0, city: 'New York' }
 */
const bindData = (from, to, isExceptEmptyValue) => {
  isExceptEmptyValue = isExceptEmptyValue || false
  Object.keys(to).forEach(k => {
    const fromVal = from[k]
    if (fromVal !== undefined) {
      if (isExceptEmptyValue) {
        /* from 값이 empty 또는 0 이면 바인딩 제외 */
        if (!isEmpty(fromVal, true)) {
          to[k] = cloneData(fromVal)
        }
      } else {
        /* empty 상관없이 바인딩 */
        to[k] = cloneData(fromVal)
      }
    }
  })
}

/**
 * 폼 입력에서 에러가 발생한 경우 해당 입력 필드를 포커싱하고, 에러 메시지를 표시하는 함수입니다.
 *
 * @param {Object} ref - 폼을 참조하는 객체로, 주로 Vue.js의 `ref` 속성에 사용됩니다.
 * @param {Object} error - 에러 객체로, `message`와 `path` 속성을 포함해야 합니다.
 *   - `message`: 에러 메시지입니다.
 *   - `path`: 에러가 발생한 폼 필드의 `name` 속성입니다.
 *
 * @returns {void} - 반환값이 없습니다.
 *
 * @example
 * const error = { message: '이 필드는 필수입니다.', path: 'username' };
 * focusAndMessageWhenErrorFormInput(ref, error);
 * // 해당 input 필드에 포커스가 가고, 에러 메시지가 화면에 표시됩니다.
 */
const focusAndMessageWhenErrorFormInput = (ref, error) => {
  try {
    uMessage.showMessage(error.message, 'error', 1000)
    const $eTarger = ref.value.querySelector('input[name="' + error.path + '"]')
    if ($eTarger !== null) {
      $eTarger.focus()
      $eTarger.classList.add('input-error-focus')
      setTimeout(() => {
        $eTarger.classList.remove('input-error-focus')
      }, 1000)
    }
  } catch (e) {
    // console.log('폼에 focusing 할때 오류 남....')
  }
}

/**
 * 주어진 `formData`를 Yup을 사용해 검증한 후, 유효하면 제출 콜백을 호출하고, 오류가 발생하면 해당 폼 필드를 포커싱하고 오류 메시지를 표시하는 함수입니다.
 *
 * @param {Object} shape - Yup 검증 스키마로, 필드별로 유효성 검사 규칙을 정의합니다.
 * @param {Object} formRef - 폼의 참조 객체로, 오류가 발생한 폼 필드를 찾기 위해 사용됩니다.
 * @param {Object} formData - 제출하려는 폼 데이터로, 유효성 검사를 받습니다.
 * @param {Function} submitCallback - 검증을 통과한 후 호출되는 제출 콜백 함수입니다.
 *
 * @returns {void} - 반환값이 없으며, 유효성 검사 후 제출 콜백을 실행하거나, 오류가 있을 경우 폼 필드를 포커싱하고 오류 메시지를 표시합니다.
 *
 * @example
 * const formData = { username: '', email: '' };
 * const shape = {
 *   username: Yup.string().required('Username is required'),
 *   email: Yup.string().email('Invalid email').required('Email is required')
 * };
 * commonValidateThenSubmit(shape, formRef, formData, () => { console.log('Form submitted!'); });
 * // 유효성 검사 후, 에러가 없으면 submitCallback이 호출됩니다.
 */
const commonValidateThenSubmit = (shape, formRef, formData, submitCallback) => {
  Yup.object().shape(shape).validate(formData, { abortEarly: false })
    .then(() => {
      submitCallback()
    })
    .catch((err) => {
      if (err.inner !== undefined) {
        err.inner.forEach((error, index) => {
          if (index === 0) {
            focusAndMessageWhenErrorFormInput(formRef, error)
          }
        })
      } else {
        alert('어딘가 오류!!! 콘솔 로그 확인 바람!')
        console.log(err)
      }
    })
}

/**
 * 새로운 비밀번호가 유효한지 검사하는 함수입니다.
 * 비밀번호는 영문자, 숫자, 특수문자를 포함한 8~20자 길이여야 하며,
 * 연속된 문자를 3개 이상 사용하지 않아야 하고, 같은 문자를 3개 이상 반복할 수 없습니다.
 *
 * @param {Object} formData - 폼 데이터 객체로, 비밀번호 관련 입력 필드들이 포함됩니다.
 * @param {string} data - 사용자가 입력한 비밀번호 값입니다.
 *
 * @returns {boolean} - 비밀번호가 유효하면 `true`를, 그렇지 않으면 `false`를 반환합니다.
 * - 유효한 비밀번호 형식일 경우, 추가 조건(연속된 문자 및 반복된 문자)을 검사합니다.
 * - 유효하지 않은 비밀번호 형식이나 조건을 충족하지 않으면 오류 메시지를 표시하고 `false`를 반환합니다.
 *
 * @example
 * const formData = { password: 'password123!' };
 * const isValid = checkNewPassword(formData, formData.password);
 * if (isValid) {
 *   console.log('비밀번호가 유효합니다.');
 * } else {
 *   console.log('비밀번호가 유효하지 않습니다.');
 * }
 */
const checkNewPassword = (formData, data) => {
  const myKeys = Object.values(formData)
  if (myKeys.includes('')) {
    return true
  } else {
    var validatePattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/
    if (validatePattern.test(data)) {
      if (!/(\w)\1\1/.test(data)) {
        var cnt = 0
        var cnt2 = 0
        var tmp = ''
        var tmp2 = ''
        var tmp3 = ''
        for (var i = 0; i < data.length; i++) {
          tmp = data.charAt(i)
          tmp2 = data.charAt(i + 1)
          tmp3 = data.charAt(i + 2)

          if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) === 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) === 1) {
            cnt = cnt + 1
          }
          if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) === -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) === -1) {
            cnt2 = cnt2 + 1
          }
        }
        if (cnt > 0 || cnt2 > 0) {
          uMessage.showSingleAlertBox('알림', <span class="ti ti-alert-circle error-alert-msg">&nbsp;연속된 문자를 3개 이상 사용하실 수 없습니다.<br></br>(ex: 123, 321, abc, cba 포함 불가)</span>)
          return false
        }
      } else {
        uMessage.showSingleAlertBox('알림', <span class="ti ti-alert-circle error-alert-msg">&nbsp;같은 문자를 3개 이상 사용할 수 없습니다.</span>)
        return false
      }
    } else {
      uMessage.showSingleAlertBox('알림', <span class="ti ti-alert-circle error-alert-msg">&nbsp;비밀번호는 영문자, 숫자, 특수문자 조합의 8~20자리를 사용해야 합니다.</span>)
      return false
    }
    return true
  }
}

/**
 * 주어진 값을 XSS (Cross-site scripting) 공격으로부터 안전하게 처리하는 함수입니다.
 * 이 함수는 허용된 HTML 태그 및 속성만을 허용하고, 나머지 태그는 제거하여 XSS 공격을 방지합니다.
 * 주석 태그는 허용됩니다.
 *
 * @param {string} value - XSS 방지 처리를 할 문자열 값입니다. 이 값은 HTML 콘텐츠일 수 있습니다.
 *
 * @returns {string} - XSS 공격을 방지하도록 정제된 HTML 문자열을 반환합니다.
 *
 * @example
 * const rawHtml = '<div><script>alert("XSS")</script><p>Hello World!</p></div>';
 * const sanitizedHtml = resolveXssValue(rawHtml);
 * console.log(sanitizedHtml); // "<div><p>Hello World!</p></div>"
 */
const resolveXssValue = (value) => {
  return xss(value, {
    allowCommentTag: true,
    onIgnoreTag: function (tag, html, options) {
      /* 주석 wihite 처리 */
      if (tag.substring(0, 3) === '!--') {
        return html
      }
    },
    whiteList: {
      p: ['style'],
      a: ['style'],
      strong: [],
      br: [],
      i: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      span: ['style', 'id'],
      table: ['style', 'border', 'cellpadding', 'cellspacing'],
      tbody: ['style'],
      tr: ['style'],
      /* id로 처리하는 작업들이 있다.(정책 템플릿 등) */
      td: ['style', 'rowspan', 'colspan', 'id'],
      th: ['style', 'rowspan', 'colspan'],
      ol: ['style'],
      li: ['style'],
      ul: ['style'],
      img: ['style', 'src', 'width', 'height'],
      div: ['style', 'id']
    }
  })
}

/**
 * 객체 내의 모든 문자열 값을 XSS (Cross-site scripting) 공격으로부터 안전하게 처리하는 함수입니다.
 * 객체의 속성 값이 배열인 경우, 현재는 배열을 처리하지 않지만 추후 배열 처리 로직이 추가될 예정입니다.
 * 객체 내에 포함된 또 다른 객체에 대해서도 재귀적으로 XSS 처리가 적용됩니다.
 *
 * @param {Object} object - XSS 방지 처리를 할 객체입니다. 객체의 속성 값들이 HTML 콘텐츠일 수 있습니다.
 *
 * @returns {Object} - XSS 공격을 방지하도록 정제된 객체를 반환합니다.
 *
 * @example
 * const rawObject = {
 *   username: '<script>alert("XSS")</script>',
 *   userInfo: { ip: '<img src="x" onerror="alert(\'XSS\')">', domain: 'example.com' }
 * };
 * const sanitizedObject = resolveXssForObject(rawObject);
 * console.log(sanitizedObject);
 * // { username: 'alert("XSS")', userInfo: { ip: 'alert(XSS)', domain: 'example.com' } }
 */
const resolveXssForObject = (object) => {
  const unxss = Object.keys(object).map((key) => {
    if (Array.isArray(object[key])) {
      // TODO 배열 풀어서 xss 반영해야함
      return object
    } else {
      // 타입이 Object일 경우 for문 돌려서 데이터를 처리한다. ({ip, domain, port} => object 타입)
      if (object[key] instanceof Object) {
        for (let i = 0; i < object.size; i++) {
          object[key] = resolveXssValue(object[i][key])
        }
      } else {
        object[key] = resolveXssValue(object[key])
      }
    }
    return object
  })
  return unxss
}

/**
 * 서버로 제출하기 전에 데이터를 준비하는 함수입니다.
 * 이 함수는 수정 또는 신규 추가 작업에 따라 다르게 동작하며, 제출할 데이터를 준비합니다.
 * 또한, 일부 필수 컬럼 및 예외 처리, 데이터 변경 여부를 확인하고, XSS 방지 처리를 추가하는 기능도 포함되어 있습니다.
 *
 * @param {*} data - 제출할 데이터를 포함한 객체입니다.
 * @param {*} originData - 기존에 존재하는 원본 데이터입니다. 수정 작업에서 변경 여부를 비교하는 데 사용됩니다.
 * @param {boolean} isNew - 데이터가 신규인지 수정인지를 나타내는 boolean 값입니다.
 *                           `true`이면 신규 데이터, `false`이면 수정 데이터로 처리됩니다.
 * @param {string} pkKey - 기본 키(primary key)로, 수정 시에 반드시 필요합니다. 신규 데이터에는 사용되지 않습니다.
 * @param {Object} mustHave - 필수 데이터 객체로, 제출할 데이터에 병합됩니다.
 * @param {boolean} [attachWasChanged=false] - 첨부파일이 변경되었는지 여부를 나타내는 flag입니다. 기본값은 `false`입니다.
 *
 * @returns {Object|null} - 준비된 데이터 객체를 반환하며, XSS 처리를 거친 데이터가 반환됩니다.
 *                          수정사항이 없으면 `null`이 반환됩니다.
 *
 * @description
 * **수정 모드 (!isNew)**:
 * - 원본 데이터(originData)와 비교하여 변경된 값만 `preparedData`에 반영됩니다.
 * - `pkKey`는 수정 시 항상 반영됩니다.
 * - `data`와 `originData`의 값을 비교하여 변경된 데이터만 `preparedData`에 추가됩니다.
 * - 배열 데이터와 일반 데이터는 각기 다른 방식으로 비교합니다.
 * - `defaultExceptKeys` 배열에 포함된 키(`regDate`, `modDate`)는 비교에서 제외됩니다.
 * - 수정이 없고 첨부파일도 변경되지 않으면 `preparedData`를 `null`로 설정하여 변경된 사항이 없음을 나타냅니다.
 *
 * **신규 데이터 모드 (isNew)**:
 * - `data`를 그대로 `preparedData`에 할당하여 새로운 데이터를 반영합니다.
 *
 * **필수 데이터 병합**:
 * - `mustHave` 값이 존재하면, `preparedData`에 필수 데이터가 병합됩니다.
 *   이 값은 기본적으로 제출해야 하는 필수 항목들을 포함합니다.
 *
 * **XSS 방지**:
 * - `resolveXssForObject` 함수가 호출되어, `preparedData`에 XSS 공격을 방지하는 처리가 추가됩니다.
 */
const prepareBeforeSubmit = (data, originData, isNew, pkKey, mustHave, attachWasChanged = false) => {
  /* 시스템 공통 비교 예외 컬럼 명 */
  const defaultExceptKeys = ['regDate', 'modDate']
  let preparedData = {}
  if (!isNew && isEmpty(pkKey)) {
    alert('코딩 오류!!!!! 수정(isNew === false) 이면 pkKey 값 필수!!!! ')
  }

  if (!isNew) {
    /* 수정 (원본 데이터와 비교 후 변경된 데이터만 반영) */
    Object.keys(data).forEach((key, index) => {
      /* 수정시 PK는 기본 반영 */
      if (key === pkKey) {
        preparedData[key] = data[key]
      }

      Object.keys(originData).filter((o) => {
        if (key === o) {
          if (data[key] !== undefined && !defaultExceptKeys.includes(key)) {
            /* 배열 데이터 비교 */
            if (Array.isArray(data[key])) {
              if (JSON.stringify(originData[o]) !== JSON.stringify(data[key])) {
                preparedData[key] = data[key]
              }
            } else {
              /* 일반 데이터 비교 */
              const orignVal = emptyIfNullOrNoData(originData[o])
              const targetVal = emptyIfNullOrNoData(data[key])
              if (orignVal !== targetVal) {
                preparedData[key] = data[key]
              }
            }
          }
        }
      })
    })

    /* pkKey만 있는 경우 수정사항이 없는 것! */
    if (Object.keys(preparedData).length === 1 && !attachWasChanged) {
      preparedData = null
    }
  } else {
    /* 신규 (새로운 데이터 그대로 반영) */
    preparedData = data
  }

  if (!isEmpty(mustHave) && preparedData !== null) {
    /* 필수 데이터 병합 */
    preparedData = Object.assign(preparedData, mustHave)
  }
  return (preparedData !== null ? resolveXssForObject(preparedData)[0] : null)
}

const emptyIfNullOrNoData = (val) => {
  if (val === null || val === 'null' || val === '""') {
    return ''
  } else {
    return val
  }
}

/**
 * @description
 * 주어진 데이터로 현재 테이블 행을 업데이트하는 함수입니다.
 * 이 함수는 `updatedData`에 있는 값으로 현재 행(`currRow`)의 해당 항목들을 덮어씁니다.
 * 또한, `currRow`에 기본적으로 필요한 추가 정보를 삽입합니다. 예를 들어,
 * 수정한 사용자의 ID와 수정 시간을 포함시킵니다.
 *
 * @param {Object} updatedData - 테이블 행에 업데이트할 데이터 객체입니다. 객체의 각 키는 `currRow`의 키와 일치해야 하며,
 *                                그 값으로 덮어씌워집니다.
 * @param {Object} currRow - 현재 테이블 행입니다. 이 객체는 `updatedData`에 의해 업데이트됩니다.
 *
 * @returns {void} - 이 함수는 데이터를 반환하지 않습니다. 대신 `currRow` 객체를 직접 수정합니다.
 *
 * @example
 * const updatedData = { name: 'John Doe', age: 30 };
 * const currRow = { name: 'Jane Doe', age: 28, address: '123 Street' };
 * updateCurrentElTableRowForTable(updatedData, currRow);
 * console.log(currRow);
 * // { name: 'John Doe', age: 30, address: '123 Street', modUserId: 'userId123', modDate: '2025-02-07 12:30 45' }
 */
const updateCurrentElTableRowForTable = (updatedData, currRow) => {
  Object.keys(updatedData).forEach((key, index) => {
    Object.keys(currRow).filter((o) => {
      if (key === o) {
        currRow[o] = updatedData[key]
      }
    })
  })
  /* 요청 데이터에 없는 기본정보 */
  currRow.modUserId = storeGlobal.getUserInfo().userId
  currRow.modDate = dayjs().format('YYYY-MM-DD HH:mm ss')
}

/**
 * @description
 * 주어진 `updatedData`를 사용하여 `tableData` 배열 내에서 특정 키값이 일치하는 행들을 업데이트하는 함수입니다.
 * `keyList`에 포함된 값들과 `tableData`의 각 행에서 지정된 `key` 값을 비교하여 일치하는 행을 찾고,
 * 해당 행의 데이터를 `updatedData`로 업데이트합니다. 또한, 업데이트된 행들을 배열로 반환합니다.
 *
 * @param {Object} updatedData - 업데이트할 데이터 객체입니다. 이 객체는 각 행의 `key` 값을 기준으로 해당 행을 찾아
 *                               업데이트하는 데 사용됩니다.
 * @param {Array} tableData - 데이터가 포함된 배열입니다. 각 요소는 테이블 행을 나타내며, `updatedData`로 업데이트됩니다.
 * @param {string} key - `tableData`의 각 행에서 비교할 키입니다. 이 키의 값이 `keyList`와 일치하는 행을 찾습니다.
 * @param {Array} keyList - 각 행에서 비교할 값들의 목록입니다. `tableData`의 행들 중 `key` 값이 `keyList`에 포함된 값과 일치하는
 *                           행을 찾아 `updatedData`로 업데이트합니다.
 *
 * @returns {Array} - 업데이트된 테이블 행들의 배열입니다. 일치하는 행들을 업데이트한 후 그 행들을 반환합니다.
 *
 * @example
 * const updatedData = { name: 'John Doe' };
 * const tableData = [{ id: 1, name: 'Jane Doe' }, { id: 2, name: 'Mark Smith' }];
 * const key = 'id';
 * const keyList = [1];
 * const updatedRows = updateElTableRowForTable(updatedData, tableData, key, keyList);
 * console.log(updatedRows);
 * // [{ id: 1, name: 'John Doe' }]
 */
const updateElTableRowForTable = (updatedData, tableData, key, keyList) => {
  const matchedRows = []
  tableData.forEach(function (row, index) {
    const matched = keyList.filter((data) => row[key] === data)
    if (matched.length === 1) {
      updatedData[key] = matched[0]
      updateCurrentElTableRowForTable(updatedData, row)
      matchedRows.push(row)
    }
  })
  return matchedRows
}

/**
 * @description
 * 주어진 `updatedData`를 사용하여 `tableData` 배열 내에서 지정된 `key`와 `value`가 일치하는 행을 찾아
 * 해당 행을 바로 업데이트하는 함수입니다. 일치하는 행을 찾으면 해당 행의 데이터를 `updatedData`로 덮어씁니다.
 * 이 함수는 업데이트된 데이터를 `tableData` 배열 내에서 직접 수정합니다.
 *
 * @param {Object} updatedData - 업데이트할 데이터 객체입니다. 이 객체는 `tableData`의 일치하는 행을 찾아
 *                               해당 행을 업데이트하는 데 사용됩니다.
 * @param {Array} tableData - 데이터가 포함된 배열입니다. 각 요소는 테이블 행을 나타내며, `updatedData`로 업데이트됩니다.
 * @param {string} key - `tableData`의 각 행에서 비교할 키입니다. 이 키의 값이 `value`와 일치하는 행을 찾아 업데이트합니다.
 * @param {string|number} value - `key`와 비교할 값입니다. `tableData`의 각 행에서 `key` 값이 이 값과 일치하면 해당 행을
 *                                 `updatedData`로 덮어씁니다.
 *
 * @example
 * const updatedData = { id: 1, name: 'John Doe' };
 * const tableData = [{ id: 1, name: 'Jane Doe' }, { id: 2, name: 'Mark Smith' }];
 * const key = 'id';
 * const value = 1;
 * updateDirectlyElTableRowForTable(updatedData, tableData, key, value);
 * console.log(tableData);
 * // [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Mark Smith' }]
 */
const updateDirectlyElTableRowForTable = (updatedData, tableData, key, value) => {
  tableData.forEach((item, index) => {
    if (item[key] === value) {
      tableData[index] = updatedData
    }
  })
}

/**
 * @description
 * 주어진 `dataList` 배열을 순회하면서, 각 데이터 항목의 값을 참조된 트리 노드에 업데이트하는 함수입니다.
 * `ref`는 트리의 참조를 나타내며, 트리 내에서 특정 `key`와 일치하는 노드를 찾아 해당 노드의 데이터를 수정합니다.
 * 각 데이터 항목에서 키가 일치하는 경우에만 값을 업데이트합니다.
 * 값이 유효하지 않으면 (null 또는 빈 문자열) 업데이트하지 않습니다.
 *
 * @param {Object} ref - 트리 컴포넌트의 참조 객체입니다. 이 객체는 `getNode` 메서드를 통해 특정 노드에 접근할 수 있습니다.
 * @param {string} key - 트리 노드를 식별하는 데 사용할 키입니다. 이 키는 `dataList` 내의 각 항목에서 참조됩니다.
 * @param {Array} dataList - 트리 노드에 업데이트할 데이터가 포함된 배열입니다. 각 데이터 항목은 트리의 노드와 연결된 키-값 쌍으로 구성됩니다.
 *
 * @example
 * // 트리 구조가 다음과 같다고 가정합니다:
 * // - 노드 1 (id: 1, name: "Old Node 1", description: "Old Description")
 * // - 노드 2 (id: 2, name: "Old Node 2", description: "Old Description")
 *
 * const ref = treeRef; // 트리 컴포넌트의 참조
 * const key = 'id'; // 트리 노드를 식별할 키 (각 노드의 'id' 값을 사용)
 * const dataList = [
 *   { id: 1, name: 'Updated Node 1', description: 'Updated Description 1' },
 *   { id: 2, name: 'Updated Node 2', description: 'Updated Description 2' }
 * ];
 *
 * updateElTreeNode(ref, key, dataList);
 *
 * // 트리의 결과:
 * // - 노드 1 (id: 1, name: "Updated Node 1", description: "Updated Description 1")
 * // - 노드 2 (id: 2, name: "Updated Node 2", description: "Updated Description 2")
 */
const updateElTreeNode = (ref, key, dataList) => {
  dataList.forEach(function (data, index) {
    Object.keys(data).forEach(function (dataKey, index) {
      const nodeData = ref.getNode(data[key]).data
      Object.keys(nodeData).forEach(function (nodeKey, index) {
        const value = data[dataKey] || null
        if (dataKey === nodeKey && (value !== null && value !== '')) {
          nodeData[nodeKey] = value
        }
      })
    })
  })
}

/**
 * @description
 * 주어진 `newNodeData`를 트리 컴포넌트의 현재 선택된 노드에 자식으로 추가하는 함수입니다.
 *
 * @param {Object} ref - 트리 컴포넌트의 참조 객체입니다.
 * @param {Object} newNodeData - 추가할 새로운 노드의 데이터입니다.
 *
 * @example
 * // 예시: 트리에서 노드를 추가하는 코드
 * const ref = treeRef; // 트리 컴포넌트의 참조
 * const newNodeData = { id: 3, name: 'New Node', description: 'This is a new node' };
 * appendElTreeNode(ref, newNodeData);
 *
 * // 트리에서 현재 선택된 노드 아래에 새로운 노드가 추가됩니다.
 */
const appendElTreeNode = (ref, newNodeData) => {
  // 현재 선택된 노드를 가져옵니다.
  const currNode = ref.getCurrentNode()

  // 새 노드를 현재 선택된 노드의 자식으로 추가합니다.
  ref.append(newNodeData, currNode)
}

/**
 * @description
 * 배열에서 주어진 키와 값에 맞는 항목을 필터링하여 반환하는 함수입니다.
 *
 * @param {Array} arr - 배열입니다.
 * @param {string} key - 비교할 키입니다.
 * @param {any} value - 비교할 값입니다.
 *
 * @example
 * // 예시: 배열에서 특정 키-값에 맞는 항목 찾기
 * const arr = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 3, name: 'John' }
 * ];
 * const result = getItemFromArray(arr, 'name', 'John');
 * console.log(result); // [{ id: 1, name: 'John' }, { id: 3, name: 'John' }]
 */
const getItemFromArray = (arr, key, value) => {
  return arr.filter(item => item[key] === value)
}

/**
 * @description
 * 배열에서 여러 키와 값을 기준으로 값을 포함하는 항목들을 필터링하는 함수입니다.
 *
 * @param {Array} dataList - 필터링할 데이터 리스트입니다.
 * @param {Array} keys - 필터링할 키들의 배열입니다.
 * @param {Array} values - 각 키에 대응하는 필터링할 값들의 배열입니다.
 *
 * @example
 * // 예시: 배열에서 키와 값이 포함된 항목들을 찾기
 * const dataList = [
 *   { name: 'John', city: 'New York' },
 *   { name: 'Jane', city: 'Los Angeles' },
 *   { name: 'John', city: 'San Francisco' }
 * ];
 * const keys = ['name', 'city'];
 * const values = ['John', 'New York'];
 * const result = findItemByKeywordInArray(dataList, keys, values);
 * console.log(result); // [{ name: 'John', city: 'New York' }]
 */
const findItemByKeywordInArray = (dataList, keys, values) => {
  let result = dataList
  keys.forEach((key, index) => {
    if (values[index] !== '') {
      result = result.filter(item => item[key].includes(values[index]))
    }
  })
  return result
}

/**
 * @description
 * 배열의 각 항목에서 특정 키에 해당하는 값들을 구분자로 연결한 문자열로 변환하는 함수입니다.
 *
 * @param {Array} arr - 배열입니다.
 * @param {String} key - 배열 항목의 값에서 추출할 키입니다.
 * @param {String} separator - 각 값들 사이에 사용할 구분자입니다.
 *
 * @example
 * const data = [
 *   { name: 'John' },
 *   { name: 'Jane' },
 *   { name: 'Doe' }
 * ]
 * const result = convertArrayToSeparatedString(data, 'name', ', ');
 * console.log(result); // "John, Jane, Doe"
 */
const convertArrayToSeparatedString = (arr, key, separator) => {
  let result = ''
  arr.forEach((item, index) => {
    if (index >= 0 && arr.length - 1 > index) {
      result += item[key] + separator
    } else {
      result += item[key]
    }
  })
  return result
}

/**
 * @description
 * 주어진 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 상태 값은 'B', 'N', 'P', 'D', 'C', 'T', 'A', 'Y' 등으로 주어지며,
 * 각 상태 값에 맞는 CSS 클래스 이름을 반환합니다.
 *
 * 상태별 클래스:
 * - 'B', 'N': 차단, 비활성화 -> 'status-disabled'
 * - 'P': 준비 -> 'status-prepare'
 * - 'D': 삭제, 폐기 -> 'status-deleted'
 * - 'C': 종료 -> 'status-closed'
 * - 'T': 임시 -> 'status-temporary'
 * - 'A', 'Y': 활성화, 운영 -> 'status-active'
 *
 * @param {String} value - 상태 값입니다. ('B', 'N', 'P', 'D', 'C', 'T', 'A', 'Y')
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const statusClass = getStatusClassName('A');
 * console.log(statusClass); // "status-active"
 */
const getStatusClassName = (value) => {
  let clazz = null
  switch (value) {
    case 'B':
    case 'N':
      clazz = 'status-disabled'
      break
    case 'P':
      clazz = 'status-prepare'
      break
    case 'D':
      clazz = 'status-deleted'
      break
    case 'C':
      clazz = 'status-closed'
      break
    case 'T':
      clazz = 'status-temporary'
      break
    case 'A':
    case 'Y':
      clazz = 'status-active'
      break
    default:
      clazz = ''
  }
  return clazz
}

/**
 * @description
 * 주어진 평가 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 상태 값은 'P', 'D', 'C', 'O' 등으로 주어지며,
 * 각 상태 값에 맞는 CSS 클래스 이름을 반환합니다.
 *
 * 상태별 클래스:
 * - 'P': 준비 -> 'status-prepare'
 * - 'D': 삭제, 폐기 -> 'status-deleted'
 * - 'C': 완료 -> 'status-completed'
 * - 'O': 점검중 -> 'status-ongoing'
 *
 * @param {String} value - 평가 상태 값입니다. ('P', 'D', 'C', 'O')
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const evaluationStatusClass = getEvaluationStatusClassName('C');
 * console.log(evaluationStatusClass); // "status-completed"
 */
const getEvaluationStatusClassName = (value) => {
  let clazz = null
  switch (value) {
    case 'P':
      clazz = 'status-prepare'
      break
    case 'D':
      clazz = 'status-deleted'
      break
    case 'C':
      clazz = 'status-completed'
      break
    case 'O':
      clazz = 'status-ongoing'
      break
    default:
      clazz = ''
  }
  return clazz
}

/**
 * @description
 * 주어진 취약점 요청 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 상태 값은 'A', 'B'로 주어지며,
 * 각 상태 값에 맞는 CSS 클래스 이름을 반환합니다.
 *
 * 상태별 클래스:
 * - 'A': 준비 -> 'status-prepare'
 * - 'B': 완료 -> 'status-completed'
 *
 * @param {String} value - 취약점 요청 상태 값입니다. ('A', 'B')
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const vulnRequestStatusClass = getExceptedVulnRequestClassName('A');
 * console.log(vulnRequestStatusClass); // "status-prepare"
 */
const getExceptedVulnRequestClassName = (value) => {
  let clazz = null
  switch (value) {
    case 'A':
      clazz = 'status-prepare'
      break
    case 'B':
      clazz = 'status-completed'
      break
    default:
      clazz = ''
  }
  return clazz
}

/**
 * @description
 * 보안 리뷰 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 상태 값에 따라 각각 다른 상태 클래스를 반환합니다.
 *
 * 상태값:
 * - 'A': 준비 상태
 * - 'B': 진행 중 상태
 * - 'C': 활성 상태
 * - 'D': 완료 상태
 *
 * @param {String} value - 보안 리뷰 상태 값 (A~Z)
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const reviewStatusClass = getSecReviewStatusClassName('A');
 * console.log(reviewStatusClass); // "status-prepare"
 */
const getSecReviewStatusClassName = (value) => {
  let clazz = ''
  const num = value.charCodeAt(0)

  if (num === 65) { // 'A'
    clazz = 'status-prepare' // 준비 상태
  } else if (num === 66) { // 'B'
    clazz = 'status-ongoing' // 진행 중 상태
  } else if (num > 66 && num <= 70) { // 'C', 'D' 등을 포함
    clazz = 'status-active' // 활성 상태
  } else if (num > 70 && num <= 72) { // 'F', 'G' 등을 포함
    clazz = 'status-pre-completed' // 완료 전 상태
  } else {
    clazz = 'status-completed' // 완료 상태
  }

  return clazz
}

/**
 * @description
 * 정책 수준 값에 따라 해당하는 수준 클래스를 반환하는 함수입니다.
 * 각 수준 값에 따라 다른 클래스 이름을 반환합니다.
 *
 * 수준 값:
 * - 'C': 긴급 (Critical)
 * - 'H': 상 (High)
 * - 'M': 중 (Medium)
 * - 'L': 하 (Low)
 *
 * @param {String} value - 정책 수준 값 (C, H, M, L)
 * @returns {String} - 해당하는 수준 클래스 이름
 *
 * @example
 * const policyLevelClass = getPolicyLevelClassName('C');
 * console.log(policyLevelClass); // "level-C"
 */
const getPolicyLevelClassName = (value) => {
  if (value === 'C') {
    return 'level-C' // 긴급 (Critical)
  } else if (value === 'H') {
    return 'level-H' // 상 (High)
  } else if (value === 'M') {
    return 'level-M' // 중 (Medium)
  } else if (value === 'L') {
    return 'level-L' // 하 (Low)
  } else {
    return '' // 값이 없으면 빈 문자열 반환
  }
}

/**
 * @description
 * 자산 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 각 상태 값에 따라 다른 클래스 이름을 반환합니다.
 *
 * 상태 값:
 * - 'A', 'B': 활성 상태 (Active)
 * - 'C': 기본 상태 (None)
 * - 'D': 삭제됨 (Deleted)
 * - 'E', 'N': 종료됨 (Closed)
 * - 'F': 준비 상태 (Prepare)
 * - 'Z': 삭제됨 (Deleted)
 *
 * @param {String} value - 자산 상태 값 (A, B, C, D, E, F, N, Z)
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const assetStatusClass = getAssetRowClassName('A');
 * console.log(assetStatusClass); // "status-active"
 */
const getAssetRowClassName = (value) => {
  let clazz = null
  switch (value) {
    case 'A':
    case 'B':
      clazz = 'status-active' // 활성 상태 (Active)
      break
    case 'C':
      clazz = '' // 기본 상태 (None)
      break
    case 'D':
      clazz = 'status-deleted' // 삭제됨 (Deleted)
      break
    case 'E':
    case 'N':
      clazz = 'status-closed' // 종료됨 (Closed)
      break
    case 'F':
      clazz = 'status-prepare' // 준비 상태 (Prepare)
      break
    case 'Z':
      clazz = 'status-deleted' // 삭제됨 (Deleted)
      break
    default:
      clazz = '' // 값이 없으면 빈 문자열 반환
  }
  return clazz
}

/**
 * @description
 * CVE 상태 값에 따라 해당하는 상태 클래스를 반환하는 함수입니다.
 * 각 상태 값에 따라 다른 클래스 이름을 반환합니다.
 *
 * 상태 값:
 * - 'A', '0': 진행 중 (Ongoing)
 * - 'B', '1', 'D': 삭제됨 (Deleted)
 * - 'C', 'N': 종료됨 (Closed)
 *
 * @param {String} value - CVE 상태 값 ('A', 'B', 'C', 'D', 'N', '1', '0')
 * @returns {String} - 해당하는 상태 클래스 이름
 *
 * @example
 * const cveStatusClass = getCveRowClassName('A');
 * console.log(cveStatusClass); // "status-ongoing"
 */
const getCveRowClassName = (value) => {
  let clazz = null
  switch (value) {
    case 'A':
    case '0':
      clazz = 'status-ongoing' // 진행 중 (Ongoing)
      break
    case 'B':
    case '1':
    case 'D':
      clazz = 'status-deleted' // 삭제됨 (Deleted)
      break
    case 'C':
    case 'N':
      clazz = 'status-closed' // 종료됨 (Closed)
      break
    default:
      clazz = '' // 값이 없으면 빈 문자열 반환
  }
  return clazz
}

/**
 * @description
 * 바이트 단위의 크기를 적절한 단위로 변환하는 함수입니다.
 * 바이트, 킬로바이트(KB), 메가바이트(MB), 기가바이트(GB) 등으로 자동 변환하여 반환합니다.
 *
 * @param {number} bytes - 변환할 바이트 값
 * @param {number} [decimals=2] - 소수점 아래 자릿수 (기본값 2)
 * @returns {string} - 변환된 파일 크기 (예: "1.23 MB")
 *
 * @example
 * const fileSize = formatBytes(1048576);
 * console.log(fileSize); // "1.00 MB"
 */
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes' // 바이트가 0인 경우
  const k = 1024 // 1KB = 1024 Bytes
  const dm = decimals < 0 ? 0 : decimals // 소수점 자릿수 처리
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] // 각 단위
  const i = Math.floor(Math.log(bytes) / Math.log(k)) // 변환할 단위 인덱스 계산
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i] // 해당 단위로 변환 후 반환
}

/**
 * 배열에서 특정 아이템을 삭제합니다.
 *
 * @description 이 함수는 주어진 배열에서 특정 아이템을 찾아 삭제합니다.
 *
 * @param {Array} arr - 아이템을 삭제할 배열
 * @param {*} item - 삭제할 아이템
 *
 * @example
 * const myArray = [1, 2, 3, 4];
 * deleteItemInArray(myArray, 3);
 * console.log(myArray); // [1, 2, 4]
 */
const deleteItemInArray = (arr, item) => {
  const targetItemIdx = arr.indexOf(item)
  arr.splice(targetItemIdx, 1)
}

/**
 * 주어진 값을 AES 알고리즘을 사용하여 암호화합니다.
 *
 * @description 이 함수는 `cryptojs` 라이브러리를 사용하여 주어진 값을 AES 알고리즘으로 암호화합니다. 암호화된 값은 문자열로 반환됩니다.
 *
 * @param {string} key - 암호화에 사용할 키
 * @param {*} value - 암호화할 값
 *
 * @returns {string|null} 암호화된 문자열 값 또는 값이 비어있을 경우 `null`
 *
 * @example
 * const encrypted = encryptAES('mySecretKey', { username: 'user1', password: 'password123' });
 * console.log(encrypted); // AES 암호화된 문자열
 */
const encryptAES = (key, value) => {
  if (!isEmpty(value)) {
    return cryptojs.AES.encrypt(JSON.stringify(value), key).toString()
  } else {
    return null
  }
}

/**
 * 주어진 값을 AES 알고리즘을 사용하여 IV(Initialization Vector)와 함께 암호화합니다.
 *
 * @description 이 함수는 `cryptojs` 라이브러리를 사용하여 주어진 값을 AES 알고리즘으로 암호화합니다. 암호화는 CBC 모드와 16바이트 IV를 사용하여 수행됩니다. 암호화된 값은 문자열로 반환됩니다.
 *
 * @param {string} key - 암호화에 사용할 키
 * @param {*} value - 암호화할 값
 *
 * @returns {string|null} 암호화된 문자열 값 또는 값이 비어있을 경우 `null`
 *
 * @example
 * const encrypted = encryptAESWithIV('mySecretKey', { username: 'user1', password: 'password123' });
 * console.log(encrypted); // AES 암호화된 문자열 (IV 포함)
 */
const encryptAESWithIV = (key, value) => {
  if (!isEmpty(value)) {
    const keyUtf8 = cryptojs.enc.Utf8.parse(key) // 키를 UTF-8로 변환
    const iv = cryptojs.enc.Utf8.parse('1234567890123456') // 16바이트 IV 설정
    // CBC 모드에서 IV 설정
    return cryptojs.AES.encrypt(JSON.stringify(value), keyUtf8, {
      iv: iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.Pkcs7
    }).toString()
  } else {
    return null
  }
}

/**
 * 주어진 값을 AES 알고리즘을 사용하여 버전 2로 암호화합니다. IV는 주어진 키에서 파생됩니다.
 *
 * @description 이 함수는 `cryptojs` 라이브러리를 사용하여 주어진 값을 AES 알고리즘으로 암호화합니다. 암호화는 CBC 모드에서 16바이트 IV와 함께 수행됩니다. 주어진 키에서 IV를 추출하여 사용합니다. 암호화된 값은 문자열로 반환됩니다.
 *
 * @param {string} key - 암호화에 사용할 키 (16자 이상)
 * @param {*} value - 암호화할 값
 *
 * @returns {string|null} 암호화된 문자열 값 또는 값이 비어있을 경우 `null`
 *
 * @example
 * const encrypted = encryptAESV2('mySecretKeyForAES', { username: 'user1', password: 'password123' });
 * console.log(encrypted); // AES 암호화된 문자열 (IV 포함)
 */
const encryptAESV2 = (key, value) => {
  if (!isEmpty(value)) {
    const iv = cryptojs.enc.Utf8.parse(key.substring(0, 16)) // 16-byte IV
    const encrypted = cryptojs.AES.encrypt(JSON.stringify(value), cryptojs.enc.Utf8.parse(key), {
      iv: iv,
      mode: cryptojs.mode.CBC,
      padding: cryptojs.pad.Pkcs7
    })
    return encrypted.toString()
  } else {
    return null
  }
}

/**
 * 주어진 값을 AES 알고리즘을 사용하여 복호화합니다.
 *
 * @description 이 함수는 `cryptojs` 라이브러리를 사용하여 암호화된 문자열을 복호화하고, 복호화된 값을 반환합니다. AES 알고리즘을 사용하여 복호화하며, 복호화된 값은 JSON 형식으로 반환됩니다.
 *
 * @param {string} key - 복호화에 사용할 키
 * @param {string} value - 복호화할 암호화된 값
 *
 * @returns {*} 복호화된 값 (원본 값이 객체일 경우)
 *
 * @example
 * const decrypted = decryptAES('mySecretKeyForAES', encryptedValue);
 * console.log(decrypted); // 복호화된 객체 (원본 값)
 */
const decryptAES = (key, value) => {
  if (!isEmpty(value)) {
    const bytes = cryptojs.AES.decrypt(value, key)
    return JSON.parse(bytes.toString(cryptojs.enc.Utf8))
  } else {
    return null
  }
}

/**
 * 환경에 따라 값을 AES로 암호화하거나 그대로 반환합니다.
 *
 * @description 이 함수는 `process.env.NODE_ENV` 값에 따라, `local` 환경에서는 입력 값을 그대로 반환하고, 그 외의 환경에서는 `encryptAES` 함수를 사용하여 값을 AES로 암호화하여 반환합니다.
 *
 * @param {*} value - 암호화할 값
 *
 * @returns {*} 암호화된 값 (또는 local 환경에서는 입력 값 그대로 반환)
 *
 * @example
 * const encryptedValue = encryptAESStore(myData);
 * console.log(encryptedValue); // 환경에 따라 암호화된 값 또는 원본 값
 */
const encryptAESStore = (value) => {
  if (process.env.NODE_ENV !== 'local') {
    return encryptAES('my-----name------is----your-guy', value)
  } else {
    return value
  }
}

/**
 * 환경에 따라 값을 AES로 복호화하거나 그대로 반환합니다.
 *
 * @description 이 함수는 `process.env.NODE_ENV` 값에 따라, `local` 환경에서는 입력 값을 그대로 반환하고, 그 외의 환경에서는 `decryptAES` 함수를 사용하여 값을 AES로 복호화하여 반환합니다.
 *
 * @param {*} value - 복호화할 값
 *
 * @returns {*} 복호화된 값 (또는 local 환경에서는 입력 값 그대로 반환)
 *
 * @example
 * const decryptedValue = decryptAESStore(encryptedData);
 * console.log(decryptedValue); // 환경에 따라 복호화된 값 또는 원본 값
 */
const decryptAESStore = (value) => {
  if (process.env.NODE_ENV !== 'local') {
    return decryptAES('my-----name------is----your-guy', value)
  } else {
    return value
  }
}

/**
 * 현재 페이지에 대한 사용자 권한을 체크합니다.
 *
 * @description 이 함수는 현재 페이지에 대한 사용자 권한을 확인하고, 해당 권한이 주어진 조건에 맞는지 여부를 반환합니다. `data`가 배열일 경우, 배열에 있는 모든 항목에 대해 확인하며, `data`가 문자열일 경우 하나의 권한을 체크합니다.
 *
 * @param {boolean} boolean - 확인할 권한 상태 (예: `true`는 권한 있음, `false`는 권한 없음)
 * @param {string | string[]} data - 확인할 권한 목록 (단일 권한 문자열 또는 권한 목록 배열) . ['c', 'r', 'u', 'd']
 *
 * @returns {boolean} 권한이 주어진 조건에 맞으면 `true`, 아니면 `false`
 *
 * @example
 * const result = checkCurrentMenuUserPermit(true, 'edit');
 * console.log(result); // true: 권한 있음, false: 권한 없음
 */
const checkCurrentMenuUserPermit = (boolean, data) => {
  const permit = uRouter.getCurrentPagePermitInfo()
  let result = !boolean
  if (permit !== undefined) {
    if (Array.isArray(data)) {
      for (const item of data) {
        if (permit[item] === boolean) {
          result = boolean
        }
      }
    } else if (typeof data === 'string') {
      if (permit[data]) {
        result = true
      } else {
        result = false
      }
    } else {
      result = true
    }
  }
  return result
}

/*
  유저별 권한 체크
  arr 포함시키고 싶은 권한 코드 집합배열
*/
const checkUserPermit = (arr, parentCode) => {
  if (Array.isArray(arr)) {
    if (parentCode === 'taskCode') {
      return arr.includes(storeGlobal.getUserInfo().taskCode)
    } else if (parentCode === 'searchScope') {
      return arr.includes(storeGlobal.getUserInfo().searchScope)
    }
  }
}

/**
 * 배열의 특정 프로퍼티 값을 구분자로 연결한 문자열로 변환합니다.
 *
 * @description 이 함수는 주어진 배열에서 각 객체의 특정 프로퍼티 값을 추출하여, 그 값들을 지정된 구분자(`separator`)로 연결하여 문자열로 반환합니다. 배열이 비어있으면 `defaultValue`를 반환합니다.
 *
 * @param {Array} array - 변환할 배열
 * @param {string} prop - 배열의 각 객체에서 추출할 프로퍼티 이름
 * @param {string} defaultValue - 배열이 비어있을 때 반환할 기본 값
 * @param {string} separator - 배열의 값을 연결할 구분자
 *
 * @returns {string} 변환된 문자열 또는 기본 값
 *
 * @example
 * const result = convertArrayToString([{ name: 'John' }, { name: 'Jane' }], 'name', 'N/A', ', ');
 * console.log(result); // "John, Jane"
 */
const convertArrayToString = (array, prop, defaultValue, separator) => {
  if (!isEmpty(array)) {
    const result = []
    array.forEach(data => {
      result.push(data[prop])
    })
    return result.join(separator)
  } else {
    return defaultValue
  }
}

const convertArrayToString3 = (array, prop1, prop2, defaultValue, separator) => {
  if (!isEmpty(array)) {
    const result = []
    array.forEach(data => {
      result.push(data[prop1] + '/' + data[prop2])
    })
    return result.join(separator)
  } else {
    return defaultValue
  }
}

const convertArrayToString2 = (array, prop1, prop2, defaultValue, separator) => {
  if (!isEmpty(array)) {
    const result = []
    array.forEach(data => {
      result.push(' ' + data[prop1] + ':' + (data[prop2] !== '' ? data[prop2] : '미지정'))
    })
    return result.join(separator)
  } else {
    return defaultValue
  }
}

/**
 * 입력된 값을 정규식에 맞춰 수정하고, 모델을 업데이트합니다.
 *
 * 이 함수는 사용자가 입력한 값을 특정 정규식에 맞게 필터링하여 허용된 값만을 입력값으로 유지하고,
 * 모델을 업데이트합니다. 각 정규식 유형에 따라 입력값을 처리할 수 있습니다.
 *
 * - 0: 문자, 숫자, ., -, _만 허용
 * - 1: 숫자, .만 허용
 * - 2: 숫자만 허용
 * - 3: 한글과 공백 방지
 *
 * 정규식에 맞지 않는 값은 자동으로 제거되며, `model`에 업데이트된 값이 반영됩니다.
 *
 * @param {Event} e - 입력 이벤트 객체. 사용자가 입력한 값은 `e.target.value`로 접근할 수 있습니다.
 * @param {number} regexType - 적용할 정규식 유형을 지정합니다.
 * 0: 문자, 숫자, ., -, _만 허용<br>
 * 1: 숫자, .만 허용<br>
 * 2: 숫자만 허용<br>
 * 3: 한글과 공백 방지<br>
 * @param {string} model - 수정된 값을 반영할 모델. `model`은 함수 내부에서 수정된 값으로 업데이트됩니다.
 *
 * @returns {void} 이 함수는 입력값을 필터링하고, 모델을 업데이트하며 값을 반환하지 않습니다.
 *
 * @example
 * // 숫자와 .만 입력되도록 제한하고 모델 업데이트
 * preventInputKeyUp(event, 1, model);
 */
const preventInputKeyUp = (e, regexType, model) => {
  const val = e.target.value
  let regex = ''
  switch (regexType) {
    case 0:
      regex = /[^A-Za-z0-9._-]/gi
      break
    case 1:
      regex = /[^0-9.]/gi
      break
    case 2:
      regex = /[^0-9]/gi
      break
    case 3:
      regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]/g
      break
    default:
      break
  }
  const replacedValue = val.replace(regex, '')
  e.target.value = replacedValue
  if (!isEmpty(model)) {
    model = replacedValue
  }
}

/**
 * 배열 내의 항목을 고유 키를 기준으로 업데이트하고, 특정 속성 값들을 유지합니다.
 *
 * @description
 * 주어진 `uniqueKey` 값을 기준으로 `orgArray` 내에서 해당 항목을 찾고,
 * `newData`로 항목을 업데이트합니다. 만약 `remainProps`가 주어지면,
 * 그 속성들은 기존 값으로 유지됩니다.
 *
 * @param {Array} orgArray - 업데이트할 대상 배열입니다.
 * @param {string} uniqueKey - 배열 항목에서 고유 키로 사용할 속성명입니다.
 * @param {Object} newData - 업데이트할 새로운 데이터입니다.
 * @param {Array} remainProps - 유지할 속성들의 배열입니다.
 *
 * @example
 * const orgArray = [
 *   { id: 1, name: 'Alice', age: 25 },
 *   { id: 2, name: 'Bob', age: 30 }
 * ];
 * const newData = { id: 2, name: 'Bob', age: 32 };
 * const remainProps = ['name']; // "name" 속성은 기존 값으로 유지됩니다.
 *
 * updateMyDataInArray(orgArray, 'id', newData, remainProps);
 * console.log(orgArray);
 * // 결과: [
 * //   { id: 1, name: 'Alice', age: 25 },
 * //   { id: 2, name: 'Bob', age: 32 }
 * // ]
 */
const updateMyDataInArray = (orgArray, uniqueKey, newData, remainProps) => {
  const remainPropValues = []
  try {
    orgArray.forEach(item => {
      if (item[uniqueKey] === newData[uniqueKey]) {
        if (!isEmpty(remainProps) && Array.isArray(remainProps)) {
          remainProps.forEach(pn => {
            remainPropValues.push(item[pn])
          })
        }

        Object.assign(item, newData)

        if (!isEmpty(remainProps) && Array.isArray(remainProps)) {
          remainProps.forEach((pn, index) => {
            item[pn] = remainPropValues[index]
          })
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * 공통 코드 데이터를 기반으로 체크된 값을 반환하는 함수입니다.
 *
 * @description
 * `labelData`의 각 항목과 `valueData`의 항목을 비교하여 일치하는 항목에 대해
 * `key`, `name`, `checked`, `column` 값을 포함한 객체를 반환합니다.
 * `labelData`는 공통 코드 리스트이고, `valueData`는 체크된 값이 있는 데이터입니다.
 *
 * @param {Object} labelData - 공통 코드 데이터 객체입니다. `labelData.value`는 코드 목록을 포함합니다.
 * @param {Array} valueData - 체크된 데이터 목록입니다. 각 항목은 `key`, `value`, `column` 속성을 포함합니다.
 *
 * @returns {Array} 일치하는 항목들의 `key`, `name`, `checked`, `column`을 포함하는 배열입니다.
 *
 * @example
 * const labelData = {
 *   value: [
 *     { code: 'A', name: 'Active' },
 *     { code: 'B', name: 'Blocked' }
 *   ]
 * };
 *
 * const valueData = [
 *   { key: 'A', value: true, column: 'status' },
 *   { key: 'B', value: false, column: 'status' }
 * ];
 *
 * const result = makeCommonCodeCheck(labelData, valueData);
 * console.log(result);
 * // 결과: [
 * //   { key: 'A', name: 'Active', checked: true, column: 'status' },
 * //   { key: 'B', name: 'Blocked', checked: false, column: 'status' }
 * // ]
 */
const makeCommonCodeCheck = (labelData, valueData) => {
  if (labelData === null || labelData === undefined) {
    console.log('공통코드 데이터 없음!!!')
  }

  const result = []
  const cloneData = labelData.value

  cloneData.forEach((items, index) => {
    const lKey = items.code
    const lVal = items.name
    valueData.forEach((vItems, vIndex) => {
      const vKey = vItems.key
      if (lKey === vKey) {
        const inArr = { key: lKey, name: lVal, checked: valueData[vIndex].value, column: valueData[vIndex].column }
        result.push(inArr)
      }
    })
  })
  return result
}

/**
 * 주어진 퍼센티지에 맞는 진행 바 스타일을 반환하는 함수입니다.
 *
 * @description
 * `percentage`에 따라 진행 바의 색상을 설정합니다. 설정된 색상은 단계별로 다르게 지정됩니다.
 * 색상은 커스텀 컬러 목록에 정의되어 있으며, 각 단계는 퍼센티지 기준으로 다르게 적용됩니다.
 *
 * @param {number} percentage - 진행 상태를 나타내는 퍼센티지 값입니다. 0에서 100 사이의 값이어야 합니다.
 * @param {number} [pin] - 특정한 단계의 퍼센티지를 지정하는 값입니다. 지정되지 않으면 `percentage`와 동일한 값으로 처리됩니다.
 *
 * @returns {string} 퍼센티지에 해당하는 색상을 나타내는 CSS 색상 문자열입니다.
 *
 * @example
 * const color = setCommonProgressBarStyle(40);
 * console.log(color);
 * // 결과: '#3C467D' (퍼센티지가 40%일 때 적용되는 색상)
 */
const setCommonProgressBarStyle = (percentage, pin) => {
  pin = pin || percentage
  const customColors = [
    { color: '#2d425f42', percentage: 30 },
    { color: '#3C467D', percentage: 40 },
    { color: '#2d425f9c', percentage: 60 },
    { color: '#1E3269', percentage: 80 },
    /** 100%는 green */
    { color: 'rgb(48 179 107)', percentage: 100 }
  ]

  if (percentage < 30 && percentage === pin) {
    return customColors[0].color
  }
  if (percentage < 60 && percentage === pin) {
    return customColors[2].color
  }
  if (percentage < 80 && percentage === pin) {
    return customColors[3].color
  }
  if (percentage === 100 && percentage === pin) {
    return customColors[4].color
  }
}

/**
 * HTML 태그를 이스케이프하여 안전하게 변환하는 함수입니다.
 *
 * @description
 * 이 함수는 입력된 문자열에서 `<`와 `>` 문자를 HTML 엔티티(`&lt;`, `&gt;`)로 변환하여
 * HTML 태그가 그대로 출력되지 않도록 방지합니다. 주로 사용자 입력을 HTML로 출력할 때 사용됩니다.
 *
 * @param {string} str - 이스케이프할 문자열입니다.
 *
 * @returns {string} 변환된 문자열을 반환합니다. `<`와 `>` 문자는 각각 `&lt;`, `&gt;`로 변환됩니다.
 *
 * @example
 * const escapedStr = escapeHtml('<div>Hello</div>');
 * console.log(escapedStr);
 * // 결과: '&lt;div&gt;Hello&lt;/div&gt;'
 */
const escapeHtml = (str) => {
  const entityMap = {
    '<': '&lt;',
    '>': '&gt;'
  }
  return String(str).replace(/[<>]/g, function (s) {
    return entityMap[s]
  })
}

/**
 * 주어진 시작 연도부터 현재 연도까지의 연도 목록을 생성하는 함수입니다.
 *
 * @description
 * 이 함수는 `beginningYear`부터 현재 연도까지의 연도 객체 목록을 생성하여 반환합니다.
 * 각 연도는 `{ name, code }` 형태의 객체로 구성됩니다. `name`과 `code` 값은 모두 연도를 문자열로 저장합니다.
 *
 * @param {number} beginningYear - 목록을 생성할 시작 연도입니다.
 *
 * @returns {Array} 연도 객체 배열을 반환합니다. 각 객체는 `{ name, code }` 형식입니다.
 *
 * @example
 * const yearList = makeYearList(2000);
 * console.log(yearList);
 * // 결과: [{ name: '2000', code: '2000' }, { name: '2001', code: '2001' }, ... , { name: '2025', code: '2025' }]
 */
const makeYearList = (beginningYear) => {
  const list = []
  const currentYear = dayjs().format('YYYY')
  for (let i = beginningYear; i <= currentYear; i++) {
    list.push({ name: String(i), code: String(i) })
  }
  return list
}

/**
 * 디바운스를 적용하여, 일정 시간 내에 반복적으로 호출된 함수 실행을 제한하는 함수입니다.
 * 이 함수는 `stackData` 배열에 데이터를 누적하여, 지정된 시간(`limit`) 후 마지막 데이터를 처리하도록 합니다.
 *
 * @description
 * 주어진 `callback` 함수가 `limit` 시간 내에 여러 번 호출되면 마지막 호출만 실행되도록 합니다.
 * `stackData` 배열에 호출된 인자를 추가하고, 디바운스 시간(`limit`) 이후 마지막 데이터로 `callback`이 실행됩니다.
 *
 * @param {Function} callback - 디바운스를 적용할 콜백 함수입니다.
 * @param {Array} stackData - 데이터가 누적될 배열입니다.
 * @param {number} [limit=3000] - 디바운스를 적용할 시간(밀리초)입니다. 기본값은 3000ms입니다.
 *
 * @returns {Function} 디바운스 처리된 함수를 반환합니다.
 *
 * @example
 * const myCallback = (data) => { console.log(data) };
 * const stack = [];
 * const debouncedFunc = debounceWithStackData(myCallback, stack);
 * debouncedFunc("first");
 * debouncedFunc("second");
 * setTimeout(() => debouncedFunc("third"), 1000); // 1초 후 'third'만 출력
 */
const debounceWithStackData = (callback, stackData, limit = 3000) => {
  let timeout
  return (...args) => {
    stackData.push(args[0])
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback.apply(this, args)
    }, limit)
  }
}

/**
 * 주어진 `data` 객체에서 문자열 형태의 배열을 JSON 객체로 변환하는 함수입니다.
 * 주어진 `keys`에 해당하는 키들의 값이 문자열 배열일 경우, 이를 파싱하여 객체 배열로 변환합니다.
 *
 * @description
 * 이 함수는 `keys` 배열에 포함된 키들에 대해, 해당 키의 값이 문자열 형태의 배열이면 이를 JSON 파싱하여 객체 배열로 변환합니다.
 * 만약 값이 비어있으면 빈 배열로 설정됩니다.
 *
 * @param {Object} data - 문자열 배열을 객체 배열로 변환할 대상 객체입니다.
 * @param {Array} keys - 변환을 적용할 키들의 배열입니다.
 *
 * @example
 * const data = { key1: '[{"id": 1, "name": "item1"}]', key2: '[]' };
 * const keys = ['key1', 'key2'];
 * replaceStrArrayToObjArray(data, keys);
 * console.log(data); // { key1: [{ id: 1, name: 'item1' }], key2: [] }
 */
const replaceStrArrayToObjArray = (data, keys) => {
  keys.forEach(tKey => {
    Object.keys(data).forEach(function (key, index) {
      if (tKey === key) {
        if (isEmpty(data[tKey])) {
          data[tKey] = []
        } else {
          data[tKey] = JSON.parse(data[tKey])
        }
      }
    })
  })
}

/**
 * 주어진 `data` 객체에서 객체 배열을 문자열 형태의 배열로 변환하는 함수입니다.
 * 주어진 `keys`에 해당하는 키들의 값이 객체 배열일 경우, 이를 JSON 문자열로 변환합니다.
 * 만약 값이 비어있거나 `null`이면 빈 배열로 설정됩니다.
 *
 * @description
 * 이 함수는 `keys` 배열에 포함된 키들에 대해, 해당 키의 값이 객체 배열일 경우 이를 JSON 문자열로 변환합니다.
 * 만약 값이 비어있거나 `null`이면 빈 배열로 설정됩니다.
 *
 * @param {Object} data - 객체 배열을 문자열 배열로 변환할 대상 객체입니다.
 * @param {Array} keys - 변환을 적용할 키들의 배열입니다.
 *
 * @example
 * const data = { key1: [{ id: 1, name: "item1" }], key2: [] };
 * const keys = ['key1', 'key2'];
 * replaceObjArrayToStrArray(data, keys);
 * console.log(data); // { key1: '[{"id":1,"name":"item1"}]', key2: [] }
 */
const replaceObjArrayToStrArray = (data, keys) => {
  keys.forEach(tKey => {
    Object.keys(data).forEach(function (key, index) {
      if (tKey === key) {
        if (data[tKey] === null || data[tKey].length === 0) {
          data[tKey] = []
        } else {
          data[tKey] = JSON.stringify(data[tKey])
        }
      }
    })
  })
}

/**
 * 주어진 두 날짜를 비교하여, 첫 번째 날짜가 두 번째 날짜보다 더 늦은지 확인하는 함수입니다.
 * 날짜가 잘못 입력된 경우, 메시지를 출력합니다.
 *
 * @description
 * 이 함수는 `startDate`와 `endDate`를 비교하여, `startDate`가 `endDate`보다 더 늦으면 `true`를 반환합니다.
 * 만약 날짜가 잘못 입력된 경우, 기본 메시지 또는 전달된 메시지를 출력합니다.
 *
 * @param {string|Date} startDate - 비교할 첫 번째 날짜입니다.
 * @param {string|Date} endDate - 비교할 두 번째 날짜입니다.
 * @param {string} [msg] - 날짜가 잘못 입력된 경우 출력할 사용자 정의 메시지입니다. 기본 메시지는 '입력하신 일자를 다시 확인바랍니다.'입니다.
 *
 * @returns {boolean} `startDate`가 `endDate`보다 더 늦으면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const startDate = '2025-02-10';
 * const endDate = '2025-02-09';
 * const result = diffDates(startDate, endDate);
 * console.log(result); // true
 *
 * @example
 * const startDate = '2025-02-08';
 * const endDate = '2025-02-09';
 * const result = diffDates(startDate, endDate, '시작일자가 종료일자보다 뒤에 있을 수 없습니다.');
 * console.log(result); // false, '시작일자가 종료일자보다 뒤에 있을 수 없습니다.' 메시지 출력
 */
const diffDates = (startDate, endDate, msg) => {
  const sDate = dayjs(startDate)
  const eDate = dayjs(endDate)
  const result = sDate.diff(eDate) > 0

  if (result) {
    if (isEmpty(msg)) uMessage.showMessage('입력하신 일자를 다시 확인바랍니다.', 'error', 3000)
    else uMessage.showMessage(msg, 'error', 3000)
  }

  return result
}

/**
 * HTTP 응답에서 `Content-Disposition` 헤더를 추출하여 다운로드 파일명을 반환하는 함수입니다.
 *
 * @description
 * 이 함수는 HTTP 응답의 `Content-Disposition` 헤더에서 파일명을 추출합니다.
 * `Content-Disposition` 헤더의 `filename` 값을 기반으로 파일명을 파싱하여 반환합니다.
 * 파일명이 없거나 잘못된 형식인 경우 오류가 발생할 수 있습니다.
 *
 * @param {Object} response - HTTP 응답 객체입니다. 응답 객체의 `headers['content-disposition']` 값을 통해 파일명을 추출합니다.
 *
 * @returns {string} 파일명을 반환합니다. 파일명이 없으면 빈 문자열을 반환합니다.
 *
 * @example
 * const response = {
 *   headers: {
 *     'content-disposition': 'attachment; filename="example-file.txt"'
 *   }
 * };
 * const filename = extractDownloadFilename(response);
 * console.log(filename); // 'example-file.txt'
 */
const extractDownloadFilename = (response) => {
  const disposition = response.headers['content-disposition']
  const fileName = decodeURI(disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, ''))

  return fileName
}

/**
 * 입력값이 `NaN`이거나 `null`일 경우 `0`을 반환하는 함수입니다.
 *
 * @description
 * 이 함수는 입력값이 `null`이거나 `NaN`인 경우 `0`을 반환합니다.
 * 그 외의 경우에는 입력값을 그대로 반환합니다.
 *
 * @param {number} value - 입력값으로 숫자 또는 `null`이 될 수 있습니다.
 *
 * @returns {number} 입력값이 `NaN` 또는 `null`이면 `0`을 반환하고, 그 외의 경우에는 입력값을 그대로 반환합니다.
 *
 * @example
 * inputIsNaNtoZero(5);  // 5
 * inputIsNaNtoZero(NaN); // 0
 * inputIsNaNtoZero(null); // 0
 */
const inputIsNaNtoZero = (value) => {
  return value == null || isNaN(value) ? 0 : value
}

/**
로컬 스토리지 저장
*/
const setLocalStorage = (key, value) => {
  localStorage.setItem('liveapp:'.concat(key), value)
}

/**
로컬 스토리지
*/
const getLocalStorage = (key) => {
  return localStorage.getItem('liveapp:'.concat(key))
}

/**
로컬 스토리지 삭제
*/
const removeLocalStorage = (key) => {
  localStorage.removeItem('liveapp:'.concat(key))
}

/**
로컬 스토리지 값 비교 equal
*/
const eqLocalStorage = (key, value) => {
  let is = false
  const has = localStorage.getItem('liveapp:'.concat(key))
  if (isEmpty(has)) {
    is = false
  } else {
    if (is === value) {
      is = true
    } else {
      is = false
    }
  }
  return is
}

/**
세션 스토리지 저장
*/
const setSessionStorage = (key, value) => {
  sessionStorage.setItem('liveapp:'.concat(key), value)
}

/**
세션 스토리지
*/
const getSessionStorage = (key) => {
  return sessionStorage.getItem('liveapp:'.concat(key))
}

/**
세션 스토리지 삭제
*/
const removeSessionStorage = (key) => {
  sessionStorage.removeItem('liveapp:'.concat(key))
}

/**
세션 스토리지 값 비교 equal
*/
const eqSessionStorage = (key, value) => {
  let is = false
  const has = sessionStorage.getItem('liveapp:'.concat(key))
  if (isEmpty(has)) {
    is = false
  } else {
    if (is === value) {
      is = true
    } else {
      is = false
    }
  }
  return is
}

export default {
  findItemIfEmpty,
  cloneData,
  buildTree,
  findItem,
  removeObjectInArray,
  findItems,
  extractValueByProp,
  flatNestedArrayNodeDataForExtractTargetValue,
  findItemWidthParents,
  findItemFromTree,
  makeUserQuery,
  isEmpty,
  convertEmptyTo,
  comma,
  unComma,
  makeCommonCodeSelect,
  makeCommonCodeSelect2,
  makeCodeSelectDependingOnDatasCode,
  bindData,
  focusAndMessageWhenErrorFormInput,
  commonValidateThenSubmit,
  checkNewPassword,
  resolveXssValue,
  resolveXssForObject,
  prepareBeforeSubmit,
  updateCurrentElTableRowForTable,
  updateElTableRowForTable,
  updateDirectlyElTableRowForTable,
  updateElTreeNode,
  appendElTreeNode,
  getItemFromArray,
  findItemByKeywordInArray,
  convertArrayToSeparatedString,
  getStatusClassName,
  getEvaluationStatusClassName,
  getExceptedVulnRequestClassName,
  getSecReviewStatusClassName,
  getAssetRowClassName,
  getCveRowClassName,
  convertCommonCodeToName,
  convertCommonCodesToNames,
  formatBytes,
  deleteItemInArray,
  encryptAES,
  encryptAESWithIV,
  encryptAESV2,
  decryptAES,
  encryptAESStore,
  decryptAESStore,
  checkCurrentMenuUserPermit,
  convertArrayToString,
  convertArrayToString2,
  convertArrayToString3,
  getPolicyLevelClassName,
  preventInputKeyUp,
  getCommonNameBysetName,
  updateMyDataInArray,
  checkUserPermit,
  makeCommonCodeCheck,
  setCommonProgressBarStyle,
  escapeHtml,
  makeYearList,
  debounceWithStackData,
  replaceStrArrayToObjArray,
  replaceObjArrayToStrArray,
  diffDates,
  countComma,
  extractDownloadFilename,
  convertEmptyToOrElse,
  inputIsNaNtoZero,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  eqLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  eqSessionStorage
}

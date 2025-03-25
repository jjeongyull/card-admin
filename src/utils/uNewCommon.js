
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
    value = value.trim();
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


const buildTree = (items, parentKey, key, startMenuId, sortKey = "sort") =>
  items
    .filter(item => item[parentKey] === startMenuId) // 부모 ID가 startMenuId인 것만 필터링
    .sort((a, b) => a[sortKey] - b[sortKey]) // 정렬 적용
    .map(item => ({
      ...item,
      children: buildTree(item.children, parentKey, key, item[key], sortKey) // 자식 노드 재귀 호출
    }));


    /**
     *
     * @param {*} nodes 트리구조로 만들 최종데이터
     * @param {*} keyName : label데이터에 넣을 기존의 key값
     * @returns
     */
const addLabelRecursively = (nodes, keyName) => {
  return nodes.map(node => ({
    ...node,
    label: node[keyName], // 현재 노드에 label 추가
    children: node.children ? addLabelRecursively(node.children, keyName) : [] // 자식 노드도 재귀적으로 label 추가
  }));
};


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

export default {
  isEmpty,
  buildTree,
  addLabelRecursively,
  findItemWidthParents
}
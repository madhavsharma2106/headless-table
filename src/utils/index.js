const _currentYear = new Date().getFullYear();

export const SORTING_ORDERS = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
  NONE: "none",
};

export const sortingOrder = (order) => {
  const orderChangeSequence = {
    [SORTING_ORDERS.ASCENDING]: SORTING_ORDERS.DESCENDING,
    [SORTING_ORDERS.DESCENDING]: SORTING_ORDERS.NONE,
    [SORTING_ORDERS.NONE]: SORTING_ORDERS.ASCENDING,
  };

  return orderChangeSequence[order] || SORTING_ORDERS.ASCENDING;
};

export const ICONS = {
  [SORTING_ORDERS.ASCENDING]: " 🔼",
  [SORTING_ORDERS.DESCENDING]: " 🔽",
  [SORTING_ORDERS.NONE]: null,
};

export const sortArr = (arr, accessor, order) => {
  if (order === SORTING_ORDERS.NONE) return arr;

  let sortDsc = (a, b) => {
    if (a[accessor] < b[accessor]) return 1;
    if (a[accessor] > b[accessor]) return -1;
    return 0;
  };

  let sortAsc = (a, b) => {
    if (a[accessor] < b[accessor]) return -1;
    if (a[accessor] > b[accessor]) return 1;
    return 0;
  };

  return [...arr].sort(order === SORTING_ORDERS.ASCENDING ? sortAsc : sortDsc);
};

export const searchArr = (arr, accessor, query) => {
  return [...arr].filter((row) => {
    return row[accessor].toLowerCase().indexOf(query) > -1;
  });
};

export const getQueryParams = (name) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
};

export function _calculateAge(birthday) {
  const year = birthday.split("-")[0];
  return Math.abs(year - _currentYear);
}

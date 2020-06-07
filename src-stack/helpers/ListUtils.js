// Replace item in a list or adds item to end of list
function replaceOrAppend(arr = [], predicate, getItem) {
  const index = _.findIndex(arr, predicate);
  return index === -1
    ? [...arr, getItem()]
    : [...arr.slice(0, index), getItem(arr[index]), ...arr.slice(index + 1)];
}

// Replace item in a list or adds item to beginning of list
function replaceOrPrepend(arr = [], predicate, getItem) {
  const index = _.findIndex(arr, predicate);
  return index === -1
    ? [getItem(), ...arr]
    : [...arr.slice(0, index), getItem(arr[index]), ...arr.slice(index + 1)];
}

function makeComparator(key, order = "asc") {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const aVal = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const bVal = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;

    return order === "desc" ? comparison * -1 : comparison;
  };
}

export { replaceOrAppend, replaceOrPrepend, makeComparator };

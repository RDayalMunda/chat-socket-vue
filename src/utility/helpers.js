export function searchInArray(array, queryString, searchKey = "name") {
  if (!array) {
    return [];
  }
  if (!queryString) {
    return array;
  }
  const filteredArray = [];
  for (const user of array) {
    if (user[searchKey].toLowerCase().includes(queryString.toLowerCase())) {
      filteredArray.push(user);
    }
  }
  return filteredArray;
}

export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export function throttle(func, delay) {
  let isActive = false;
  return function (...args) {
    if (isActive) return;
    isActive = true;
    func.apply(this, args);
    setTimeout(() => {
      isActive = false;
    }, delay);
  };
}

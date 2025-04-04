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

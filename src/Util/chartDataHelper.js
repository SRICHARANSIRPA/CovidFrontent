export default function groupBy(list, column) {
  let newList = [];
  list.forEach((item) => {
    if (newList.find((x) => x.key == item[column])) {
      let obj = newList.find((x) => x.key == item[column]);
      let index = newList.indexOf(obj);
      newList[index].value.push(item);
    } else {
      let obj = { key: item[column], value: [] };
      obj.value.push(item);
      newList.push(obj);
    }
  });
  return newList;
}

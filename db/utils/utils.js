const formatDate = list => {
  //const javaScriptTime = new Date(list);
  //return javaScriptTime.toString();
  const newList = [...list];
  newList.forEach(item => {
    item["created_at"] = new Date(item["created_at"]);
    item["created_at"] = item["created_at"].toString();
  });
  console.log(newList);
  return newList;
};

const makeRefObj = list => {
  return list.length === 0
    ? {}
    : list.reduce((refs, row) => {
        refs[row["article_id"]] = row["title"];
        return refs;
      }, {});
};

const formatComments = (comments, articleRef) => {};

module.exports = { formatDate, makeRefObj, formatComments };

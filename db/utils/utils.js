const formatDate = list => {
  const newList = [...list];
  newList.forEach(item => {
    item["created_at"] = new Date(item["created_at"]);
    item["created_at"] = item["created_at"]; //.toString();
  });
  return newList;
};

const makeRefObj = list => {
  return list.length === 0
    ? {}
    : list.reduce((refs, row) => {
        refs[row["title"]] = row["article_id"];
        return refs;
      }, {});
};

const formatComments = (comments, articleRef) => {
  const newComments = [...comments];
  newComments.forEach(item => {
    item["author"] = item["created_by"];
    item["article_id"] = item["belongs_to"];
    delete item["created_by"];
    delete item["belongs_to"];
    item["article_id"] = articleRef[item["article_id"]];
  });
  console.log(newComments);
  return formatDate(newComments);
};

module.exports = { formatDate, makeRefObj, formatComments };

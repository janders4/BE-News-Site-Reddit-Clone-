const formatDate = list => {
  const newList = [];
  list.forEach((item, index) => {
    newList[index] = { ...item };
    newList[index].created_at = new Date(item.created_at);
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
  const newComments = [];
  comments.forEach((item, index) => {
    newComments[index] = { ...item };
    newComments[index].author = item["created_by"];
    newComments[index]["article_id"] = item["belongs_to"];
    delete newComments[index]["created_by"];
    delete newComments[index]["belongs_to"];
    newComments[index]["article_id"] = articleRef[item["article_id"]];
  });
  return formatDate(newComments);
};

module.exports = { formatDate, makeRefObj, formatComments };

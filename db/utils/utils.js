const formatDate = list => {
  const newList = [];
  list.forEach((item, index) => {
    newList[index] = { ...item };
    newList[index].created_at = new Date(item.created_at);
  });
  return newList;
};

const makeRefObj = list => {
  return list.reduce((refs, row) => {
    refs[row["title"]] = row["article_id"];
    return refs;
  }, {});
};

const formatComments = (comments, articleRef) => {
  const newComments = [];
  comments.forEach((item, index) => {
    const newObj = { ...item };
    newObj.author = item["created_by"];
    newObj.article_id = articleRef[item["belongs_to"]];
    delete newObj["belongs_to"];
    delete newObj["created_by"];
    newComments.push(newObj);
  });
  return newComments;
};

module.exports = { formatDate, makeRefObj, formatComments };

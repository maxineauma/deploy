import { getCommentsByTaskId, createComment, deleteCommentById } from "../api";

export const handle_createComment = async (e, id, userName, callback) => {
  let formData = e.target;
  e.preventDefault();

  await createComment({
    task: id,
    commenter: userName,
    comment: formData["comment"].value,
  }).then(() => callback());
};

export const handle_getComments = async (id, callback) => {
  await getCommentsByTaskId(id).then((res) => {
    callback(res);
  });
};

export const handle_deleteCommentById = async (id) => {
  await deleteCommentById(id);
};
import { QuerySimple, QueryCallback } from "./Database.js";

export const createComment = async (req, res) => {
  const { task, commenter, comment } = req.body;

  try {
    if (comment.length < 2) return await res.sendStatus(406);

    const createdComment = {
      task,
      commenter,
      comment,
      date:
        new Date(Date.now()).toLocaleTimeString("en-US") +
        " on " +
        new Date(Date.now()).toLocaleDateString("en-US"),
    };

    QuerySimple("INSERT INTO comment SET ?", createdComment);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const getCommentsByTaskId = async (req, res) => {
  const { task } = req.params;

  try {
    QueryCallback(
      "SELECT * FROM comment WHERE task = ? ORDER BY id DESC",
      task,
      async (result) => {
        return await res.status(200).json({ result });
      }
    );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const deleteCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    QuerySimple("DELETE FROM comment WHERE id = ?", id);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};
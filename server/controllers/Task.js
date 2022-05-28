import { QuerySimple, QueryCallback } from "./Database.js";

export const createTask = async (req, res) => {
  const { reporter, assignee, title, due, description } = req.body;

  try {
    if (title.length < 4) return await res.sendStatus(406);
    if (title.replace(/ /g, "") == "") return await res.sendStatus(406);

    const createdTask = {
      reporter,
      assignee,
      title,
      status: "requested",
      due,
      description,
    };

    QuerySimple("INSERT INTO task SET ?", createdTask);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    QueryCallback(
      "SELECT * FROM task USE INDEX (id) WHERE id = ? LIMIT 1",
      id,
      async (result) => {
        if (result.length == 0) return await res.sendStatus(404);
        else {
          return await res.status(200).json({ result });
        }
      }
    );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const getTasksByStatus = async (req, res) => {
  const { status, filter } = req.params;

  try {
    const params = [status, filter, filter, filter];

    if (filter)
      QueryCallback(
        "SELECT * FROM task WHERE status = ? AND (" +
          "title LIKE CONCAT('%',?,'%')" +
          "OR reporter LIKE CONCAT('%',?,'%')" +
          "OR assignee LIKE CONCAT('%',?,'%')" +
          `) ORDER BY due ASC`,
        params,
        async (result) => {
          return await res.status(200).json({ result });
        }
      );
    else
      QueryCallback(
        `SELECT * FROM task WHERE status = ? ORDER BY due ASC`,
        status,
        async (result) => {
          return await res.status(200).json({ result });
        }
      );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    const params = [newStatus, id];

    QuerySimple("UPDATE task SET status = ? WHERE id = ?", params);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const updateAssignee = async (req, res) => {
  const { id } = req.params;
  const { assignee } = req.body;

  try {
    const params = [assignee, id];

    QuerySimple("UPDATE task SET assignee = ? WHERE id = ?", params);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const updateTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    if (title.length < 4 || title.replace(/ /g, "") == "")
      return await res.sendStatus(406);
    const params = [title, id];

    QuerySimple("UPDATE TASK set title = ? WHERE id = ?", params);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const updateDescription = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const params = [description, id];

    QuerySimple("UPDATE TASK set description = ? WHERE id = ?", params);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const updateDue = async (req, res) => {
  const { id } = req.params;
  const { due } = req.body;

  try {
    const params = [due, id];

    QuerySimple("UPDATE TASK set due = ? WHERE id = ?", params);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const deleteTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    QuerySimple("DELETE FROM task WHERE id = ?", id);
    QuerySimple("DELETE FROM comment WHERE task = ?", id);
    return await res.sendStatus(200);
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};
import {
  createTask,
  getTaskById,
  deleteTaskById,
  getTasksByStatus,
  updateTaskStatus,
  updateAssignee,
  updateTitle,
  updateDescription,
  updateDue,
} from "../api";

export const handle_createTask = async (e, userName, callback) => {
  let formData = e.target;
  e.preventDefault();

  await createTask({
    reporter: userName,
    assignee: formData["assignee"].value,
    title: formData["title"].value,
    due: new Date(formData["due"].value).getTime() + 1000 * 60 * 60 * 24,
    description: formData["description"].value,
  })
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      callback(err);
    });
};

export const handle_getTasksByStatus = async (status, filter, callback) => {
  await getTasksByStatus(status, filter).then((res) => {
    switch (status) {
      default:
      case "requested":
        callback(res);
        break;

      case "in progress":
        callback(res);
        break;

      case "completed":
        callback(res);
        break;
    }
  });
};

export const handle_getTaskById = async (id, callback) => {
  await getTaskById(id).then((res) => {
    callback(res);
  });
};

export const handle_updateTaskStatus = async (e, id) => {
  let formData = e.target;
  e.preventDefault();

  await updateTaskStatus(id, {
    newStatus: formData.value,
  }).then(() => window.location.reload());
};

export const handle_updateAssignee = async (assignee, id) => {
  await updateAssignee(id, { assignee }).then(() => window.location.reload());
};

export const handle_updateTitle = async (title, id, callback) => {
  await updateTitle(id, { title })
    .then(() => window.location.reload())
    .catch((err) => callback(err));
};

export const handle_updateDescription = async (description, id, callback) => {
  await updateDescription(id, { description }).then(() => callback());
};

export const handle_updateDue = async (due, id) => {
  let timestamp = new Date(due).getTime() + 1000 * 60 * 60 * 24;
  await updateDue(id, { due: timestamp }).then(() => {
    window.location.reload();
  });
};

export const handle_deleteTaskById = async (id) => {
  await deleteTaskById(id).then(() => {
    window.location.reload();
  });
};
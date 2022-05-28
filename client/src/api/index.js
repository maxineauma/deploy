import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

/* USER FUNCTIONS */

export const login = async (formData) => API.post(`/user/login`, formData);
export const signup = async (formData) => API.post(`/user/signup`, formData);

export const getUsernameByToken = async (token) => API.get(`/user/${token}`);
export const getAllUsers = async () => API.get(`/user`);

/* TASK FUNCTIONS */

export const createTask = async (formData) => API.post(`/task/new`, formData);
export const getTaskById = async (id) => API.get(`/task/${id}`);
export const getTasksByStatus = async (status, filter) => API.get(`/task/status/${status}/${filter}`);

export const updateTaskStatus = async (id, formData) => API.patch(`/task/update/status/${id}`, formData);
export const updateAssignee = async (id, formData) => API.patch(`/task/update/assignee/${id}`, formData);
export const updateTitle = async (id, formData) => API.patch(`/task/update/title/${id}`, formData);
export const updateDescription = async (id, formData) => API.patch(`/task/update/desc/${id}`, formData);
export const updateDue = async (id, formData) => API.patch(`/task/update/due/${id}`, formData);

export const deleteTaskById = async (id) => API.delete(`/task/delete/${id}`);

/* COMMENT FUNCTIONS */

export const createComment = async (formData) => API.post(`/comment/new`, formData);
export const getCommentsByTaskId = async (id) => API.get(`/comment/${id}`);

export const deleteCommentById = async (id) => API.delete(`/comment/delete/${id}`);
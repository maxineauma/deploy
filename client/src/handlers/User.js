import { getUsernameByToken, login, signup, getAllUsers } from "../api";

export const handle_getUsername = async (token, callback) => {
  await getUsernameByToken(token).then((res) => {
    callback(res);
  });
};

export const handle_login = async (e, callback, callback_err) => {
  let formData = e.target;
  e.preventDefault();

  await login({
    email: formData["email"].value,
    pass: formData["pass"].value,
  })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      callback(res);
      window.location.reload();
    })
    .catch((err) => {
      callback_err(err);
    });
};

export const handle_signup = async (e, callback, callback_err) => {
  let formData = e.target;
  e.preventDefault();

  await signup({
    email: formData["email"].value,
    first: formData["first"].value,
    last: formData["last"].value,
    pass: formData["pass"].value,
    pass_confirm: formData["pass_confirm"].value,
  })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback_err(err);
    });
};

export const handle_getAllUsers = async (callback) => {
  await getAllUsers().then((res) => {
    callback(res);
  });
};
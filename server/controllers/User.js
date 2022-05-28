import bcrypt from "bcryptjs";
import { QuerySimple, QueryCallback } from "./Database.js";

const isStrongPass = (pass) => {
  // Must be at least 8 characters
  if (pass.length < 8) return false;

  // With at least one number and one special character from the following list: ( ) ! @ $ & ^ ? /
  const pass_regex = /(?=.*[()!@$&^?\/])(?=.*[0-9])/g;
  if (pass.match(pass_regex) == null) return false;

  return true;
};

const isValidEmail = (email) => {
  // Mega large regular expression
  const email_regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email.match(email_regex) == null) return false;

  return true;
};

const constructUnique = (email) => {
  var part1 = Math.floor(Date.now() / 1000).toString(16);
  var part2 = "";
  for (let x = 0; x < 4; x++) part2 += email.charCodeAt(x).toString(16);

  return part1 + part2;
};

export const createUser = async (req, res) => {
  const { email, first, last, pass, pass_confirm } = req.body;

  try {
    if (first.length < 1 || last.length < 1) return await res.sendStatus(406);
    if (first.replace(/ /g, "") == "" || last.replace(/ /g, "") == "")
      return await res.sendStatus(406);
    if (!isStrongPass(pass)) return await res.sendStatus(406);
    if (pass !== pass_confirm) return await res.sendStatus(406);
    if (!isValidEmail(email)) return await res.sendStatus(406);

    QueryCallback(
      "SELECT * FROM user WHERE email = ? LIMIT 1",
      email,
      async (result) => {
        if (result.length > 0) return await res.sendStatus(406);
        else {
          const hashed_pass = await bcrypt.hash(pass, 10);

          const createdUser = {
            uniqueID: constructUnique(email),
            email,
            first,
            last,
            pass: hashed_pass,
          };

          QuerySimple("INSERT INTO user SET ?", createdUser);
          return await res.sendStatus(200);
        }
      }
    );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const getUser = async (req, res) => {
  const { email, pass } = req.body;

  try {
    QueryCallback(
      "SELECT * FROM user WHERE email = ? LIMIT 1",
      email,
      async (result) => {
        if (result.length == 0) return await res.sendStatus(404);
        else {
          const pass_correct = await bcrypt.compare(pass, result[0].pass);
          if (!pass_correct) return await res.sendStatus(406);

          return await res.status(200).json({ token: result[0].uniqueID });
        }
      }
    );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const findUsernameByToken = async (req, res) => {
  const { token } = req.params;

  try {
    QueryCallback(
      "SELECT * FROM user USE INDEX (email) WHERE uniqueID = ? LIMIT 1",
      token,
      async (result) => {
        if (result.length == 0) return await res.sendStatus(404);
        else {
          return await res
            .status(200)
            .json({ first: result[0].first, last: result[0].last });
        }
      }
    );
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    QueryCallback("SELECT first, last, email FROM user", [], async (result) => {
      if (result.length == 0) return await res.sendStatus(404);
      else {
        return await res.status(200).json({ result });
      }
    });
  } catch (e) {
    return await res.sendStatus(400);
    console.log(e);
  }
};
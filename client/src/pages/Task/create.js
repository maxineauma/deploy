import React, { useState, useEffect } from "react";
import { handle_getAllUsers } from "../../handlers/User";
import { constructToday } from "../../utils";

function TaskCreate() {
  const [userList, setUsers] = useState({});

  const [titleLength, setTitleLength] = useState(0);
  const [descLength, setDescLength] = useState(0);

  const [dueDate, setDueDate] = useState(constructToday());

  useEffect(() => {
    handle_getAllUsers(async (res) => setUsers(res.data.result));
  }, []);

  return (
    <>
      <span className="text-2xl text-n600 mb-8">Create task</span>

      <span className="text-sm text-n80">Short Summary</span>
      <input
        onChange={(e) => setTitleLength(e.target.value.length)}
        name="title"
        maxLength="36"
        className="rounded-md h-max w-full focus:outline-none p-4 mb-2 text-n80 bg-n30 hover:bg-n40"
        type="text"
      />
      <span className="text-xs text-n200 mb-8">
        Concisely summarize the task. ({titleLength}/36)
      </span>

      <span className="text-sm text-n80">Due Date</span>
      <input
        name="due"
        defaultValue={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={constructToday()}
        className="rounded-md h-max w-full focus:outline-none p-4 mb-2 text-n80 bg-n30 hover:bg-n40"
        type="date"
      />
      <span className="text-xs text-n200 mb-8">
        Provide a due date for this task. Must be later than{" "}
        {new Date(constructToday()).toDateString()}.
      </span>

      <span className="text-sm text-n80">Assignee</span>
      <select
        name="assignee"
        className="rounded-md h-max w-full focus:outline-none p-4 mb-2 bg-n30 text-n80 hover:bg-n40"
      >
        <option selected value="Unassigned">
          Unassigned
        </option>
        {Object.keys(userList).map((k) => {
          return (
            <option value={userList[k].first + " " + userList[k].last}>
              {userList[k].first +
                " " +
                userList[k].last +
                " (" +
                userList[k].email +
                ")"}
            </option>
          );
        })}
      </select>
      <span className="text-xs text-n200 mb-8">
        Provide an assignee for this task.
      </span>

      <span className="text-sm w-6/12 text-n80">Description</span>
      <textarea
        onChange={(e) => setDescLength(e.target.value.length)}
        name="description"
        maxLength="750"
        rows="6"
        className="rounded-md h-max w-full focus:outline-none p-4 mb-2 bg-n30 text-n80 hover:bg-n40"
      ></textarea>
      <span className="text-xs text-n200 mb-8">
        Describe the task in as much detail as needed,{" "}
        <a
          href="https://github.github.com/gfm/"
          className="text-b100 underline"
        >
          Github Flavored Markdown
        </a>{" "}
        accepted. ({descLength}/750)
      </span>
    </>
  );
}

export default TaskCreate;
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { handle_getUsername } from "../../handlers/User";

import {
  handle_getTaskById,
  handle_updateTaskStatus,
  handle_updateAssignee,
  handle_updateTitle,
  handle_updateDescription,
  handle_updateDue,
} from "../../handlers/Task";

import {
  handle_createComment,
  handle_getComments,
  handle_deleteCommentById,
} from "../../handlers/Comment";

import Avatar from "boring-avatars";

import { everyButOne, constructToday, statusColor } from "../../utils";

import { TrashX } from "tabler-icons-react";

function TaskView(props) {
  const [formRes, setFormRes] = useState(0);

  const [task, setTask] = useState({});
  const [comments, update_comments] = useState({});

  const [userName, setUsername] = useState("");
  const [commentForm, setCommentForm] = useState("");

  const [editTitle, toggleEditTitle] = useState(false);
  const [editDesc, toggleEditDesc] = useState(false);
  const [editDue, toggleEditDue] = useState(false);

  useEffect(() => {
    handle_getComments(props.id, async (res) =>
      update_comments(res.data.result)
    );
  });

  useEffect(() => {
    handle_getTaskById(props.id, async (res) => setTask(res.data.result[0]));
    handle_getUsername(props.token, async (res) =>
      setUsername(res.data.first + " " + res.data.last)
    );
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-1 mb-6">
        {formRes === 406 || formRes === 400 ? (
          <span className="rounded-md h-max w-full bg-r300 p-4 mb-8 text-n30 text-xs">
            Error updating task. Title should be at least 4 characters.
          </span>
        ) : (
          ""
        )}
        <span className="text-sm md:text-lg text-n900 uppercase">
          <span>TASK-{props.id}</span>{" "}
          <span
            onClick={() => toggleEditTitle(!editTitle)}
            className="text-xs text-n80 ml-2 hover:underline hover:cursor-pointer normal-case"
          >
            [ Edit ]
          </span>
        </span>

        <span className="text-md md:text-xl text-n900 uppercase break-all">
          {editTitle ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handle_updateTitle(
                  e.target["title"].value,
                  props.id,
                  async (err) => setFormRes(err.response.status)
                );
              }}
            >
              <input
                name="title"
                maxLength="36"
                className="rounded-md h-max w-full md:w-10/12 focus:outline-none p-4 text-n80 text-sm bg-n30 hover:bg-n40"
                defaultValue={task.title}
                type="text"
              />
              <button type="submit" className="mt-2 md:hidden">
                Submit
              </button>
            </form>
          ) : (
            task.title || "..."
          )}
        </span>
      </div>

      <div className="w-full grid grid-cols-2 mb-12">
        <span className="text-sm md:text-lg text-n900 uppercase">Status</span>
        <span className="text-sm md:text-lg text-n900 uppercase">
          Due Date{" "}
          <span
            onClick={() => toggleEditDue(!editDue)}
            className="text-xs text-n80 ml-2 hover:underline hover:cursor-pointer normal-case"
          >
            [ Edit ]
          </span>
        </span>

        <form onChange={(e) => handle_updateTaskStatus(e, props.id)}>
          <select
            name="status"
            className="text-md md:text-xl text-n900 underline uppercase w-10/12 md:w-6/12 focus:outline-none"
            style={{ textDecorationColor: statusColor(task.status) }}
          >
            <option selected value={task.status}>
              {task.status}
            </option>
            {everyButOne(
              ["requested", "completed", "in progress"],
              task.status
            ).map((k) => {
              return <option value={k}>{k}</option>;
            })}
          </select>
        </form>

        <span className="text-md md:text-xl text-n900 uppercase break-all">
          {editDue ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handle_updateDue(e.target["due"].value, props.id);
              }}
            >
              <input
                name="due"
                min={constructToday()}
                defaultValue={constructToday()}
                className="rounded-md h-max w-full md:w-10/12 focus:outline-none p-4 text-n80 text-sm bg-n30 hover:bg-n40"
                type="date"
              />
              <button type="submit" className="mt-2 md:hidden">
                Submit
              </button>
            </form>
          ) : (
            new Date(task.due).toDateString() || "..."
          )}
        </span>
      </div>

      <div className="w-full grid grid-cols-4 mb-12">
        <span className="col-span-2 text-sm md:text-lg text-n900 uppercase">
          Description{" "}
          <span
            onClick={() => toggleEditDesc(!editDesc)}
            className="text-xs text-n80 ml-2 hover:underline hover:cursor-pointer normal-case"
          >
            [ Edit ]
          </span>
        </span>
        <span className="hidden md:flex col-span-1 text-sm md:text-lg text-n900 uppercase">
          Reporter
        </span>
        <span className="hidden md:flex col-span-1 text-sm md:text-lg text-n900 uppercase">
          Assignee
        </span>

        <span className="col-span-4 md:col-span-2 p-2 text-xs md:text-sm text-n400 w-full md:w-10/12 break-words mb-8 md:m-0">
          {editDesc ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handle_updateDescription(
                  e.target["description"].value,
                  props.id,
                  async () => {
                    handle_getTaskById(props.id, async (res) =>
                      setTask(res.data.result[0])
                    );
                    toggleEditDesc(!editDesc);
                  }
                );
              }}
            >
              <textarea
                name="description"
                maxLength="750"
                rows="10"
                className="rounded-md h-max w-full focus:outline-none p-4 bg-n30 text-n80 text-sm hover:bg-n40"
              >
                {task.description}
              </textarea>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {task.description || "..."}
            </ReactMarkdown>
          )}
        </span>

        <span className="md:hidden col-span-2 text-sm md:text-lg text-n900 uppercase">
          Reporter
        </span>
        <span className="md:hidden col-span-2 text-sm md:text-lg text-n900 uppercase">
          Assignee
        </span>

        <span className="col-span-2 md:col-span-1 p-4">
          <div>
            <Avatar
              name={task.reporter || "Unknown"}
              variant="beam"
              colors={["#368986", "#E79A32", "#F84339", "#D40F60", "#005C81"]}
            />
          </div>
        </span>

        <span className="col-span-2 md:col-span-1 p-4">
          {task.assignee === "Unassigned" ? (
            <span
              className="hover:cursor-pointer text-b100 underline"
              onClick={() => handle_updateAssignee(userName, props.id)}
            >
              Assign yourself
            </span>
          ) : (
            <div className="flex">
              <div>
                <Avatar
                  name={task.assignee || "Unknown"}
                  variant="beam"
                  colors={[
                    "#368986",
                    "#E79A32",
                    "#F84339",
                    "#D40F60",
                    "#005C81",
                  ]}
                />
              </div>
              <span
                className="hover:cursor-pointer mt-2 ml-2"
                title="Unassign"
                onClick={() => handle_updateAssignee("Unassigned", props.id)}
              >
                {task.assignee === userName ? <TrashX /> : ""}
              </span>
            </div>
          )}
        </span>
      </div>

      <div className="w-full grid grid-cols-2">
        <span className="col-span-2 text-lg text-n900 uppercase">Comments</span>
        <span className="col-span-2 text-xs text-n900 mb-8">
          <a
            href="https://github.github.com/gfm/"
            className="text-b100 underline"
          >
            Github Flavored Markdown
          </a>{" "}
          accepted.
        </span>

        <div className="col-span-2 flex mb-4">
          <div>
            <Avatar
              name={userName || "..."}
              variant="beam"
              colors={["#368986", "#E79A32", "#F84339", "#D40F60", "#005C81"]}
            />
          </div>
          <form
            onSubmit={(e) => {
              handle_createComment(e, props.id, userName, async () =>
                setCommentForm("")
              );
            }}
            className="w-9/12 md:w-6/12"
          >
            <input
              name="comment"
              maxLength="128"
              type="text"
              value={commentForm}
              onChange={(e) => setCommentForm(e.target.value)}
              className="rounded-md h-max w-full focus:outline-none p-4 ml-4 mb-2 text-n80 text-sm bg-n30 hover:bg-n40"
              placeholder="Add a comment..."
            />
            <button type="submit" className="ml-4 mb-4 md:hidden">
              Submit
            </button>
          </form>
        </div>

        {Object.keys(comments).map((k) => {
          return (
            <div className="col-span-2 flex mb-4 rounded-md p-4 bg-n20 w-full md:w-10/12">
              <div>
                <Avatar
                  name={comments[k].commenter || "..."}
                  variant="beam"
                  colors={[
                    "#368986",
                    "#E79A32",
                    "#F84339",
                    "#D40F60",
                    "#005C81",
                  ]}
                />
              </div>
              <span className="grid grid-cols-2">
                <span className="col-span-2 text-sm text-n600 ml-4">
                  {comments[k].commenter}
                </span>
                <span className="col-span-2 text-sm text-n400 p-2 ml-4 break-words">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comments[k].comment}
                  </ReactMarkdown>
                </span>
                <span className="col-span-2 text-xs text-n80 p-2 ml-4">
                  {comments[k].date}
                </span>
                <span
                  onClick={() => handle_deleteCommentById(comments[k].id)}
                  className="col-span-2 text-xs text-n80 mt-2 ml-4 hover:underline hover:cursor-pointer"
                >
                  {comments[k].commenter === userName
                    ? "[ Delete Comment ]"
                    : ""}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TaskView;
import React, { useEffect, useState } from "react";

import {
  handle_getTasksByStatus,
  handle_deleteTaskById,
} from "../../handlers/Task";

import TaskView from "../Task/view";

import Avatar from "boring-avatars";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import { TrashX, X } from "tabler-icons-react";

function Dashboard(props) {
  const [task_view_visible, toggle_task_view] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const [requested_tasks, update_requested_tasks] = useState({});
  const [inprogress_tasks, update_inprogress_tasks] = useState({});
  const [completed_tasks, update_completed_tasks] = useState({});

  /* ONLY ON INITIAL RENDER */
  useEffect(() => {
    handle_getTasksByStatus("requested", "", async (res) =>
      update_requested_tasks(res.data.result)
    );
    handle_getTasksByStatus("in progress", "", async (res) =>
      update_inprogress_tasks(res.data.result)
    );
    handle_getTasksByStatus("completed", "", async (res) =>
      update_completed_tasks(res.data.result)
    );
  }, []);

  /* EVERY OTHER RENDER */
  async function updateTasks(filter) {
    handle_getTasksByStatus("requested", filter, async (res) =>
      update_requested_tasks(res.data.result)
    );
    handle_getTasksByStatus("in progress", filter, async (res) =>
      update_inprogress_tasks(res.data.result)
    );
    handle_getTasksByStatus("completed", filter, async (res) =>
      update_completed_tasks(res.data.result)
    );
  }

  return (
    <>
      <div className="flex items-center justify-start mb-16">
        <input
          onChange={(e) => updateTasks(e.target.value)}
          className="rounded-md h-max w-full md:w-6/12 focus:outline-none p-4 text-n80 bg-n30 hover:bg-40"
          type="text"
          placeholder="Filter tasks ..."
        />
      </div>

      {task_view_visible ? (
        <ModalTransition>
          <Modal width={"x-large"} shouldScrollInViewport={true}>
            <ModalHeader>
              <ModalTitle></ModalTitle>
            </ModalHeader>

            <ModalBody>
              <TaskView id={taskId} token={props.token} />
            </ModalBody>

            <ModalFooter>
              <button
                className="rounded-md bg-n30 hover:bg-n40 p-3 w-full md:w-2/12 text-n600"
                onClick={() => toggle_task_view(false)}
              >
                Close Window
              </button>
              <button
                className="rounded-md bg-r100 hover:bg-r200 p-3 text-n0"
                onClick={() => handle_deleteTaskById(taskId)}
              >
                <TrashX />
              </button>
            </ModalFooter>
          </Modal>
        </ModalTransition>
      ) : (
        ""
      )}

      {inprogress_tasks.length > 0 ? (
        <div className="flex items-center justify-center w-full grid grid-cols-1 md:grid-cols-4 mb-12">
          <div className="flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n0 rounded-t-3xl bg-y100">
            In Progress
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Reporter
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Assignee
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Due Date
          </div>
          {Object.keys(inprogress_tasks).map((k) => {
            return (
              <div
                className="flex items-center justify-center bg-n20 hover:bg-n40 hover:cursor-pointer h-full w-full col-span-4"
                onClick={() => {
                  toggle_task_view(true);
                  setTaskId(inprogress_tasks[k].id);
                }}
              >
                <span className="flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs break-all">
                  {inprogress_tasks[k].title}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  <div>
                    <Avatar
                      name={inprogress_tasks[k].reporter}
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
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  {inprogress_tasks[k].assignee === "Unassigned" ? (
                    <X />
                  ) : (
                    <div>
                      <Avatar
                        name={inprogress_tasks[k].assignee}
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
                  )}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs break-all">
                  <span className="text-n800 w-6/12 rounded-lg p-2">
                    {new Date(inprogress_tasks[k].due).toDateString()}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {requested_tasks.length > 0 ? (
        <div className="flex items-center justify-center w-full grid grid-cols-1 md:grid-cols-4 mb-12">
          <div className="flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n0 rounded-t-3xl bg-p100">
            Requested
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Reporter
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Assignee
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Due Date
          </div>
          {Object.keys(requested_tasks).map((k) => {
            return (
              <div
                className="flex items-center justify-center bg-n20 hover:bg-n40 hover:cursor-pointer h-full w-full col-span-4"
                onClick={() => {
                  toggle_task_view(true);
                  setTaskId(requested_tasks[k].id);
                }}
              >
                <span className="flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs break-all">
                  {requested_tasks[k].title}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  <div>
                    <Avatar
                      name={requested_tasks[k].reporter}
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
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  {requested_tasks[k].assignee === "Unassigned" ? (
                    <X />
                  ) : (
                    <div>
                      <Avatar
                        name={requested_tasks[k].assignee}
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
                  )}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs break-all">
                  <span className="text-n800 w-6/12 rounded-lg p-2">
                    {new Date(requested_tasks[k].due).toDateString()}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {completed_tasks.length > 0 ? (
        <div className="flex items-center justify-center w-full grid grid-cols-1 md:grid-cols-4 mb-12">
          <div className="flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n0 rounded-t-3xl bg-t100">
            Completed
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Reporter
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Assignee
          </div>
          <div className="hidden md:flex items-center justify-center h-8 w-full text-center p-4 font-bold uppercase text-sm text-n900">
            Due Date
          </div>
          {Object.keys(completed_tasks).map((k) => {
            return (
              <div
                className="flex items-center justify-center bg-n20 hover:bg-n40 hover:cursor-pointer h-full w-full col-span-4"
                onClick={() => {
                  toggle_task_view(true);
                  setTaskId(completed_tasks[k].id);
                }}
              >
                <span className="flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs line-through break-all">
                  {completed_tasks[k].title}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  <div>
                    <Avatar
                      name={completed_tasks[k].reporter}
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
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full place-content-center p-4">
                  {completed_tasks[k].assignee === "Unassigned" ? (
                    <X />
                  ) : (
                    <div>
                      <Avatar
                        name={completed_tasks[k].assignee}
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
                  )}
                </span>
                <span className="hidden md:flex flex-row items-center justify-center h-full w-full text-center p-4 text-n800 font-bold uppercase text-xs break-all">
                  <span className="text-n800 w-6/12 rounded-lg p-2">
                    {new Date(completed_tasks[k].due).toDateString()}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;

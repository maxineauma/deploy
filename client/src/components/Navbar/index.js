import React, { useState, useEffect } from "react";

import { handle_getUsername } from "../../handlers/User";
import { handle_createTask } from "../../handlers/Task";

import TaskCreate from "../../pages/Task/create";

import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import { LayoutList, AddressBook, Plus } from "tabler-icons-react";

function Navbar(props) {
  const [formRes, setFormRes] = useState(0);
  const [task_create_visible, toggle_task_create] = useState(false);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    handle_getUsername(props.token, async (res) =>
      setUsername(res.data.first + " " + res.data.last)
    );
  }, []);

  return (
    <>
      {task_create_visible ? (
        <ModalTransition>
          <Modal width={"large"} shouldScrollInViewport={true}>
            <ModalHeader>
              <ModalTitle></ModalTitle>
            </ModalHeader>

            <form
              onSubmit={(e) =>
                handle_createTask(e, userName, async (err) =>
                  setFormRes(err.response.status)
                )
              }
            >
              <ModalBody>
                <div className="grid grid-cols-1 w-full mb-6">
                  {formRes === 406 || formRes === 400 ? (
                    <span className="rounded-md h-max w-full bg-r300 p-4 mb-8 text-n30 text-xs">
                      Error creating task. Your summary should contain at least
                      4 characters.
                    </span>
                  ) : (
                    ""
                  )}
                  <TaskCreate />
                </div>
              </ModalBody>

              <ModalFooter>
                <button
                  type="submit"
                  className="rounded-md bg-b100 hover:bg-b200 p-3 w-full md:w-2/12 text-n0"
                >
                  Create
                </button>
                <button
                  className="rounded-md bg-n30 hover:bg-n40 p-3 w-full md:w-2/12 text-n600"
                  onClick={() => {
                    toggle_task_create(false);
                    setFormRes(0);
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </form>
          </Modal>
        </ModalTransition>
      ) : (
        ""
      )}

      <nav className="flex flex-row md:flex-col items-center justify-center bg-n30 w-screen h-20 md:h-screen md:w-20 md:float-left">
        <ul className="flex flex-row md:flex-col items-center justify-center list-none md:space-y-8">
          <li
            title="Dashboard"
            className="flex h-12 w-12 rounded-full hover:bg-n10 mr-8 md:mr-0"
          >
            <a href="/">
              <LayoutList
                className="p-2"
                size={48}
                color={"gray"}
                strokeWidth={1}
              />
            </a>
          </li>

          <li
            title="Contributors"
            className="flex h-12 w-12 rounded-full hover:bg-n10 mr-8 md:mr-0"
          >
            <a href="/members">
              <AddressBook
                className="p-2"
                size={48}
                color={"gray"}
                strokeWidth={1}
              />
            </a>
          </li>

          <li
            title="Create Task"
            className="flex h-12 w-12 rounded-full hover:bg-n10"
          >
            <span
              onClick={() => toggle_task_create(true)}
              className="hover:cursor-pointer"
            >
              <Plus className="p-2" size={48} color={"gray"} strokeWidth={1} />
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
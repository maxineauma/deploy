import React, { useState, useEffect } from "react";

import { handle_getUsername } from "../../handlers/User";

import Avatar from "boring-avatars";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import { AlertCircle } from "tabler-icons-react";

function Header(props) {
  const [docsVisible, toggleDocs] = useState(false);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    handle_getUsername(props.token, async (res) =>
      setUsername(res.data.first + " " + res.data.last)
    );
  }, []);

  return (
    <>
      {docsVisible ? (
        <ModalTransition>
          <Modal width={"x-large"} shouldScrollInViewport={true}>
            <ModalHeader>
              <ModalTitle>Design Decisions & FAQ</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <ul>
                <li className="font-bold">What is Kanban?</li>
                <li className="m-4">
                  Kanban, Japanese for signboard, is a lean method productivity
                  system built on optimization and delivering results
                  just-in-time. It is adapted from the lean method of
                  manufacturing developed at Toyota, called "The Toyota Way",
                  and it eliminates bottlenecks in production by allocating
                  resources as they are needed. Similarly, kanban seeks to
                  reduce bottlenecks in productivity by allowing members of a
                  board to allocate themselves or other members to a task as
                  needed.
                </li>

                <li className="font-bold">
                  Why can't I assign multiple users to a task?
                </li>
                <li className="m-4">
                  This design decision is not one that sprouted from laziness,
                  as this is an often requested feature for kanban boards
                  generally. The decision to only allow one user to be assigned
                  per task is based on Apple's principle of the{" "}
                  <a
                    href="https://about.gitlab.com/handbook/people-group/directly-responsible-individuals/"
                    className="text-b100 underline"
                  >
                    Directly Responsible Individual (DRI)
                  </a>
                  . The idea is rooted in greater accountability for the
                  completion of a task, as they are the individual responsible
                  for finding the resources necessary to complete the task.
                  Otherwise, when multiple people may be assigned to a task, it
                  is unclear who claims responsibility for the completion of the
                  task, which ultimately harms productivity.
                </li>

                <li className="font-bold">
                  Why don't tasks have an order or priority?
                </li>
                <li className="m-4">
                  According to the{" "}
                  <a
                    href="https://djaa.com/ban-priority-and-prioritization/"
                    className="text-b100 underline"
                  >
                    David J. Anderson School of Management
                  </a>
                  , it is essential to banish the terms "priority" and
                  "prioritization" from Kanban as it obfuscates real information
                  regarding when the task should be completed and what the
                  impact of non-completion is. This information is better left
                  communicated by the team rather than simply displayed with
                  "high" or "low" priority, which are useless terms given their
                  subjectivity as well. "Low" priority can mean 7 or 30 or
                  100,000 days, depending on the scope of the task or the person
                  asked. By removing the subjectivity of a task's urgency, this
                  also reduces the need to come to an agreement about what the
                  terms "high" or "low" priority mean. It is better left as a
                  dynamic concept, one that is determined by a member or team's
                  action on the task.
                </li>

                <li className="font-bold">How can I make my own board?</li>
                <li className="m-4">
                  This information will be available on GitHub, when the code is
                  ready to be published.
                </li>

                <li className="font-bold">Who can see my board?</li>
                <li className="m-4">
                  Only registered members on the board provided at the web URL
                  hosting the board may see your task board. If they are not
                  logged in, they are automatically directed to do so.
                </li>
              </ul>
            </ModalBody>

            <ModalFooter>
              <button
                className="rounded-md bg-n30 hover:bg-n40 p-3 w-full text-n600"
                onClick={() => toggleDocs(false)}
              >
                Close Window
              </button>
            </ModalFooter>
          </Modal>
        </ModalTransition>
      ) : (
        ""
      )}

      <div className="grid grid-cols-6 w-screen h-16 mb-8 grid-rows-1">
        <div className="col-span-6 md:col-span-3 flex items-center justify-start">
          <div>
            <Avatar
              name={userName}
              variant="beam"
              colors={["#368986", "#E79A32", "#F84339", "#D40F60", "#005C81"]}
            />
          </div>
          <span className="ml-3">
            Hello, {userName}!{" "}
            <a href="/logout" className="underline decoration-b100 ml-1">
              Logout
            </a>
            ?
          </span>
        </div>

        <div className="hidden md:flex col-span-3 flex items-center justify-center">
          {process.env.REACT_APP_BOARD_NAME}{" "}
          <span
            className="ml-1 mb-1 text-r100 hover:cursor-pointer"
            onClick={() => toggleDocs(true)}
          >
            <AlertCircle size={24} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;

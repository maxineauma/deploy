import React, { useEffect, useState } from "react";

import { handle_getAllUsers } from "../../handlers/User";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

import Login from "../../pages/Login";

import Avatar from "boring-avatars";

function Members() {
  const token = localStorage.getItem("token");

  const [userList, setUsers] = useState({});

  /* ONLY ON INITIAL RENDER */
  useEffect(() => {
    handle_getAllUsers(async (res) => setUsers(res.data.result));
  }, []);

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <Navbar token={token} />
          <div className="flex flex-col p-16 h-screen w-auto overflow-x-hidden overflow-y-auto">
            <Header token={token} />

            <span className="text-2xl text-n600 mb-8">Board Members</span>

            <table>
              <tbody>
                <tr className="bg-n30">
                  <td className="p-6 text-sm text-n600">Name</td>
                  <td className="p-6 text-sm text-n600 hidden md:table-cell">
                    Avatar
                  </td>
                  <td className="p-6 text-sm text-n600 hidden md:table-cell">
                    Email Address
                  </td>
                </tr>

                {Object.keys(userList).map((k) => {
                  return (
                    <tr className="even:bg-n20 odd:bg-n30">
                      <td className="p-6 text-n600">
                        {userList[k].first + " " + userList[k].last}
                      </td>
                      <td className="p-6 text-n600 hidden md:table-cell">
                        <div>
                          <Avatar
                            name={userList[k].first + " " + userList[k].last}
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
                      </td>
                      <td className="p-6 text-b100 underline hidden md:table-cell">
                        <a href={`mailto:${userList[k].email}`}>
                          {userList[k].email}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default Members;
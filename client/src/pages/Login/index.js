import React, { useState } from "react";

import { handle_login, handle_signup } from "../../handlers/User";

function LoginForm() {
  const [signupRes, setSignupRes] = useState(0);
  const [loginRes, setLoginRes] = useState(0);

  const [hasAccount, setForm] = useState(true);

  if (hasAccount) {
    return (
      <div className="flex flex-col items-center justify-center p-16 h-screen w-auto overflow-x-hidden overflow-y-auto">
        <span className="flex items-center justify-center text-center p-4 mb-4 font-bold text-6xl text-n800">
          Log In
        </span>

        {loginRes === 406 || loginRes === 404 || loginRes === 400 ? (
          <span className="flex flex-col items-center justify-center rounded-md h-max w-full md:w-6/12 bg-r300 m-6 p-4 text-n30 text-xs">
            Error logging in. Please make sure this email is registered, and
            that your password is correct.
          </span>
        ) : (
          ""
        )}

        <form
          className="w-full md:w-6/12"
          onSubmit={(e) =>
            handle_login(
              e,
              async (res) => setLoginRes(res.status),
              async (err) => setLoginRes(err.response.status)
            )
          }
        >
          <span className="text-sm text-n80">Email Address</span>
          <input
            name="email"
            className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40"
            type="text"
            placeholder="Enter your email address"
            maxLength="32"
          />

          <span className="text-sm text-n80">Password</span>
          <input
            name="pass"
            className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40"
            type="password"
            placeholder="Enter your password"
            maxLength="255"
          />
          <span className="text-xs text-n80">
            Password must contain at least 8 alphanumeric characters, and one of
            the following: ( ) ! @ $ & ^ ? /.
          </span>

          <button
            type="submit"
            className="rounded-md h-max w-full focus:outline-none p-4 mt-4 bg-b100 text-n30 hover:bg-b200"
          >
            Log In
          </button>
        </form>

        <span
          className="flex items-center justify-center text-center p-4 mt-4 text-n160 hover:cursor-pointer hover:text-n300"
          onClick={() => setForm(!hasAccount)}
        >
          Don't have an account yet?
        </span>
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center justify-center p-16 h-screen w-auto overflow-x-hidden overflow-y-auto">
        <span className="flex items-center justify-center text-center p-4 mb-4 font-bold text-6xl text-n800">
          Sign Up
        </span>

        {signupRes === 200 ? (
          <span className="flex flex-col items-center justify-center rounded-md h-max w-full md:w-6/12 bg-g300 m-6 p-4 text-n30 text-xs">
            <span className="flex">Successfully registered!</span>
            <span
              className="flex underline hover:cursor-pointer"
              onClick={() => setForm(!hasAccount)}
            >
              Continue to login
            </span>
          </span>
        ) : signupRes === 406 || signupRes === 400 ? (
          <span className="flex flex-col items-center justify-center rounded-md h-max w-full md:w-6/12 bg-r300 m-6 p-4 text-n30 text-xs">
            Error signing up. Please provide a name, an unregistered email
            address, and a matching & secure password.
          </span>
        ) : (
          ""
        )}

        {signupRes === 200 ? (
          ""
        ) : (
          <form
            className="w-full md:w-6/12"
            onSubmit={(e) =>
              handle_signup(
                e,
                async (res) => setSignupRes(res.status),
                async (err) => setSignupRes(err.response.status)
              )
            }
          >
            <span className="text-sm text-n80">Full Name</span>
            <div className="grid grid-cols-2">
              <input
                name="first"
                className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40 mr-1"
                type="text"
                placeholder="Enter your first name"
                maxLength="32"
              />
              <input
                name="last"
                className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40 ml-1"
                type="text"
                placeholder="Enter your last name"
                maxLength="32"
              />
            </div>

            <span className="text-sm text-n80">Email Address</span>
            <input
              name="email"
              className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40"
              type="text"
              placeholder="Enter your email address"
              maxLength="32"
            />

            <span className="text-sm text-n80">Password</span>
            <div className="grid grid-cols-2">
              <input
                name="pass"
                className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40 mr-1"
                type="password"
                placeholder="Enter a secure password"
                maxLength="255"
              />
              <input
                name="pass_confirm"
                className="rounded-md h-max w-full focus:outline-none p-4 mb-4 text-n80 bg-n30 hover:bg-n40 ml-1"
                type="password"
                placeholder="Confirm your password"
                maxLength="255"
              />
            </div>
            <span className="text-xs text-n80">
              Password must contain at least 8 alphanumeric characters, and one
              of the following: ( ) ! @ $ & ^ ? /.
            </span>

            <button
              type="submit"
              className="rounded-md h-max w-full focus:outline-none p-4 mt-4 bg-b100 text-n30 hover:bg-b200"
            >
              Sign Up
            </button>
          </form>
        )}

        {signupRes === 200 ? (
          ""
        ) : (
          <span
            className="flex items-center justify-center text-center p-4 mt-4 text-n160 hover:cursor-pointer hover:text-n300"
            onClick={() => setForm(!hasAccount)}
          >
            Already have an account?
          </span>
        )}
      </div>
    );
}

export default LoginForm;
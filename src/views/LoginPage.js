import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("TODO login with:", email, password);
  }
  // 1. create a thunk to send a POST request to backend to login W/ pass & email
  // 2. create a new slice: user
  //  a. create reducer, action-creators, action-types selector (to get JWT)
  //  b. in the thunk, send the request, if valid request & jwt is returned, send the action to reducers with payload:  userDetails & jwt
  //  c. in every component create a selector to retreive the loggedIn user info (No need to pass the JWT to the component as every request to a restricted resource will use a thunk that uses getState to get the JWT directly from the store.)
  //  d. whenever getting new data from to a restricted resource use a thunk, and include the JWT in GET request Authorisation header.
  /* new slice: user{
    jwt: jwt | null
    email: email | null
    // Don't store password here/anywhere in state! 
    // only use the password to send the login request then forget it.
    additionalUserDetails {
      ...other user info
    }
    userType: "developer" | "user" | null
  } */

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </p>
        <p>
          <label>
            Password:{" "}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    </div>
  );
}

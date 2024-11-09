// Write your code at relevant places in the code below:

import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [userList, setUserList] = useState([]);
  function addUserHandler(uName, uAge) {
    setUserList((prevUser) => {
      return [...prevUser, { name: uName, age: uAge, id: Math.random().toString() }]
    })
  }
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={userList} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./AddUser.css";

const AddUser = () => {
    const addUserHandler = (event) => {
        event.preventDefault();

        if (username.trim().length === 0 || age.trim().length === 0 || Number(age.trim()) < 0) {
            return;
        }
        console.log(username, age);
        setAge("");
        setUserName("");
    };

    function usernameChangeHandler(event) {
        setUserName(event.target.value);
    }
    function ageChangeHandler(event) {
        setAge(event.target.value);
    }

    const [age, setAge] = useState("");
    const [username, setUserName] = useState("");

    return (
        <Card className="input">
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={usernameChangeHandler} />
                <label htmlFor="age">Age</label>
                <input id="age" type="number" value={age} onChange={ageChangeHandler} />
                <Button type="submit" >Add User</Button>
            </form>
        </Card>
    );
};

export default AddUser;

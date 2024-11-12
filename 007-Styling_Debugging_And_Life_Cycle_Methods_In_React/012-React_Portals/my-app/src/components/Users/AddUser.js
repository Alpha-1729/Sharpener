import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./AddUser.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
    const [age, setAge] = useState("");
    const [username, setUserName] = useState("");
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();

        if (username.trim().length === 0 || age.trim().length === 0) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid username and age (non-empty values)"
            });
            return;
        }
        if (+age < 1) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid age (> 0)"
            });
            return;
        }
        props.onAddUser(username, age);
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

    function errorHandler() {
        setError(null);
    }

    return (
        <React.Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className="input">
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={usernameChangeHandler} />
                    <label htmlFor="age">Age</label>
                    <input id="age" type="number" value={age} onChange={ageChangeHandler} />
                    <Button type="submit" >Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default AddUser;

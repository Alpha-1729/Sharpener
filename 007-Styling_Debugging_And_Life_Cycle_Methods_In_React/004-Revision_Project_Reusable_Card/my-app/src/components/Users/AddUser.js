import React from 'react';
import './AddUser.css';
import Card from '../UI/Card';


function AddUser() {

    function addUserHandler(event) {
        event.preventDefault();
    }
    return (
        <Card className='input'>
            <form onSubmit={addUserHandler}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username'></input>

                <label htmlFor='age'>Age</label>
                <input type='number' id='age'></input>

                <button type='submit'> Add User</button>
            </form>
        </Card>
    );
}

export default AddUser;
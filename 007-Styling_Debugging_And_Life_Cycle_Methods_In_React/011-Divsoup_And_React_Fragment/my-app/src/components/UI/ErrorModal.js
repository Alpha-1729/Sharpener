import React from 'react';
import Card from './Card';
import Button from './Button';
import './ErrorModal.css';


function ErrorModal(props) {
    return (
        <React.Fragment>
            <div className='backdrop' onClick={props.onConfirm}></div>
            <Card className='modal'>
                <header className='header'>
                    <h2>{props.title}</h2>
                </header>
                <div className='content'>
                    <p>{props.message}</p>
                </div>
                <footer className='actions'>
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </Card>
        </React.Fragment>
    );
}

export default ErrorModal;
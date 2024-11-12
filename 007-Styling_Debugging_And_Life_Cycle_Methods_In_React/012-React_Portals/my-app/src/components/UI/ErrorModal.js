import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Button from './Button';
import './ErrorModal.css';


function Backdrop() {
    return <div className='backdrop' onClick={props.onConfirm}></div>;
}

function ModalOverlay() {
    return (
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
    );
}


function ErrorModal(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onConfirm={props.onConfirm} title={props.title} message={props.message} />,
                document.getElementById("overlay-root")
            )}

        </React.Fragment>
    );
}

export default ErrorModal;
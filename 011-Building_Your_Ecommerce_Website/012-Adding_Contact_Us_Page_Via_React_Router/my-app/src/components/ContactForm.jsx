import React, { useRef } from "react";
import styles from "./ContactForm.module.css";

function ContactForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    async function saveToFirebase(user) {
        const response = await fetch('https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        const user = {
            name: name,
            email: email,
            phone: phone,
        }

        saveToFirebase(user);

        nameRef.current.value = "";
        emailRef.current.value = "";
        phoneRef.current.value = "";
    };

    return (
        <div className={styles.container}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles["mb-3"]}>
                    <label htmlFor="name" className={styles["form-label"]}>
                        Name
                    </label>
                    <input
                        type="text"
                        className={styles["form-control"]}
                        id="name"
                        ref={nameRef}
                        required
                    />
                </div>

                <div className={styles["mb-3"]}>
                    <label htmlFor="email" className={styles["form-label"]}>
                        Email ID
                    </label>
                    <input
                        type="email"
                        className={styles["form-control"]}
                        id="email"
                        ref={emailRef}
                        required
                    />
                </div>

                <div className={styles["mb-3"]}>
                    <label htmlFor="phone" className={styles["form-label"]}>
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className={styles["form-control"]}
                        id="phone"
                        ref={phoneRef}
                        pattern="[0-9]{10}"
                        required
                    />
                </div>

                <button type="submit" className={styles["btn-primary"]}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ContactForm;

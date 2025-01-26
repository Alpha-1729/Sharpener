import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./CategoryItem.module.css";

const CategoryItem = ({ category, onEdit, onDelete }) => {
    return (
        <Card className={styles.card}>

            <div className={styles.imageWrapper}>
                <Card.Img variant="top" src={category.url} className={styles.image} />
            </div>

            <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.title}>{category.name}</Card.Title>
            </Card.Body>

            <Card.Footer className={styles.footer}>
                <Button
                    variant="primary"
                    className={styles.editButton}
                    onClick={() => onEdit(category)}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    className={styles.deleteButton}
                    onClick={() => onDelete(category.id)}
                >
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default CategoryItem;

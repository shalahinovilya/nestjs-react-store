import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {createCategory} from "../http/categoryHttp";

const AdminPage = () => {

    const [category, setCategory] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')

    const createCat = async () => {
        await createCategory({value: category, description: categoryDescription})
    }

    return (
        <div className="auth-block">
            <Form>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategoryDescription">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="category description"
                        value={categoryDescription}
                        onChange={e => setCategoryDescription(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className="submit-login-button"
                    variant="outline-success"
                    type="submit"
                    onClick={createCat}
                >
                    Create Category
                </Button>

            </Form>
        </div>
    );
};

export default AdminPage;
import React from 'react';
import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../index";
import {updateProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";


const UpdatePage = observer(() => {

    const location = useLocation();
    const product = location.state
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [img, setImg] = useState(product.img)

    const sendUpdateData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', product.categoryId)
        formData.append('userId', user.getUser().userId)
        await updateProduct(product.id, formData).then((data) => navigate(`/product/${data.id}`))
    }


    return (
        <Card className="updateProductCard" style={{width: '30rem', left: '35%', marginTop: 150}}>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput"
                                   label="Title"
                                   className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <FloatingLabel controlId="floatingInput"
                                   label="Description"
                                   className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <FloatingLabel controlId="floatingInput"
                                   label="Price"
                                   className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={e => setImg(e.target.files[0])}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={sendUpdateData}
                >
                    Update
                </Button>
            </Form>
        </Card>
    );
});


export default UpdatePage;
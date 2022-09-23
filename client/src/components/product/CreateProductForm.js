import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const CreateProductForm = observer(({validated, errors, sendCreateData}) => {

    const {product} = useContext(Context)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [imgEvent, setImgEvent] = useState({})

    return (
        <Form validated={validated}>
            {errors.message && <div className="wrong___create__data">product with such title exists</div>}
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    minLength="6"
                    maxLength="20"
                    required={true}
                    onChange={e => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    as="textarea"
                    isInvalid={errors.description}
                    rows={4}
                    placeholder="Description"
                    value={description}
                    minLength="10"
                    maxLength="200"
                    required={true}
                    onChange={e => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Price"
                    value={price}
                    required={true}
                    onChange={e => {
                        setPrice(e.target.value >= 0 ? e.target.value : 0)
                    }}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.price}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    required={true}
                    onChange={e => {
                        setImg(e.target.files[0])
                        setImgEvent(e)
                    }}
                    isInvalid={!!errors.img}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.img}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Select aria-label="Default select example" required={true} onChange={e => {
                setCategoryId(e.target.value)
            }}
            >
                <option value=''></option>
                {product.categories.map(cat =>
                    (<option key={cat.id} name={cat.value} value={cat.id}>{cat.value}</option>)
                )}
            </Form.Select>
            {errors.category && <div className="create__category__error">must not be empty</div>}
            <Button
                onClick={() => sendCreateData(imgEvent, img, title, description, price, categoryId)}
                style={{marginTop: 20}}
                className="create-button" variant="primary"
            >
                Create
            </Button>
        </Form>
    );
});

export default CreateProductForm;
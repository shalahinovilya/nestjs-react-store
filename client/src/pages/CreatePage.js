import React, {useContext, useEffect} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {Context} from "../index";
import {createProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/CategoryHttp";
import {useNavigate} from "react-router-dom";

const CreatePage = observer(() => {

    const {user, products} = useContext(Context)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const sendCreateData = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', categoryId)
        formData.append('userId', user.getUser().userId)
        const created = await createProduct(formData)
        navigate(`/product/${created.id}`)
    }

   useEffect( () => {
       getAllCategories().then(data => {
           products.setCategories(data)
       })
   }, [])


    return (
        <Card className="create-product-card" style={{ width: '30rem' }}>
        <Form>

            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3"  controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3"  controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={e => setImg(e.target.files[0])}
                />
            </Form.Group>

            <Form.Select aria-label="Default select example" onChange={e => {
                setCategoryId(e.target.value)
            }}>
                <option value=""></option>
                {products.getCategories().map(cat => {
                    return (
                        <option name={cat.value} value={cat.id}>{cat.value}</option>
                    )
                })}
            </Form.Select>


            <Button
                onClick={sendCreateData}
                style={{marginTop: 20}}
                className="create-button" variant="primary"
            >
                Submit
            </Button>
        </Form>
        </Card>
    );
});

export default CreatePage;
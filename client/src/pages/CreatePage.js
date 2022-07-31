import React, {useContext, useEffect} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {Context} from "../index";
import {createProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/CategoryHttp";
import {useNavigate} from "react-router-dom";

const CreatePage = observer(() => {

    const {user, product} = useContext(Context)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const findErrors = async () => {
        const newErrors = {}
        const validatePrice = /\d+(\.\d+)?$/

        if (title.length < 6 || title.length > 20) {
            newErrors['title'] = 'title must be between 6 and 20 characters'
        }

        if (description.length < 10 || description.length > 200) {
            newErrors['description'] = 'description must be between 10 and 200 characters'
        }

        if (!validatePrice.test(price)) {
            newErrors['price'] = 'must be number value'
        }

        return newErrors
    }


    const sendCreateData = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', categoryId)
        formData.append('userId', user.getUser().userId)

        const validatedData = await findErrors()

        if (Object.keys(validatedData).length) {
            setValidated(true)
            setErrors(validatedData)
        }

        else {
            setValidated(false)
            const data = await createProduct(formData)
            console.log(data)
            if (data['err']) {
                setErrors({...errors, message: data['err'].message})
            }
            else {
                navigate(`/product/${data.id}`)
            }
        }
    }

    useEffect(() => {
        getAllCategories().then(data => {
            product.setCategories(data)
        })
    }, [])


    return (
        <Card className="create-product-card" style={{width: '30rem'}}>
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
                        onChange={e => setPrice(e.target.value)}
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
                        onChange={e => setImg(e.target.files[0])}
                    />
                    <Form.Control.Feedback type="invalid">
                        please, select a file
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Select aria-label="Default select example" required={true} onChange={e => {
                    setCategoryId(e.target.value)
                }}
                >
                    <option></option>
                    {product.categories.map(cat => {
                        return (
                            <option name={cat.value} value={cat.id}>{cat.value}</option>
                        )
                    })}
                    <Form.Control.Feedback type="invalid">
                       must not be empty
                    </Form.Control.Feedback>
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
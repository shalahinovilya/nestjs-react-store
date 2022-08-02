import React, {useContext, useEffect} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";
import {Context} from "../index";
import {createProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/CategoryHttp";
import {useNavigate} from "react-router-dom";
import {findErrors} from "../utils/ValidateCreateData";


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
    const [imgEvent, setImgEvent] = useState({})

    const sendCreateData = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', categoryId)
        formData.append('userId', user.getUser().userId)

        const validatedData = await findErrors(imgEvent, title, description, price, categoryId)

        if (Object.keys(validatedData).length) {
            setValidated(true)
            setErrors(validatedData)
        }

        else {
            setValidated(false)
            const data = await createProduct(formData)

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
                        (<option name={cat.value} value={cat.id}>{cat.value}</option>)
                    )}
                </Form.Select>
                {errors.category && <div className="create__category__error">must not be empty</div>}
                <Button
                    onClick={sendCreateData}
                    style={{marginTop: 20}}
                    className="create-button" variant="primary"
                >
                    Create
                </Button>
            </Form>
        </Card>
    );
});

export default CreatePage;
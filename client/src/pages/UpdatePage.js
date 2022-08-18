import React from 'react';
import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../index";
import {updateProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {findUpdateErrors} from "../utils/product/ValidateUpdateProductData";

const UpdatePage = observer(() => {

    const location = useLocation();
    const product = location.state
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [img, setImg] = useState(product.img)
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)
    const [imgEvent, setImgEvent] = useState({})

    const sendUpdateData = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', product.categoryId)
        formData.append('userId', user.user.userId)

        const validatedData = await findUpdateErrors(imgEvent, title, description, price)

        if (Object.keys(validatedData).length) {
            setValidated(true)
            setErrors(validatedData)
        }
        else {
            setValidated(false)

            const data = await updateProduct(product.id, formData)

            if (data['err']) {
                setErrors({...errors, message: data['err'].message})
            }
            else {
                navigate(`/product/${data.id}`)
            }
        }
    }

    return (
        <Card className="updateProductCard" style={{width: '30rem', left: '35%', marginTop: 150}}>
            <Form validated={validated}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        rows={3}
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

                <div>
                    <div className="choose__file__row">
                        <div className="label_1">
                            <label className="choose__file__update1" htmlFor="filePicker">
                                Select file
                            </label>
                        </div>
                        <div className="label_2">
                            <label className="choose__file__update2" htmlFor="filePicker">
                                {img?.['name'] ? img['name'] : img.length && img.length > 30 ? `${img.slice(0, 35)}...` : product.img}
                            </label>
                        </div>
                    </div>
                    {errors.img && <div className="update__image__error">{errors.img}</div>}
                    <input
                        onChange={e => {
                            e.target.files.length && setImg(e.target.files[0])
                            setImgEvent(e)
                        }
                        }
                        id="filePicker"
                        style={{visibility:"hidden"}}
                        type={"file"}
                    />
                </div>
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
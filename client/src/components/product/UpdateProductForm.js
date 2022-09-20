import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";


const UpdateProductForm = ({validated, errors, sendUpdateData, product}) => {

    const [title, setTitle] = useState(product.title)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [img, setImg] = useState(product.img)
    const [imgEvent, setImgEvent] = useState({})

    return (
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
                    style={{visibility: "hidden"}}
                    type={"file"}
                />
            </div>
            <Button
                variant="primary"
                onClick={() => sendUpdateData(imgEvent, img, title, description, price)}
            >
                Update
            </Button>
        </Form>
    );
};

export default UpdateProductForm;
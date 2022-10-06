import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import TableDefaultControllers from "../TableDefaultControllers";
import TableEditControllers from "../TableEditControllers";
import {findUpdateProductErrors} from "../../../utils/admin/ValidateUpdateProductData";
import {updateProduct} from "../../../http/productHttp";

const ProductTr = ({product, showDeleteModal, isEditing, selectIdEditProduct}) => {

    const [title, setTitle] = useState(product?.title)
    const [description, setDescription] = useState(product?.description)
    const [price, setPrice] = useState(product.price)
    const [errors, setErrors] = useState({})

    const sendUpdateData = async () => {
        const validatedData = await findUpdateProductErrors(title, description, price)

        if (Object.keys(validatedData).length) {
            await setErrors(validatedData)
        } else {
            await setErrors(validatedData)
            await updateProduct(product.id, {title, description, price, img: product.img})
            await selectIdEditProduct(NaN)
        }
    }

    const setDefaultValues = async () => {
        await setTitle(product.title)
        await setDescription(product.description)
        await setPrice(product.price)
        await setErrors({})
        await selectIdEditProduct(NaN)
    }

    return (
        <tr className="align-middle">
            <td>
                <Form.Group controlId="formBasicProductId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="product id"
                        value={product.id}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicCartId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="cart id"
                        value={product.categoryId}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicUserId">
                    <Form.Control
                        disabled
                        type="number"
                        placeholder="user id"
                        value={product.userId}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="title"
                        minLength={6}
                        maxLength={20}
                        value={title}
                        isInvalid={errors.title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicDescription">
                    <Form.Control
                        disabled={isEditing}
                        type="text"
                        placeholder="description"
                        minLength={10}
                        maxLength={200}
                        value={description}
                        isInvalid={errors.description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicPrice">
                    <Form.Control
                        disabled={isEditing}
                        type="number"
                        placeholder="price"
                        value={price}
                        isInvalid={errors.price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="formBasicCreatedAt">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="createdAt"
                        value={product.createdAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <td>
                <Form.Group controlId="exampleForm.ControlUpdatedAt">
                    <Form.Control
                        disabled
                        type="date"
                        placeholder="updatedAt"
                        value={product.updatedAt.split('T')[0]}
                    />
                </Form.Group>
            </td>
            <td>
                <>
                    <div className="admin-product-controllers">
                        {isEditing ? (
                            <TableDefaultControllers
                                id={product.id}
                                type={'product'}
                                selectIdEdit={selectIdEditProduct}
                                showDeleteModal={showDeleteModal}
                            />
                        ) : (
                            <TableEditControllers
                                setDefaultValues={setDefaultValues}
                                sendUpdateData={sendUpdateData}
                            />
                        )}
                    </div>
                </>
            </td>
        </tr>
    );
};

export default ProductTr;
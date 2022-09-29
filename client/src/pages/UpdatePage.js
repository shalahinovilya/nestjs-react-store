import React from 'react';
import {Card} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../index";
import {updateProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {findUpdateProductErrors} from "../utils/product/ValidateUpdateProductData";
import UpdateProductForm from "../components/product/UpdateProductForm";

const UpdatePage = observer(() => {

    const location = useLocation();
    const product = location.state
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const sendUpdateData = async (imgEvent, img, title, description, price) => {

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', product.categoryId)
        formData.append('userId', user.user.userId)

        const validatedData = await findUpdateProductErrors(imgEvent, title, description, price)

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
           <UpdateProductForm
               validated={validated}
               errors={errors}
               sendUpdateData={sendUpdateData}
               product={product}
           />
        </Card>
    );
});


export default UpdatePage;
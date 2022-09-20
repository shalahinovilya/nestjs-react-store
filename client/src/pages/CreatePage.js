import React, {useContext, useEffect} from 'react';
import {Card} from "react-bootstrap";
import {useState} from "react";
import {Context} from "../index";
import {createProduct} from "../http/productHttp";
import {observer} from "mobx-react-lite";
import {getAllCategories} from "../http/categoryHttp";
import {useNavigate} from "react-router-dom";
import {findErrors} from "../utils/product/ValidateCreateProductData";
import CreateProductForm from "../components/product/CreateProductForm";


const CreatePage = observer(() => {

    const {user, product} = useContext(Context)
    const navigate = useNavigate()

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const sendCreateData = async (imgEvent, img, title, description, price, categoryId) => {

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', img)
        formData.append('categoryId', categoryId)
        formData.append('userId', user.user.userId)

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
            <CreateProductForm
                validated={validated}
                errors={errors}
                sendCreateData={sendCreateData}
            />
        </Card>
    );
});

export default CreatePage;
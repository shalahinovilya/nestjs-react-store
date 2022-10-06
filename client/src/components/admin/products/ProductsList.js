import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import ProductTr from "./ProductTr";

const ProductsList = ({showDeleteModal}) => {

    const {admin} = useContext(Context)

    const [idEditProduct, setIdEditProduct] = useState(NaN)

    const selectIdEditProduct = async (productId) => {
        await setIdEditProduct(productId)
    }

    return (
        <>
            {
            admin.products.map((product) => (
                    <ProductTr
                        product={product}
                        showDeleteModal={showDeleteModal}
                        selectIdEditProduct={selectIdEditProduct}
                        isEditing={idEditProduct !== product.id}
                        key={product.id}
                    />
                )
            )
        }
        </>
    )
};

export default ProductsList;
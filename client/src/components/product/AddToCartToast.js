import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

const AddToCartToast = ({show}) => {

    return (
        <ToastContainer position="middle-center" className="p-3" style={{position: 'absolute'}}>
            <Toast show={show} delay={0} autohide>
                <Toast.Body style={{'textAlign': 'center', fontSize: 27}}>Product added to cart</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default AddToCartToast;
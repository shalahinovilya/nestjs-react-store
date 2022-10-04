import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Modal} from "react-bootstrap";
import {createComment} from "../../../http/commentHttp";
import {findCommentDataErrors} from "../../../utils/comment/ValidateCommentData";
import CreateCommentModalBody from "./CreateCommentModalBody";


const CreateCommentModal = observer(({show, closeCommentModalHandler, productId}) => {

    const {product, user} = useContext(Context)

    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const createCommentHandler = async (advantages, limitations, content) => {

        const validatedData = findCommentDataErrors(advantages, limitations, content)

        if (Object.keys(validatedData).length) {
            setErrors(validatedData)
            setValidated(true)
        }

        else {
            await createComment({advantages, limitations, content, productId, userId: user.user.userId})
                .then(() => {
                    product.setCommentsNum(product.comments.length + 1)
                    onCloseModal()
                })
        }
    }

    const onCloseModal = async () => {
        await setValidated(false)
        await setErrors({})
        await closeCommentModalHandler()
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    onCloseModal()
                    setValidated(false)
                }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add review</Modal.Title>
                </Modal.Header>
               <CreateCommentModalBody
                   validated={validated}
                   errors={errors}
                   createCommentHandler={createCommentHandler}
                   onCloseModal={onCloseModal}
               />
            </Modal>
        </>
    )
});

export default CreateCommentModal;
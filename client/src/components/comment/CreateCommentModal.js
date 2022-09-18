import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createComment} from "../../http/commentHttp";
import {findCommentDataErrors} from "../../utils/comment/ValidateCommentData";


const CreateCommentModal = observer(({show, closeCommentModalHandler, productId}) => {

    const {product, user} = useContext(Context)

    const [advantages, setAdvantages] = useState('')
    const [limitations, setLimitations] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const createCommentHandler = async () => {

        const validatedData = findCommentDataErrors(advantages, limitations, content)

        if (Object.keys(validatedData).length) {
            setErrors(validatedData)
            setValidated(true)
        }

        else {
            await createComment({advantages, limitations, content, productId, userId: user.user.userId})
                .then(() => {
                    product.setCommentsNum(product.comments.length + 1)
                    closeCommentModalHandler()
                })
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    closeCommentModalHandler()
                    setValidated(false)
                }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="formBasicAdvantages">
                            <Form.Label>Advantages</Form.Label>
                            <Form.Control
                                type="text"
                                minLength="5"
                                maxLength="20"
                                value={advantages}
                                onChange={e => setAdvantages(e.target.value)}
                                required={true}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.advantages}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLimitations">
                            <Form.Label>Limitations</Form.Label>
                            <Form.Control
                                type="text"
                                minLength="5"
                                maxLength="20"
                                value={limitations}
                                onChange={e => setLimitations(e.target.value)}
                                required={true}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.limitations}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                isInvalid={errors.content}
                                type="text"
                                minLength="10"
                                maxLength="100"
                                as="textarea"
                                rows={4}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required={true}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.content}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        closeCommentModalHandler()
                        setValidated(false)
                        setErrors({})
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createCommentHandler}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
});

export default CreateCommentModal;
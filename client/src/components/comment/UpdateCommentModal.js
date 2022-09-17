import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {updateComment} from "../../http/commentHttp";
import {Button, Form, Modal} from "react-bootstrap";
import {findCommentDataErrors} from "../../utils/comment/ValidateCommentData";

const UpdateCommentModal = observer(({show, closeCommentModalHandler, comment}) => {

    const {product} = useContext(Context)

    const [advantages, setAdvantages] = useState('')
    const [limitations, setLimitations] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const updateCommentHandler = async () => {

        const validatedData = findCommentDataErrors(advantages, limitations, content)

        if (Object.keys(validatedData).length) {
            setErrors(validatedData)
            setValidated(true)
        }
        else {
            await updateComment(comment.id, {advantages, limitations, content})
                .then(() => {
                    product.setCommentsNum(product.comments.length + 1)
                    closeCommentModalHandler()
                })
        }
    }

    useEffect(() => {
        setAdvantages(comment.advantages)
        setLimitations(comment.limitations)
        setContent(comment.content)
    }, [comment])

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setValidated(false)
                    closeCommentModalHandler()
                }}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update review</Modal.Title>
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
                                {errors.advantages || 'advantages must be between 5 and 20 characters'}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLimitations">
                            <Form.Label>Limitations</Form.Label>
                            <Form.Control
                                type="text"
                                minLength="5"
                                maxLength="20"
                                value={String(limitations)}
                                onChange={e => setLimitations(e.target.value)}
                                required={true}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.limitations || 'limitations must be between 5 and 20 characters'}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
                                minLength="10"
                                maxLength="100"
                                as="textarea"
                                rows={4}
                                value={String(content)}
                                onChange={e => setContent(e.target.value)}
                                required={true}
                            />
                            {
                                errors.content &&
                                <div
                                    className="update__comment__content"
                                >
                                    content must be between 10 and 100 characters
                                </div>
                            }
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setValidated(false)
                        closeCommentModalHandler()
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateCommentHandler}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default UpdateCommentModal;
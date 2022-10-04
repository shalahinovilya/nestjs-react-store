import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateCommentModalBody = ({validated, errors, createCommentHandler, onCloseModal}) => {

    const [advantages, setAdvantages] = useState('')
    const [limitations, setLimitations] = useState('')
    const [content, setContent] = useState('')

    return (
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
            <div className="modal-create-comment-controllers">
                <Button onClick={onCloseModal} className="btn-secondary">Close</Button>
                <Button onClick={() => createCommentHandler(advantages, limitations, content)}>Create</Button>
            </div>
        </Modal.Body>
    );
};

export default CreateCommentModalBody;
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button} from "react-bootstrap";
import CreateCommentModal from "./CreateCommentModal";
import UpdateCommentModal from "./UpdateCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import '../../static/Comment.css'


const Comment = observer(({productId}) => {

    const {product, user} = useContext(Context)
    const [selectedComment, setSelectedComment] = useState({})
    const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
    const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false)
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)

    const closeCreateCommentModalHandler = () => {
        setShowCreateCommentModal(false)
    }

    const openCreateCommentModalHandler = () => {
        setShowCreateCommentModal(true)
    }

    const closeUpdateCommentModalHandler = () => {
        setShowUpdateCommentModal(false)
    }

    const openUpdateCommentModalHandler = (comment) => {
        setSelectedComment(comment)
        setShowUpdateCommentModal(true)
    }

    const closeDeleteCommentModalHandler = () => {
        setShowDeleteCommentModal(false)
    }

    const openDeleteCommentModalHandler = (comment) => {
        setSelectedComment(comment)
        setShowDeleteCommentModal(true)
    }

    return (
        <div className="comment__block">
            <div className="comment__title">
                <div>
                    Customer reviews <span className="comment__number">{product.commentsNum}</span>
                </div>
            </div>
            <div className="create__comment">
                <Button
                    variant="outline-secondary"
                    className="btn-lg"
                    onClick={openCreateCommentModalHandler}
                >
                    Add a review
                </Button>
            </div>
            <CreateCommentModal
                show={showCreateCommentModal}
                closeCommentModalHandler={closeCreateCommentModalHandler}
                productId={productId}
            />
            <DeleteCommentModal
                show={showDeleteCommentModal}
                closeCommentModalHandler={closeDeleteCommentModalHandler}
                commentId={selectedComment.id}
            />
            <UpdateCommentModal
                show={showUpdateCommentModal}
                closeCommentModalHandler={closeUpdateCommentModalHandler}
                comment={selectedComment}
            />
            <div className="comment__row">
                {
                    product.comments.map(comment =>
                        (
                            <div className="comment__col">
                                <div className="comment__item">
                                    <div className="item__header">
                                        <div className="comment__author">
                                            {comment.user.username}
                                            <time className="comment__date">{comment.updatedAt.split('T')[0]}</time>
                                        </div>
                                    </div>
                                    <div className="comment__content">
                                        <div className="comment__parts">
                                            <dl>
                                                <dt>Advantages:</dt>
                                                <dd>{comment.advantages}</dd>

                                                <dt>Limitations:</dt>
                                                <dd>{comment.limitations}</dd>

                                                <dt>Comment:</dt>
                                                <dd>{comment.content}</dd>
                                            </dl>
                                        </div>
                                        {
                                            comment.user.id === user.user.userId && (
                                                <div className="control__comment__buttons">
                                                    <Button
                                                        variant="outline-danger btn-sm"
                                                        id={comment.id}
                                                        onClick={() => openDeleteCommentModalHandler(comment)}
                                                    >
                                                        delete
                                                    </Button>
                                                    <Button
                                                        variant="outline-info btn-sm"
                                                        key={comment.id}
                                                        onClick={() => openUpdateCommentModalHandler(comment)}
                                                    >
                                                        update
                                                    </Button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
});

export default Comment;
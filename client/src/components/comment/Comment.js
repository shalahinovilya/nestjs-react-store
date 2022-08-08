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
    const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
    const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(-1)
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(-1)

    const closeCreateCommentModalHandler = () => {
        setShowCreateCommentModal(false)
    }

    const openCreateCommentModalHandler = () => {
        setShowCreateCommentModal(true)
    }

    const closeUpdateCommentModalHandler = () => {
        setShowUpdateCommentModal(-1)
    }

    const openUpdateCommentModalHandler = (commentId) => {
        setShowUpdateCommentModal(commentId)
    }

    const closeDeleteCommentModalHandler = () => {
        setShowDeleteCommentModal(-1)
    }

    const openDeleteCommentModalHandler = (commentId) => {
        setShowDeleteCommentModal(commentId)
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
                                            comment.user.id === user.getUser().userId && (
                                                <div className="control__comment__buttons">
                                                    <Button
                                                        variant="outline-danger btn-sm"
                                                        onClick={() => openDeleteCommentModalHandler(comment.id)}
                                                    >
                                                        delete
                                                    </Button>
                                                    <Button
                                                        variant="outline-info btn-sm"
                                                        onClick={() => openUpdateCommentModalHandler(comment.id)}
                                                    >
                                                        update
                                                    </Button>
                                                    <DeleteCommentModal
                                                        show={comment.id === showDeleteCommentModal}
                                                        closeCommentModalHandler={closeDeleteCommentModalHandler}
                                                        commentId={comment.id}
                                                    />
                                                    <UpdateCommentModal
                                                        show={comment.id === showUpdateCommentModal}
                                                        closeCommentModalHandler={closeUpdateCommentModalHandler}
                                                        comment={comment}
                                                    />
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
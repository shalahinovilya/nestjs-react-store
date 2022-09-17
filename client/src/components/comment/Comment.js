import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button} from "react-bootstrap";
import CreateCommentModal from "./CreateCommentModal";
import UpdateCommentModal from "./UpdateCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import '../../static/Comment.css'
import CommentList from "./CommentList";


const Comment = observer(({productId}) => {

    const {product} = useContext(Context)
    const [selectedComment, setSelectedComment] = useState({})
    const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
    const [showUpdateCommentModal, setShowUpdateCommentModal] = useState(false)
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)

    const createCommentModalHandler = () => {
        showCreateCommentModal ? setShowCreateCommentModal(false) : setShowCreateCommentModal(true)
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
                    onClick={createCommentModalHandler}
                >
                    Add a review
                </Button>
            </div>
            <CreateCommentModal
                show={showCreateCommentModal}
                closeCommentModalHandler={createCommentModalHandler}
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
            <CommentList
                openUpdateModal={openUpdateCommentModalHandler}
                openDeleteModal={openDeleteCommentModalHandler}
            />

        </div>
    );
});

export default Comment;
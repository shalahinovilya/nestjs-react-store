import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const CommentList = observer(({openUpdateModalHandler, openDeleteModalHandler}) => {

    const {product, user} = useContext(Context)

    return (
        <div className="comment__row">
            {
                product.comments.map(comment =>
                    (
                        <div key={comment.id} className="comment__col">
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
                                                    onClick={() => openDeleteModalHandler(comment)}
                                                >
                                                    delete
                                                </Button>
                                                <Button
                                                    variant="outline-info btn-sm"
                                                    onClick={() => openUpdateModalHandler(comment)}
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
    );
});

export default CommentList;
import React from 'react';

const TableDefaultControllers = ({id, type, selectIdEdit, showDeleteModal}) => {
    return (
        <div className="admin-user-controllers">
            <div className="edit-item">
                <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => selectIdEdit(id)}
                >
                </i>
            </div>
            <div className="delete-item">
                <i
                    className="fa-solid fa-trash"
                    onClick={() => showDeleteModal({id, type})}
                >
                </i>
            </div>
        </div>
    );
};

export default TableDefaultControllers;
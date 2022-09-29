import React from 'react';

const TableEditControllers = ({setDefaultValues, sendUpdateData}) => {
    return (
        <div className="admin-user-controllers">
            <div className="cancel-edit">
                <i
                    className="fa-solid fa-xmark"
                    onClick={setDefaultValues}
                >
                </i>
            </div>
            <div className="confirm-edit">
                <i
                    className="fa-solid fa-check"
                    onClick={sendUpdateData}
                >
                </i>
            </div>
        </div>
    );
};

export default TableEditControllers;
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const TableDefaultControllers = observer(({id, type, selectIdEdit}) => {

    const {admin} = useContext(Context)

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
                    onClick={() => admin.setCurrentItem({id, type})}
                >
                </i>
            </div>
        </div>
    );
});

export default TableDefaultControllers;
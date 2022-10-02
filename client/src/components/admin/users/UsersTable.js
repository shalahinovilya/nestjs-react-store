import React, {useContext, useState} from 'react';
import UserTr from "./UserTr";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const UsersTable = observer(({showDeleteModal}) => {

    const {admin} = useContext(Context)

    const [idEditUser, setIdEditUser] = useState(NaN)

    const selectIdEditUser = async (userId) => {
        await setIdEditUser(userId)
    }

    return (
        <tbody>
        {admin.users.map((user) => (
                <UserTr
                    user={user}
                    showDeleteModal={showDeleteModal}
                    selectIdEditUser={selectIdEditUser}
                    isEditing={idEditUser !== user.id}
                    key={user.id}
                />
            )
        )}
        </tbody>
    );
});

export default UsersTable;
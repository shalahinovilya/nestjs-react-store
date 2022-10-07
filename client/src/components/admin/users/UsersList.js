import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import UserTr from "./UserTr";


const UsersList = () => {

    const {admin} = useContext(Context)

    const [idEditUser, setIdEditUser] = useState(NaN)

    const selectIdEditUser = async (userId) => {
        await setIdEditUser(userId)
    }

    return (
        <>
            {
                admin.users.map((user) => (
                    <UserTr
                        user={user}
                        selectIdEditUser={selectIdEditUser}
                        isEditing={idEditUser !== user.id}
                        key={user.id}
                    />
                    )
                )
            }
        </>
    )
};

export default UsersList;
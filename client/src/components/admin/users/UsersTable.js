import React, {useState} from 'react';
import UserTr from "./UserTr";

const UsersTable = ({userList, showDeleteModal}) => {

    const [idEditUser, setIdEditUser] = useState(NaN)

    const selectIdEditUser = async (userId) => {
        await setIdEditUser(userId)
    }

    return (
        <tbody>
        {userList.map((user) => (
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
};

export default UsersTable;
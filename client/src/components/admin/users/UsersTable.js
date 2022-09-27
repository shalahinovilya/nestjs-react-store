import React from 'react';
import UserTr from "./UserTr";

const UsersTable = ({userList, showDeleteModal}) => {

    return (
        <tbody>
        {userList.map((user) => (
                <UserTr
                    user={user}
                    showDeleteModal={showDeleteModal}
                    key={user.id}
                />
            )
        )}
        </tbody>
    );
};

export default UsersTable;
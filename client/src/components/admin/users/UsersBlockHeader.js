import React from 'react';

const UsersBlockHeader = () => {
    return (
        <thead>
            <tr>
                <th>
                    user id
                </th>
                <th>
                    email
                </th>
                <th>
                    username
                </th>
                <th>
                    role
                </th>
                <th>
                    createdAt
                </th>
                <th>
                    updatedAt
                </th>
            </tr>
        </thead>
    );
};

export default UsersBlockHeader;
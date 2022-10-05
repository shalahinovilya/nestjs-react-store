import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {getAllUsers} from "../../../http/userHttp";
import TableLoader from "../TableLoader";
import {Table} from "react-bootstrap";
import UsersBlockHeader from "./UsersBlockHeader";
import UsersList from "./UsersList";

const UsersTable = observer(({showDeleteModal}) => {

    const {admin} = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)

    const getUsers = async () => {
        await setIsLoading(true)
        await getAllUsers()
            .then(data => admin.setUsers(data))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getUsers()
    }, [admin.users.length])

    if (!admin.users.length) {
        return <div>No Data</div>
    }

    return (
        <>
            {isLoading ? (<TableLoader/>) : (
                <Table striped bordered hover size="sm">
                    <UsersBlockHeader/>
                    <tbody>
                    <UsersList
                        showDeleteModal={showDeleteModal}
                    />
                    </tbody>
                </Table>
            )}
        </>
    );
});

export default UsersTable;
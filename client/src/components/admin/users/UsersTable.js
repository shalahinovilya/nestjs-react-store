import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {getAllUsers} from "../../../http/userHttp";
import TableLoader from "../TableLoader";
import {Table} from "react-bootstrap";
import UsersBlockHeader from "./UsersBlockHeader";
import UsersList from "./UsersList";

const UsersTable = () => {

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
        return <div className="admin-table-no-data">No Data</div>
    }

    return (
        <>
            {isLoading ? (<TableLoader/>) : (
                <Table responsive striped bordered hover size="sm">
                    <UsersBlockHeader/>
                    <tbody>
                    <UsersList/>
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UsersTable;
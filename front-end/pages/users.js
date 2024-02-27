import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';

const Users = () => {
    const { data: users, isFetching, isLoading, refetch, error } = useQuery('users', async () => {
        const { data } = await api.get('http://localhost:3001/users');
        return data;
    });

    return (
        <ul>
            {isFetching && <p>Carregando...</p>}
            {users?.map(user => (
                <li key={user.name}>
                    <strong>{user.name}</strong>
                </li>
            ))}
        </ul>
    );
};

export default Users;

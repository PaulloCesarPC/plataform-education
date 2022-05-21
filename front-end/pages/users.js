import React from 'react'
import { useQuery } from 'react-query'
import { api } from '../services/api'


export default function users() {

    const { data: users, isFetching, isLoading, refetch, error } = useQuery('users', async () => {
        const { data } = await api.get('http://localhost:3001/users')
        return data
    },
        // staleTime: 5000
        // {refetchOnWindowFocus: false,}
    )



    return (
        <ul>
            {isFetching && <p>Carregando...</p>}
            {users?.map(user => {
                return (
                    <li key={user.name}>
                        <strong>{user.name}</strong>
                    </li>
                )
            })}
        </ul>
    )
}

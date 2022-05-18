import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'


export default function users() {

    const { data: users, isFetching } = useQuery('users', async () => {
        const response = await axios.get('http://localhost:3001/users')

        return response.data
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

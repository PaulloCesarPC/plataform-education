import React from 'react'
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupAPIClient } from '../services/apiClient';

export default function metrics() {
    return (
        <div>metrics</div>
    )
}



export const getServerSideProps = withSSRAuth(async ctx => {
    const apiClient = setupAPIClient(ctx);
    // const response = await apiClient.get('/me');

    return {
        props: {},
    }
},
    {
        permissions: ['metrics.list'],
        roles: ['administrator'],
    }
);



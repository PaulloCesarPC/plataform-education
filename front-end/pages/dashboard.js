import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';
import { setupAPIClient } from '../services/apiClient';
import { Button, Stack } from '@chakra-ui/react';

const Dashboard = () => {
    const { user, signOut } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }, []);

    return (
        <Stack spacing={4} direction='row' align='center' justify='center' mt="8rem" >
            <h1>Dashboard {user?.email}</h1>
            <Button
                colorScheme='teal' size='sm'
                onClick={signOut}>
                Log out
            </Button>
        </Stack>
    );
};

export default Dashboard;

export const getServerSideProps = withSSRAuth(async ctx => {
    const apiClient = setupAPIClient(ctx);

    // const response = await apiClient.get('/me');

    // console.log(response.data);

    return {
        props: {},
    };
});

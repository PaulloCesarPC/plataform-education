import decode from 'jwt-decode';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

export function withSSRAuth(fn, options) {

    return async (ctx) => {
        const cookies = parseCookies(ctx)
        const token = cookies['plataform-education.token']


        if (!token) {
            console.log('1')
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        if (options) {

            const user = decode(token)
            const { permissions, roles } = options
            console.log(options)
            const userHasValidPermissions = validateUserPermissions({
                user,
                permissions,
                roles
            })

            if (!userHasValidPermissions) {
                console.log('2')
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    }
                }
            }
        }

        try {
            console.log('3')
            return await fn(ctx)
        } catch (e) {

            if (e instanceof AuthTokenError) {
                destroyCookie(ctx, 'plataform-education.token')
                destroyCookie(ctx, 'plataform-education.refreshToken')
                console.log('4')
                return {

                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }
            return {
                props: {},
            };




        }
    }

}
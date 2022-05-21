import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function withSSRAuth(fn) {

    return async (ctx) => {
        const cookies = parseCookies(ctx)

        if (!cookies['plataform-education.token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {

            return await fn(ctx)
        } catch (e) {

            if (e instanceof AuthTokenError) {
                destroyCookie(ctx, 'plataform-education.token')
                destroyCookie(ctx, 'plataform-education.refreshToken')

                return {

                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            } else {
                destroyCookie(ctx, 'plataform-education.token')
                destroyCookie(ctx, 'plataform-education.refreshToken')
                return {
                    props: {},
                };
            }




        }
    }

}
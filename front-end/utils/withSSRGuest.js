import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"

export function withSSRGuest(fn) {

    return async (ctx) => {
        const cookies = parseCookies(ctx)

        if (cookies['plataform-education.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(ctx)
    }

}
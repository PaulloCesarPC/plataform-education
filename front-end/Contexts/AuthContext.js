import { createContext, useState, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient';


export const AuthContext = createContext({})

export function signOut() {
    destroyCookie(undefined, 'plataform-education.token')
    destroyCookie(undefined, 'plataform-education.refreshToken')
    Router.push('/')
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'plataform-education.token': token } = parseCookies()
        if (token) {
            api.get('/me').then(response => {
                const { email, permissions, roles } = response.data
                setUser({ email, permissions, roles })
            }).catch(err => {
                signOut()
            })
        }
    }, [])

    async function signIn({ email, password }) {

        try {
            const response = await api.post('sessions', {
                email, password
            })
            const { token, refreshToken, permissions, roles } = response.data;
            setCookie(undefined, 'plataform-education.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            setCookie(undefined, 'plataform-education.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                email, permissions, roles
            })
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            Router.push('/dashboard')
        } catch (e) {
            console.log(e)
        }


    }
    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
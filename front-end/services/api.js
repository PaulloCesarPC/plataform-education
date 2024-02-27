import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../Contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError';


let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)
  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorization: `Bearer ${cookies['plataform-education.token']}`
    }
  })

  api.interceptors.response.use(response => response,
    (error) => {
      if (error.response.status == 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)
          const { 'plataform-education.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true
            api.post('/refresh', {
              refreshToken
            }).then(response => {
              const { token } = response.data


              setCookie(ctx, 'plataform-education.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
              })
              setCookie(ctx, 'plataform-education.refreshToken', response.data.refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
              })

              api.defaults.headers['Authorization'] = `Bearer ${token}`
              failedRequestsQueue.forEach(request => request.onSuccess(token))
              failedRequestsQueue = []
            }).catch((err) => {
              failedRequestsQueue.forEach(request => request.onFailure(err))
              failedRequestsQueue = []
              if (typeof window) {
                signOut()
              }

            })


              .finally(() => {
                isRefreshing = false;
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err) => {
                reject(err)
              }
            })
          })
        } else {

          if (typeof window) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    })

  return api;
}
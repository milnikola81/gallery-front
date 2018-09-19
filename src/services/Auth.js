import axios from 'axios'

export default class AuthService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
        this.setAuthorizationHeader()
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        // delete axios.defaults.headers.common['Authorization']
    }

    login(email, password) {
        return axios.post('auth/login', {
        email, password
        }).then((response) => {
        // console.log(response.data.access_token)
        window.localStorage.setItem('token', response.data.access_token)
        window.localStorage.setItem('userId', response.data.userId)
        this.setAuthorizationHeader()
        })
    }

    setAuthorizationHeader() {
        const token = window.localStorage.getItem('token')
        const userId = window.localStorage.getItem('userId')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.defaults.headers.common['User'] = `Bearer ${userId}`

    }

    isAuthenticated() {
        return localStorage.getItem('token')
    }
    getUserId() {
        return localStorage.getItem('userId')
    }
}

export const authService = new AuthService()
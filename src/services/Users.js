import axios from 'axios'

export default class UsersService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    register(user) {
        // console.log(user)
        return axios.post('users', user)
    }

    getAuthor(id) {
        return axios.get(`authors/${id}`)
    }
}

export const usersService = new UsersService()
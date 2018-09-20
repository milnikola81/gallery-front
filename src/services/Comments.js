import axios from 'axios'

export default class CommentsService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    addComment(comment) {
        return axios.post('comments', comment)
    }

}

export const commentsService = new CommentsService()
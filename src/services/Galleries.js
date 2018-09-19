import axios from 'axios'

export default class GalleriesService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
    
    getAll(searchTerm) {
        if(!searchTerm) {
            searchTerm = ''
        }
        return axios.get(`galleries?search=${searchTerm}`)
    }
    get(id) {
        return axios.get(`galleries/${id}`)
    }
    getNextPage(nextPage, searchTerm) {
        return axios.get(`${nextPage}`)
    }
    addGallery(gallery) {
        return axios.post('galleries', gallery)
    }
}

export const galleriesService = new GalleriesService()
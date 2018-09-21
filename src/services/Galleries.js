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
    getAuthor(id, searchTerm) {
            if(!searchTerm) {
                searchTerm = ''
            }
            return axios.get(`authors/${id}?search=${searchTerm}`)
    }
    getNextPage(nextPage, searchTerm) {
        return axios.get(`${nextPage}&search=${searchTerm}`)
    }
    addGallery(gallery) {
        return axios.post('galleries', gallery)
    }
    deleteGallery(id) {
        return axios.delete(`galleries/${id}`)
    }
    editGallery(gallery) {
        console.log(gallery)
        return axios.put(`galleries/${gallery.id}`, gallery)
    }
}

export const galleriesService = new GalleriesService()
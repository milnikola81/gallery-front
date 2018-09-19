import axios from 'axios'

export default class GalleriesService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
    
    getAll() {
        return axios.get('galleries')
    }

}

export const galleriesService = new GalleriesService()
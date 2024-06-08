import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (obj) => {
    const request = axios.post(baseUrl, obj)
    return request.then(response => response.data)
}

const remove = (obj) => {
    const request = axios.delete(`${baseUrl}/${obj.id}`)
    return request.then(response => response.data)
}

const update = (obj, id) => {
    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(response => response.data)
}

export default { create, getAll, remove, update }
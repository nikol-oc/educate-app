import axios from 'axios'

const UrlEndPoint = [
    { key: 'urlApp', url: 'http://localhost:3977/api/' },
]

const restApi = (
        urlInput: string
   
    ) => {
        
    let url = UrlEndPoint.find(x => x.key == urlInput)

    const defaultOptions = {
        baseURL: url?.url,
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    }

    const apiInstance = axios.create({
        baseURL: url?.url,
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    })

    return apiInstance;
   
        
}

export default restApi
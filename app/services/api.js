import { create } from 'apisauce'

export const createAPI = (baseURL="http://localhost:1234") => {
    // define the api
    const api = create({
        baseURL, 
        headers: {
            'Accept': 'application/json',
        },
    })
    const res = {}

    // method to set header in api object
    res.setHeader = api.setHeader
    res.setHeaders = api.setHeaders

    // start making calls
    res.whoami = () => api.get('whoami')
    res.signup = (name, phoneNumber, password) => api.post('signup', {
        name, phoneNumber, password
    })
    res.checkuser = (phoneNumber) => api.get(`checkuser/${phoneNumber}`)
    res.postContact = (phoneNumber) => api.post('contact', {
        phoneNumber,
    })
    res.getContactPage = (page, pageSize=20) => api.get(`contacts/${page}`, {
        pageSize,
    })
    res.deleteContact = (otherId) => api.delete(`contact/${otherId}`)

    return res
}

export default createAPI();
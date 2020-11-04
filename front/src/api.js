import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
const queryString = require('query-string')

class Api {
  url = 'http://localhost:8000/api/'

  async getMany (path, params) {
    return this.get(path, params, [])
  }
  
  async getOne (path, params) {
    return this.get(path, params, {})
  }

  async get (path, params, valueIfError) {
    path = this.url + path
    path = isEmpty(params) ? path : (path + '?' + queryString.stringify(params))
    let response = await fetch(path, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.ok) {
      let item = await response.json()
      return item
    } else {
      toast.error("Error in " + path + "; Status " + response.status.toString())
      return valueIfError
    }
  }

}

export default new Api()
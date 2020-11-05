import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
const queryString = require('query-string')

class Api {
  url = 'http://localhost:8000/api/'

  async getJson(path, params, defaultValue) {
    let response = await this.get(path, params, defaultValue)
    if (response.ok) {
      return response.json()
    } else {
      return defaultValue
    }
  }

  async get (path, params, valueIfError) {
    path = this.url + path
    path = isEmpty(params) ? path : (path + '?' + queryString.stringify(params))
    let response = await fetch(path, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return this.handleErrors(response, valueIfError)
  }

  async post (path, data) {
    path = this.url + path
    let response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return this.handleErrors(response, {})
  }

  async handleErrors(response) {
    if (!response.ok) {
      toast.error("Error in " + response.url + "; Status " + response.status.toString())
    }
    return response
  }

}

export default new Api()
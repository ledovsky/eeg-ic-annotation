import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
const queryString = require('query-string')

class Api {
  url = 'http://localhost:8000/api/'

  async getMany (path, params) {
    path = this.url + path
    console.log(params)
    path = isEmpty(params) ? path : ('/?' + queryString.stringify(params))
    console.log("pre get " + path)
    let response = await fetch(path, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(response)
    if (response.ok) {
      let collection = await response.json()
      return collection
    } else {
      toast.error("Error in " + path + "; Status " + response.status.toString())
      return []
    }
  }
  
  async getOne (path, params) {
    path = this.url + '/?' + queryString.stringify(params)
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
      return {}
    }
  }

}

export default new Api()
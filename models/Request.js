import axios from 'axios'

export default class {
  constructor(url) {
    this.url = url
    this.created = (new Date()).getTime()
    this.response = null
  }
  make(type = 'get') {
    const method = axios[type]
    method(this.url)
      .then(res => {
        console.log('res.data', res.data)
        this.response = res
      })
  }
  stringData() {
    return this.response ? JSON.stringify(this.response.data, null, 2) : ''
  }
}

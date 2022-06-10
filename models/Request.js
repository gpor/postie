import axios from 'axios'

export default class {
  constructor(url, method, data) {
    this.url = url
    this.method = method
    this.data = data ? JSON.parse(data) : {}
    this.created = (new Date()).getTime()
    this.lastSent = null
    this.response = null
    this.error = null
    this.loading = true
  }
  send() {
    this.lastSent = (new Date()).getTime()
    this.loading = true
    console.log('this.method', this.method)
    console.log('this.data', this.data)
    axios({
      method: this.method,
      url: this.url,
      data: this.data,
    })
      .then(res => {
        this.loading = false
        console.log('res', res)
        this.response = res
      })
      .catch(err => {
        this.loading = false
        console.log('err', err)
        this.error = err
        if ('response' in err) {
          this.response = err.response
        }
      })
  }
  stringData() {
    return this.response ? JSON.stringify(this.response.data, null, 2) : ''
  }
}

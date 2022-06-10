import axios from 'axios'

export default class {
  constructor() {
    this.url = ''
    this.method = ''
    this.data = {}
    this.created = 0
    this.lastSent = null
    this.response = null
    this.error = null
    this.loading = false
  }
  populate(url, method, data) {
    this.url = url
    this.method = method
    this.data = {}
    this.created = (new Date()).getTime()
    this.lastSent = null
    this.response = null
    this.error = null
    this.loading = true
    if (data) {
      try {
        this.data = JSON.parse(data)
      }
      catch(e) {
        this.error = {
          message: 'invalid json',
        }
      }
    }
  }
  repopulate(data) {
    for (const pName in data) {
      this[pName] = data[pName]
    }
  }
  send(callback = null) {
    if (this.error !== null) {
      this.loading = false
      return false
    }
    this.lastSent = (new Date()).getTime()
    this.loading = true
    axios({
      method: this.method,
      url: this.url,
      data: this.data,
    })
      .then(res => {
        this.loading = false
        this.response = res.data
        if (typeof callback === 'function') {
          callback()
        }
      })
      .catch(err => {
        this.loading = false
        this.error = err.message
        if ('response' in err) {
          this.response = err.response.data
        }
        if (typeof callback === 'function') {
          callback()
        }
      })
  }
  stringResponseData() {
    return this.response ? JSON.stringify(this.response, null, 2) : ''
  }
}

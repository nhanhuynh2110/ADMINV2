/* global fetch */
class API {
  base (url) {
    return '/base-api' + url
  }

  get (url, query = {}) {
    url = this.formatLink(query) ? url + '?' + this.formatLink(query) : url
    return fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
      .then((response) => response.json())
      .then(hanldeError)
  }

  formatLink (query) {
    var datas = []
    for (var k in query) {
      datas.push(k + '=' + query[k])
    }
    if (datas.length > 0) return datas.join('&')
    return null
  }
}

const hanldeError = (response) => {
  console.log('response', response)
  if (!response.status) return { error: 'Request api invalid' }
  if (response.status !== 200) return { error: response.message || 'request api invalid' }
  return { data: response.data }
}

export default API

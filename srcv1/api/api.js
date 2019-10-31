/* global fetch */
class API {
  get (url, query = {}) {
    return fetch(formatLink(url, query), {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then(hanldeResponse)
  }

  put (url, query = {}, body = {}) {
    return fetch(formatLink(url, query), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(hanldeResponse)
  }

  delete (url, query = {}, body = {}) {
    return fetch(formatLink(url, query), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(hanldeResponse)
  }
}

const formatLink = (url, query) => {
  var datas = []
  for (var k in query) { datas.push(k + '=' + query[k]) }
  if (datas.length > 0) return url + '?' + datas.join('&')
  return url
}

const hanldeResponse = (response) => {
  if (!response.status) return { error: 'Request api invalid' }
  if (response.status !== 200) return { error: response.message || 'request api invalid' }
  return { data: response.data }
}

export default API

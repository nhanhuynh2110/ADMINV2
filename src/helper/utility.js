let domain = 'http://localhost:3100'

let formatDate = (strDate) => {
  var date = new Date(strDate)
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  )
}

let renderString = (value) => {
  return value
}

export {
  domain,
  formatDate,
  renderString
}

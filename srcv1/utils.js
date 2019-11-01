let formatDate = (strDate) => {
  var date = new Date(strDate)
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  )
}

const runParrallel = (tasks, ...args) => Promise.all(tasks.map(task => task(...args)))

const toDropdown = (data, [value, text]) => data.map((el, key) => ({ key: `${el[value]}-${key}`, value: el[value], text:el[text]}))

export {
  formatDate,
  runParrallel,
  toDropdown
}

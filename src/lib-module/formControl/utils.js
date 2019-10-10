export default {
  runSequentially: (tasks, ...args) => tasks.map(task => new Promise((resolve) => {
    resolve(task(...args))
  })).reduce((chain, task) =>
    chain.then(results =>
      task.then(result => [ ...results, result ])
    ), Promise.resolve([])
  ),
  runParrallel: (tasks, ...args) => Promise.all(tasks.map(task => task(...args)))
}
import {APICategory} from '../../api'
import {runParrallel, toDropdown} from '../../utils'

const getParents = () => APICategory.parents().then(data => data.data)
const loadData = (id) => APICategory.detail({}, id).then(data => data.data)
const loadDataForm = (getData, id = null) => {
  const tasks = getData && id ? [getParents, loadData.bind(null, id)] : [getParents]
  return runParrallel(tasks).then(data => ({parents: toDropdown(data[0], ['_id', 'title']), detail: data[1] }))
}
export default {
  loadDataForm,
  getParents
}
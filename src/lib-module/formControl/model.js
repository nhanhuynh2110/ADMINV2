import {useState} from 'react'
import utils from './utils'
import validatorsjs from './validators'

const Model = (formModels, data) => {
  const [model, setModel] = useState(formModels)
  const newModel = {...model}

  const setError = (field, message) => {
    newModel[field].valid = !message
    newModel[field].error = message

    newModel[field].valid = !message ? true : false

    delete newModel.valid
    newModel.valid = _.valuesIn(newModel).every(el => el.valid === true)
  }

  // // update value field
  const setValue = (fieldName, value) => {
    if (newModel[fieldName].value === value) return
    newModel[fieldName].value = value
    setModel({...newModel})
  }

  const createValidators = (validators, value) => {
    return validators.map(v => {
      if (typeof v.compare === 'function') return v.compare.bind(null, value, model)
      return validatorsjs[v.compare].bind(null, value, v.compareTo )
    })
  }

  const validate = (fieldName, value) => {
    if (!newModel[fieldName].validator) return Promise.resolve(true)
    const validators = createValidators(newModel[fieldName].validator, value )
    return utils
      .runSequentially(validators)
      .then(() => {
        setError(fieldName)
        return true
      })
      .catch(err => {
        setError(fieldName, err.message)
        return false
      })
  }

  const validateModel = () => {
    const tasks = []
    
    Object.keys(model).forEach(n => {
      if (n === 'valid' || n === 'setValue' || n ==='validate' || n === 'validateModel') return
      tasks.push(() => validate(n, model[n].value).then(flag => {
        if (!data) {
          model[n].error = ''
        }
        model[n].valid = flag
        return flag
      }))
    })

    return utils.runParrallel(tasks).then((dt) => {
      model.valid = dt.every(el => el === true)
      setModel({...model})
    })
  }

  model.setValue = setValue
  model.validate = validate
  model.validateModel = validateModel

  Object.defineProperty(model, 'data', {
    get: () => {
      const dt = {}
      Object.keys(model).forEach(m => {
        if (m === 'valid' || m === 'setValue' || m ==='validate' || m === 'validateModel') return
        dt[m] = model[m].value ? model[m].value : ''
      })
      return dt
    },
    configurable: true
  })

  const init = () => {
    Object.keys(model).forEach(name => {
      if (name === 'valid') return
      const hasValidate = model[name].validator && model[name].validator.length > 0
      if (!hasValidate) model[name].valid = true
      if (data) {
        model[name].value = data[name] ? data[name] : null
      }
    })
  }

  return [model, init]
}

Model.initModel = () => {}

export default Model
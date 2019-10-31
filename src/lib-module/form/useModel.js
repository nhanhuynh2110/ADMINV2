/* global _ */
import Model from './model'
import { useState, useEffect } from 'react'

export default (model, defaultData) => {
  const _model = new Model(model, defaultData)

  const [formState, setFormState] = useState(_model)

  const deps = _.values(formState.data)
  useEffect(() => {
    const change = newModel => {
      console.log('newModel', newModel)
      const newFormState = Object.assign(
        Object.create(Object.getPrototypeOf(newModel)),
        newModel
      )
      setFormState(newFormState)
    }
    formState.on('change', change)
    return () => {
      formState.off('change', change)
    }
  }, deps)
  return formState
}

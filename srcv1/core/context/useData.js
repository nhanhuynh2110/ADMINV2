import _ from 'lodash'
import { useContext } from 'react'
import { Context } from './provider'

export default subscribed => {
  const { dataSetter, data } = useContext(Context)

  const subscribedData = _.mapValues(subscribed, (v, k) => data[k] || v)

  return [subscribedData, dataSetter]
}

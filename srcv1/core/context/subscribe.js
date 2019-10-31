import React, { useMemo } from 'react'
import _ from 'lodash'
import useData from './useData'

export default subscribed => WrappedComponent => props => {
  const [data, dataSetter] = useData(subscribed)
  const deps = _.values(data)
  return useMemo(
    () => <WrappedComponent data={data} dataSetter={dataSetter} {...props} />,
    deps
  )
}

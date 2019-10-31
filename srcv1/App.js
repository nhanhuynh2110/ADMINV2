import React from 'react'
import ReactDom from 'react-dom'

import Provider from './core/context/provider'
import {APIUser} from './api'
import App from './container/app'

const Application = () => {
  const [data, setData] = React.useState()
  React.useEffect(() => { APIUser.getAccount().then(resp => setData({...resp.data})) }, [])

  if (!data) return null
  return <Provider data={data}>
    <App />
  </Provider>
}

ReactDom.render(<Application />, document.getElementById('app'))

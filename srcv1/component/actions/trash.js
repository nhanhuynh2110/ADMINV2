import React from 'react'

export default ({api, reload, data}) => {
  const onClick = (action) => {
    if (action === 'ACTIVE') api.update({isDelete: false, id: data._id}).then(reload)
    else if (action === 'DELETE') api.delete({id: data._id}).then((data) => {
      // console.log('data', data)
    })
  }
  return <div>
    <a onClick={() => onClick('ACTIVE')}>active</a>
    <a onClick={() => onClick('DELETE')}>remove</a>
  </div>
}
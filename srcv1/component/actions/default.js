import React from 'react'
import {Link} from 'react-router-dom'

export default ({api, reload, data, link}) => {
  const onClick = (action = {}) => {
    api.update({...action, id: data._id}).then(() => reload())
  }
  return <div>
    <a onClick={() => onClick({isActive: !data.isActive})}><i className={`fa ${data.isActive ? 'fa-check' : 'fa-ban'}`} /></a>
    <a onClick={() => onClick({isDelete: !data.isDelete})}><i className='fa fa-trash-o' /></a>
    <Link to={link}><i className='fa fa-pencil' /></Link>
  </div>
}
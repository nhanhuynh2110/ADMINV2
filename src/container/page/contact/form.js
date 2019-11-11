/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import STORELINK from '../../../helper/link'
import useReactRouter from 'use-react-router'
import { withContainer } from '../../../context'

const LINK = STORELINK.CONTACTLINK

const Detail = forwardRef((props, ref) => {
  const {api} = props
  const { match } = useReactRouter()
  const {id} = match.params
  const [data, setData] = React.useState(null) 
  useEffect(() => {
    api.contact.get({id}, (err, resp) => {
      console.log('resp', resp)
      if (err) return
      setData({ ...resp })
    })
  }, [])
  return <section className='invoice'>
    <div className='row'>
      <div className='col-xs-12'>
        <h2 className='page-header'>
          <i className='fa fa-globe'></i>&nbsp; &nbsp;{data && data.subject}
          <small className='pull-right'>
            Date:&nbsp; &nbsp;
            {data ? <>
              {(new Date(data.createDate)).toLocaleString('vi-VN', { dateStyle: 'medium' })}
              &nbsp; &nbsp;
              {(new Date(data.createDate)).toLocaleString('en-EN', { timeZone: 'UTC', timeStyle: 'short', hour12: true })}
            </>
            : ''}
          </small>
        </h2>
      </div>
    </div>
    <div className='row'>
      <div className='col-sm-12' style={{ fontSize: '14px'}}>
        <strong>Name: </strong><span>&nbsp; &nbsp;{data && data.name}</span><br />
        <strong>Email: </strong><span>&nbsp; &nbsp;{data && data.email}</span><br />
        <strong>Phone: </strong><span>&nbsp; &nbsp;{data && data.phone}</span><br />
        <strong>Message: </strong><span>&nbsp; &nbsp;{data && data.message}</span><br />
      </div>
    </div>
    <br />
    <br />
    <br />
    <div className='row no-print'>
      <div className='col-xs-12'>
        <a href={LINK.GRID} className='btn btn-default'><i className='fa fa-cancle'></i> Back</a>
      </div>
    </div>
  </section>
})

export default withContainer(React.memo(Detail), (c, props) => ({
  api: c.api
}))

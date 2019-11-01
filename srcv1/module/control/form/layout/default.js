import React from 'react'
import {Link} from 'react-router-dom'
import Box from '../../box'
import Row from '../../row'


export default ({className, title = 'create', cancle, formValid = false, children}) => {
  const contentFooter = () => {
    return <React.Fragment>
      <div className='pull-left'>
        <Link to={cancle} className='btn btn-danger btn-xs'>Cancle</Link>
      </div>
      <div className='pull-right'>
        <input className='btn btn-success btn-xs' disabled={!formValid} type='submit' value='Save' />
      </div>
    </React.Fragment>
  }

  return <React.Fragment>
    <section className='content'>
      <Row.Col12 useRow>
        <Box
          className='box-success'
          title={title}
          footerContent={contentFooter()}>
          {children}
        </Box>
      </Row.Col12>
    </section>
  </React.Fragment>
}

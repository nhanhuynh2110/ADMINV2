import React from 'react'
import Row from './row'
import Col from './col'
Row.Col1 = ({children, ...other}) => <Col {...other} className='col-md-1'>{children}</Col>
Row.Col2 = ({children, ...other}) => <Col {...other} className='col-md-2'>{children}</Col>
Row.Col3 = ({children, ...other}) => <Col {...other} className='col-md-3'>{children}</Col>
Row.Col4 = ({children, ...other}) => <Col {...other} className='col-md-4'>{children}</Col>
Row.Col5 = ({children, ...other}) => <Col {...other} className='col-md-5'>{children}</Col>
Row.Col6 = ({children, ...other}) => <Col {...other} className='col-md-6'>{children}</Col>

Row.Col7 = ({children, ...other}) => <Col {...other} className='col-md-7'>{children}</Col>
Row.Col8 = ({children, ...other}) => <Col {...other} className='col-md-8'>{children}</Col>
Row.Col9 = ({children, ...other}) => <Col {...other} className='col-md-9'>{children}</Col>
Row.Col10 = ({children, ...other}) => <Col {...other} className='col-md-10'>{children}</Col>
Row.Col11 = ({children, ...other}) => <Col {...other} className='col-md-11'>{children}</Col>
Row.Col12 = ({children, ...other}) => <Col {...other} className='col-md-12'>{children}</Col>

export default Row
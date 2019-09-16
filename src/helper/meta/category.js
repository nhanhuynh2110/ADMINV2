import React from 'react'
import LINKSTORE from '../link'
import { formatDate } from '../utility'
import { withContainer } from '../../context'

class Order extends React.PureComponent {
  constructor (props) {
    super(props)
    this.updateOrder = this.updateOrder.bind(this)
    this.myRef = React.createRef()
  }
  updateOrder (id) {
    let {getData, api} = this.props
    let value = this.myRef.current.value.trim()
    if (!value) return false

    api.category.updateOrder({id: id, value: value}, (err, data) => {
      if (err) return alert('update order fail')
      getData()
    })
  }
  componentDidUpdate () {
    if (this.props.data.order) this.myRef.current.value = this.props.data.order
    else this.myRef.current.value = ''
  }

  render () {
    const {data} = this.props
    return (
      <div className='input-group grid-input-group grid-input-group'>
        <input type='text' className='form-control' defaultValue={data.order} ref={this.myRef} />
        <span data-id={data._id} className='input-group-addon' onClick={this.updateOrder.bind(this, data._id)}><i className='fa fa-check' /></span>
      </div>
    )
  }
}

const OrderContainer = withContainer(React.memo(Order), (c, props) => ({
  api: c.api,
  ...props
}))

const LINK = LINKSTORE.CATEGORYLINK
let PAGE_HEADER = { title: 'Category', link: LINK.ADD }
let ACTIONLINK = {
  EDIT: LINK.GRID
}

let TABLEVIEW = (self) => {
  return {
    index: { text: 'STT', sorted: false, col: null, render: (row) => {} },
    order: {
      text: 'Order',
      sorted: true,
      col: 'order',
      render: (row, getData) => {
        return <OrderContainer data={row} getData={getData} />
      }
    },
    title: { text: 'Title', sorted: true, col: 'title', render: (row) => row['title'] },
    createDate: { text: 'Create date', sorted: true, col: 'create_date', render: (row) => { return row['createDate'] ? formatDate(row['createDate']) : '' } },
    updateDate: { text: 'Last Update Date', sorted: true, col: 'updatedate', render: (row) => row['updateDate'] ? formatDate(row['updateDate']) : '' },
    activeDate: { text: 'Last active date', sorted: true, col: 'activeDate', render: (row) => row['activeDate'] ? formatDate(row['activeDate']) : '' },
    action: { text: 'Action', sorted: false, col: null, className: 'tool-action', render: (row) => { return self.renderAction(row, '') } }
  }
}

export default {
  ACTIONLINK,
  PAGE_HEADER,
  TABLEVIEW
}

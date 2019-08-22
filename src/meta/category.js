import { CATEGORYLINK } from '../helper/link'
import { formatDate } from '../helper/utility'

let PAGE_HEADER = { title: 'Category', link: CATEGORYLINK.ADD }
let ACTIONLINK = {
  EDIT: '/category/'
}

let TABLEVIEW = (self) => {
  return {
    index: { text: 'STT', sorted: false, col: null, render: (row) => {} },
    title: { text: 'Title', sorted: true, col: 'title', render: (row) => row['title'] },
    createDate: { text: 'Create date', sorted: true, col: 'create_date', render: (row) => { return row['create_date'] ? formatDate(row['create_date']) : '' } },
    updateDate: { text: 'Last Update Date', sorted: true, col: 'update_date', render: (row) => { return row['update_date'] ? formatDate(row['update_date']) : '' } },
    activeDate: { text: 'Last active date', sorted: true, col: 'active_date', render: (row) => { return row['active_date'] ? formatDate(row['active_date']) : '' } },
    action: { text: 'Action', sorted: false, col: null, className: 'tool-action', render: (row) => { return self.renderAction(row, '') } }
  }
}

export default {
  ACTIONLINK,
  PAGE_HEADER,
  TABLEVIEW
}

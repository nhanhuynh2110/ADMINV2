import React from 'react'

class Pages extends React.PureComponent {
  render () {
    const { currentPage, total, pageSize, enableEntries, changePage } = this.props
    var count = Math.ceil(parseInt(total) / parseInt(pageSize))
    var pages = []
    const pageNumber = parseInt(currentPage)
    var pre = (pageNumber > 1) ? pageNumber - 1 : 1
    var next = (pageNumber < count) ? pageNumber + 1 : count

    let start = 1
    if (pageNumber > 3) {
      start = pageNumber - 2
    }

    if (count > 2) pages.push(<li key='first' data-page={1} onClick={changePage} className='paginate_button previous'><a>First</a></li>)
    pages.push(<li key='pre' data-page={pre} onClick={changePage} className='paginate_button previous'><a>{'<'}</a></li>)

    for (var i = start; i <= count; i++) {
      if (pageNumber + 3 === i) break
      var active = i === pageNumber ? 'paginate_button active' : 'paginate_button'
      pages.push(<li key={i} data-page={i} onClick={changePage} className={active}><a>{i}</a></li>)
    }

    pages.push(<li key='next' data-page={next} onClick={changePage} className='paginate_button previous'><a>{'>'}</a></li>)
    if (count > 2) pages.push(<li key='last' data-page={count} onClick={changePage} className='paginate_button previous'><a>Last</a></li>)
    return (
      <div className='row'>
        {
          (enableEntries) ? <div className='col-sm-5'><div className='dataTables_info' role='status' aria-live='polite'>Total {total} entries</div></div> : ''
        }
        <div className={enableEntries ? 'col-sm-7' : 'col-sm-12'}>
          <div className='dataTables_paginate paging_simple_numbers pagging-react'>
            <ul className='pagination'>
              {pages}
            </ul>
          </div>
        </div>
        <div className='clearfix' />
      </div>
    )
  }
}
export default Pages

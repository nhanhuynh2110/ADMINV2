import React from 'react'
import Tabs from './tabs'
import filterDf from './filter'
import GridLayout from './layout'
import {TableBasic} from '../table'
import Entries from './entries'
import SearchBox from './searchBox'
import Paging from '../paging'

const Grid = ({ title, link, linkAdd, tabs, model, api, loadData, updateData, initFilter = filterDf }) => {
  const [filter, setFilter] = React.useState(initFilter)
  const [data, setData] = React.useState()
  const [tabActive, setTabActive] = React.useState(tabs[0])
  
  const hadleTab = (tab) => {
    setTabActive(tab)
    foreUpdate(tab.on(filter))
  }

  const handleEntries = (e) => foreUpdate({...filter, pageSize: e.target.value, pageNumber: 1})

  const handleSearch = (value) => foreUpdate({...filter, strKey: value, pageNumber: 1})

  const changePage = (pageNumber) => foreUpdate({...filter, pageNumber})

  const foreUpdate = (newFilter) => {
    setFilter(newFilter)
    getData(newFilter)
  }

  const getData = (opts) => api.get(opts).then(data => setData(data.data))

  React.useEffect(() => {
    getData(filter)
  }, [])
  
  if (!data) return null
  let ComponentActions = _.get(tabActive, 'actions', null)
  return <GridLayout title={title} link={linkAdd}>
    <Tabs options={tabs} onChange={hadleTab} active={tabActive} />
    <div className='tab-content'>
      <div className='tab-pane active' >
        <div className='box-body'>
          <div className='dataTables_wrapper form-inline dt-bootstrap'>
            <div className='row'>
              <div className={'col-sm-6'}>
                <Entries onChange={handleEntries} />
              </div>
              <div className={'col-sm-6'}>
                <SearchBox onChange={handleSearch} />
              </div>
              <div className='box-body'>
                <TableBasic 
                  data={data.list}
                  model={model}
                  actions={(dt) => ComponentActions ? <ComponentActions
                    data={dt}
                    api={api}
                    reload={() => getData(filter)}
                    link={`${link}/${data._id}`}
                  /> : null}
                />
              </div>
              <Paging
                changePage={changePage}
                total={data.total || 0}
                currentPage={filter.pageNumber}
                pageSize={filter.pageSize}
              />
          </div>
          </div>
        </div>
      </div>
    </div>
  </GridLayout>
}

Grid.filter = filterDf
export default Grid

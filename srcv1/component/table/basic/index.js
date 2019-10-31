import React from 'react'
import DataTable from '../../../core/dataTable/dataTable'

export default ({data, model, actions = null}) => {
  const table = new DataTable(model, data)
  return (
    <table className='table table-bordered table-striped'>
      <thead>
        <tr>
          {table.mapHeader((label, name) => <th className='sort-default' key={name}>{label}</th>)}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {table.mapRows((r, _id) => {
          return <tr key={r._id}>
            {r.mapColumn((value, name) => <td key={name}>{value}</td>)}
            {actions && <td className='tool-action'>{actions(r.data)}</td>}
          </tr>
        })}
      </tbody>
    </table>
  )
}

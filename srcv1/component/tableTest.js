import React, { useState, useCallback } from 'react'

const renderHeaderCheckbox = (row, mode, checked, onSelect) => {
  switch (mode) {
    case 'single':
      return <td />
    case 'multiple':
      return (
        <td>
          <input type='checkbox' onChange={onSelect} checked={checked} />
        </td>
      )
    default:
      return null
  }
}

const renderCheckbox = (row, mode, checked, onSelect) => {
  switch (mode) {
    case 'single':
      return (
        <td>
          <input
            type='radio'
            name='row'
            onChange={onSelect}
            value={row.id.toString()}
            checked={checked}
          />
        </td>
      )
    case 'multiple':
      return (
        <td>
          <input
            type='checkbox'
            name='row'
            onChange={onSelect}
            value={row.id.toString()}
            checked={checked}
          />
        </td>
      )
    default:
      return null
  }
}

export default ({
  model,
  selectMode,
  selected = [],
  onSelect,
  filter,
  sort
}) => {
  const [selectedIDs, setSelectedIDs] = useState(selected)

  model.setFilter(filter)
  model.setSort(sort)

  const selectAll = useCallback(
    e => {
      const {
        target: { checked }
      } = e

      if (checked) {
        const newSelectedIDs = model.rows.map(r => r.id.toString())
        change(newSelectedIDs)
      } else {
        change([])
      }
      change()
    },
    [selectedIDs.length]
  )

  const selectSingle = useCallback(
    e => {
      const { target, currentTarget } = e
      const { dataset } = currentTarget

      const isCheckbox = target.type === 'checkbox' || target.type === 'radio'
      if (!isCheckbox) e.stopPropagation()

      const checked = isCheckbox ? target.checked : dataset.checked !== 'true'
      const value = isCheckbox ? target.value : dataset.value

      if (!checked && selectedIDs.includes(value)) {
        const newSelectedIDs = selectedIDs.filter(id => id !== value)
        change(newSelectedIDs)
      } else if (checked && !selectedIDs.includes(value)) {
        const newSelectedIDs = [...selectedIDs, value]
        change(newSelectedIDs)
      }
    },
    [selectedIDs.length]
  )

  const change = newSelectedIDs => {
    if (typeof onSelect === 'function') {
      const selectedRows = model.rows.filter(r =>
        newSelectedIDs.includes(r.id.toString())
      )
      onSelect(selectedRows)
    }
    setSelectedIDs(newSelectedIDs)
  }

  return (
    <table width='100%' border={1}>
      <thead>
        <tr>
          {renderHeaderCheckbox(
            model.header,
            selectMode,
            selectedIDs.length === model.length,
            selectAll
          )}
          {model.mapHeader((label, name) => (
            <th key={name}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {model.mapRows((r, id) => {
          const checked = selectedIDs.includes(id.toString())
          return (
            <tr
              key={id}
              className={checked ? 'active' : ''}
              onClick={selectSingle}
              data-value={r.id.toString()}
              data-checked={checked}
            >
              {renderCheckbox(r, selectMode, checked, selectSingle)}
              {r.mapColumn((value, name) => {
                return <td key={name}>{value}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

import * as React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import classnames from 'classnames'
import styled from 'styled-components'
import { sortBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faSort } from '@fortawesome/free-solid-svg-icons'

import {
  Button,
  Table as BootstrapTable,
} from 'react-bootstrap'

type FieldT = {
  name: string,
  attr: string,
  sortable?: boolean,
}

type ExportT = {
  allowed?: boolean,
  fileName?: string,
  text?: string,
}

interface PropsT {
  defaultSort?: string
  exportInfo?: ExportT
  fields: Array<FieldT>
  items: Array<any>
}

interface StateT {
  sortKey?: string
  sortedItems?: Array<any>
}

const StyledSortIcon = styled.div`
flex: 1;
text-align: right;

svg.selected {
  color: var(--bs-blue);
}
`

const HeaderDiv = styled.div`
display: flex;
`

const ExportButton = styled(Button)`
svg {
  margin-left: 1em;
}
`

const Table: React.FC<PropsT> = (props) => {
  const {
    defaultSort,
    exportInfo = {},
    fields,
    items,
  } = props

  const INIT_STATE = {
    sortKey: defaultSort,
    sortedItems: items,
  }

  const reducer = (state: StateT, update: StateT) => ({ ...state, ...update })
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  React.useEffect(() => {
    if (state.sortKey) {
      dispatch({ sortedItems: sortBy(items, state.sortKey) })
    }
  }, [state.sortKey, items])

  const handleSort = (sortKey: string) => {
    dispatch({ sortKey })
  }

  const SortIcon = ({ field }: { field: FieldT}) => {
    return (
      <StyledSortIcon>
        <FontAwesomeIcon className={classnames({ selected: state.sortKey === field.attr })} icon={faSort} onClick={() => handleSort(field.attr)}/>
      </StyledSortIcon>
    )
  }

  const csvData = (): Array<Array<string>> => {
    const array = []

    array.push(fields.map(header => header.name))
    state.sortedItems.forEach(entry => {
      array.push(fields.map(field => entry[field.attr]))
    })

    return array
  }

  const exportToExcel = () => {
    if (!exportInfo.allowed) return

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fullFileName = `${exportInfo.fileName}.xlsx`
    const ws = XLSX.utils.json_to_sheet(csvData(), { skipHeader: true })
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], {type: fileType})
    FileSaver.saveAs(data, fullFileName)
  }

  return (
    <React.Fragment>
      { exportInfo.allowed && (
        <ExportButton variant="link" onClick={exportToExcel}>
          {exportInfo.text}
          <FontAwesomeIcon icon={faFileExport}/>
        </ExportButton>
      )}
      <BootstrapTable bordered>
        <thead>
          <tr>
            { fields.map((field, index: number) => (
              <th key={index}>
                <HeaderDiv>
                  {field.name}{ field.sortable && <SortIcon field={field} />}
                </HeaderDiv>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { state.sortedItems.map(item => (
            <tr key={item.id}>
              { fields.map((field, index: number) => (
                <td key={index}>{item[field.attr]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </React.Fragment>
  )
}

export default Table

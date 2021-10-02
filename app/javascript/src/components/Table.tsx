import * as React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import { sortBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

import {
  Table as BootstrapTable,
} from 'react-bootstrap'

type FieldT = {
  name: string,
  attr: string,
  sortable?: boolean,
}

interface PropsT {
  defaultSort?: string
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

const Table: React.FC<PropsT> = (props) => {
  const {
    defaultSort,
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

  return (
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
  )
}

export default Table

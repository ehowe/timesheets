import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import { slice, times } from 'lodash'

type PropsT = {
  items: Array<any>,
  navElement?: string,
  perPage?: number,
  render: (args: any) => {},
}

const Pagination: React.FC<PropsT> = (props: PropsT) => {
  const {
    navElement = 'body',
    items,
    perPage = 10,
    render,
  } = props

  const reducer = (state: any, update: any) => ({ ...state, ...update })

  const INIT_STATE = {
    activePageItems: [],
    currentPage: 1,
    totalPages: 0,
  }

  const [state, dispatch] = React.useReducer(reducer, INIT_STATE)

  React.useEffect(() => {
    dispatch({ totalPages: Math.floor(items.length / perPage) })
  }, [items, perPage])

  React.useEffect(() => {
    const startIndex = (state.currentPage - 1) * perPage
    const endIndex = startIndex + perPage

    dispatch({ activePageItems: slice(items, startIndex, endIndex) })
  }, [items, state.currentPage, perPage])

  const handlePageChange = (e: any) => {
    dispatch({ currentPage: parseInt(e.target.text) })
  }

  const paginationLinks = times(state.totalPages, (page: number) => (
    <li key={page} className={classnames('page-item', { active: page + 1 === state.currentPage })} onClick={handlePageChange}>
      <a className="page-link">{page + 1}</a>
    </li>
  ))

  const NavLinks = () => {
    return ReactDom.createPortal(
      <nav>
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          { paginationLinks }
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>,
      document.querySelector(navElement),
    )
  }

  return (
    <React.Fragment>
      { state.activePageItems.map((item: any) => render(item)) }
      <NavLinks />
    </React.Fragment>
  )
}

export default Pagination

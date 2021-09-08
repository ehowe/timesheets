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

  const [activePageItems, setActivePageItems] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)

  React.useEffect(() => {
    setTotalPages(Math.floor(items.length / perPage))
  }, [items, perPage])

  React.useEffect(() => {
    const startIndex = (currentPage * perPage) - 1
    const endIndex = startIndex + perPage

    setActivePageItems(slice(items, startIndex, endIndex))
  }, [items, currentPage, perPage])

  const handlePageChange = (e: any) => {
    setCurrentPage(parseInt(e.target.text))
  }

  const paginationLinks = times(totalPages, (page: number) => (
    <li key={page} className={classnames('page-item', { active: page + 1 === currentPage })} onClick={handlePageChange}>
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
      { activePageItems.map((item: any) => render(item)) }
      <NavLinks />
    </React.Fragment>
  )
}

export default Pagination

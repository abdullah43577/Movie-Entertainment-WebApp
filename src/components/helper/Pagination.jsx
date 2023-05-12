import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

export default function Pagination({ itemsPerPage, totalPageNumber, onPageChange, currentPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const endOffset = (itemsPerPage * currentPage) % totalPageNumber;
        setPageCount(totalPageNumber);
      } catch (err) {
        console.error(err);
      }
    };
  }, [currentPage, itemsPerPage, totalPageNumber]);

  const handlePageClick = (selected) => {
    const selectedPage = selected.selected + 1;
    console.log(`User requested page number ${selectedPage}`);
    onPageChange(selectedPage);
  };

  return (
    <>
      {/* render items here */}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

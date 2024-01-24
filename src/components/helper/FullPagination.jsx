import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@react-hook/media-query";
import { useState } from "react";
import Loader from "./Loader";

export default function Pagination({ moviesArr, isLoading }) {
  const isSmallScreen = useMediaQuery("(max-width:480px)");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const lastPage = currentPage + itemsPerPage;
  const currentItems = moviesArr?.slice(currentPage, lastPage);
  const pageCount = Math.ceil(moviesArr?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % moviesArr?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCurrentPage(newOffset);
  };

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className="genreMovie">{currentItems}</div>
      )}

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={isSmallScreen ? 1 : 3}
        marginPagesDisplayed={isSmallScreen ? 1 : 2}
        pageCount={pageCount}
        previousLabel={isSmallScreen ? "< prev" : "< previous"}
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
        disabledClassName="disabled"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

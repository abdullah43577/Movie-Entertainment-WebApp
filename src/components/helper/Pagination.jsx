import ReactPaginate from "react-paginate";
import { useMediaQuery } from "@react-hook/media-query";

export default function Pagination({ totalPageNumber, handlePageClick }) {
  const isSmallScreen = useMediaQuery("(max-width:480px)");

  return (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={isSmallScreen ? 1 : 3}
      marginPagesDisplayed={isSmallScreen ? 1 : 2}
      pageCount={totalPageNumber}
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
  );
}

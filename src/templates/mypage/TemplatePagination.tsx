import "./templatePagination.css";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";

interface TemplatePaginationProps {
  pageName: string;
  page: number;
  setPage: (value: number) => void;
  numPages: number;
}

const TemplatePagination = ({
  pageName,
  page,
  setPage,
  numPages,
}: TemplatePaginationProps) => {
  return (
    <section className={`mypage-template-pagination ${pageName}-pagination`}>
      <nav className="mypage-template-pagination-container">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="mypage-template-pagination-pageController"
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="mypage-template-pagination-pageController"
        >
          <FiChevronLeft />
        </button>
        {numPages
          ? Array(numPages)
              .fill("_")
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={
                    page === i + 1
                      ? "mypage-template-pagination-pageNum active"
                      : "mypage-template-pagination-pageNum"
                  }
                >
                  {i + 1}
                </button>
              ))
          : 1}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === numPages || !numPages}
          className="mypage-template-pagination-pageController"
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => setPage(numPages)}
          disabled={page === numPages || !numPages}
          className="mypage-template-pagination-pageController"
        >
          <FiChevronsRight />
        </button>
      </nav>
    </section>
  );
};

export default TemplatePagination;

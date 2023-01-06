import styles from './Pagination.module.scss';

type TProps = {
  pageSize: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
};

function Pagination({ pageSize, itemsCount, onPageChange, currentPage }: TProps) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  //   if (pageCount === 1) return null;
  const pages = new Array(pageCount).fill(1).map((i: number, index) => (i += index));

  return (
    <nav>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={`page_${page}`}>
            <button
              type="button"
              className={`${styles.pagination_btn} ${page === currentPage ? styles.bgBlue : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;

import { useState } from 'react';

const Pagination = ({ offset, setOffset }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pages] = useState([1, 2, 3]);

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      setOffset(offset + 5);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset - 5);
    }
  }

  const handlePagination = page => {
    setCurrentPage(page);
    setOffset((page - 1) * 5);
  }

  return (
    <div className='mb-3'>
      <ul className='pagination pagination-lg justify-content-center'>
        <li className='page-item'>
          <button className='page-link text-success' onClick={handlePrevious}>&laquo;</button>
        </li>
        {pages.map(page => (
          <li key={page}>
            {page === currentPage &&
              <button className='page-link bg-success border-success text-white'>{page}</button>}
            {page !== currentPage &&
              <button className='page-link text-success' onClick={() => handlePagination(page)}>{page}</button>}
          </li>
        ))}
        <li className='page-item'>
          <button className='page-link text-success' onClick={handleNext}>&raquo;</button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;

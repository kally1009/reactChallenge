const Pagination = ({ resultsPerPage, length, currentPage, previousPage, nextPage}) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / resultsPerPage); i++) {
        paginationNumbers.push(i);
    }
    
    return (
        <>
            <div className='pagination-container'>
                <button className='nav-btn' onClick={previousPage}>Previous</button>
                <p> {currentPage}/{paginationNumbers.length}</p>
                <button className='nav-btn' onClick={nextPage}>Next</button>
            </div>
        </>
        
    );
};
export default Pagination;
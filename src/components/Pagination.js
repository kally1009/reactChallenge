const Pagination = ({ resultsPerPage, length, currentPage, previousPage, nextPage}) => {
    const paginationNumbers = [];

    console.log("length is",length)

    for (let i = 1; i <= Math.ceil(length / resultsPerPage); i++) {
        paginationNumbers.push(i);
    }
    console.log(paginationNumbers)
    return (
        <>
            <div className='pagination-container'>
                <button onClick={previousPage}>Previous</button>
                <p> {currentPage}/{paginationNumbers.length}</p>
                <button onClick={nextPage}>Next</button>
            </div>
        </>
        
    );
};
export default Pagination;
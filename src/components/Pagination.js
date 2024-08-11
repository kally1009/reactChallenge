const Pagination = ({ resultsPerPage, length}) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / resultsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <div className='pagination'>
            {paginationNumbers.map((pageNumber) => (
                <p> {pageNumber} / {length}</p>
    ))}
        </div>
    );
};
export default Pagination;
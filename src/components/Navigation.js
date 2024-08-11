import NumericInput from "react-numeric-input";
const Navigation = ({results}) => {
    const [resultsPerPage, setResultsPerPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);
    const isPreviousDisabled = currentPage<=1? true: false;
    
    return(
        <>
            <div>
                
                <button onClick={()=> setCurrentPage(currentPage-1)} disabled={isPreviousDisabled}>Previous</button>
                <Pagination resultsPerPage={resultsPerPage} length={results.length} currentPage={currentPage}/>
                <button>Next</button>
                <div>
                    <p>Rows Per Page</p>
                    <NumericInput min={1} max={10} onChange={(value) => setResultsPerPage(value)} />
                </div>
                
            </div>
        </>
    )
}

const Pagination = ({ resultsPerPage, length, currentPage}) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / resultsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <div className='pagination'>
            {paginationNumbers.map((pageNumber) => (
        <button
            key={pageNumber}
            className={currentPage === pageNumber? 'active' : ''}
        >
            {pageNumber}
        </button>
    ))}
        </div>
    );
};

export default Navigation
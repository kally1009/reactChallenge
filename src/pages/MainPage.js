import Search from '../components/Search'
import Table from '../components/Table'
import Navigation from '../components/Navigation'

const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
};

const MainPage = () =>{
    const [results,setResults] = useState([]);
    return (
        <>
            <h1>Starwars Characters</h1>
            <Search setResults={setResults}/>
            <Pagination
                length={posts.length}
                postsPerPage={postsPerPage}
                handlePagination={handlePagination}
                />
            <Navigation/>
            <Table results={results}/>
        </>
    );
}

export default MainPage
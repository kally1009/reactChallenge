import { useState, useEffect } from 'react';
import axios from 'axios'
import NumericInput from "react-numeric-input";
import Search from '../components/Search'
import Table from '../components/Table'
import Pagination from '../components/Pagination';

const MainPage = () => {
    const [results,setResults] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: response} = await axios.get(`https://swapi.dev/api/people`);
                setResults(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };
        fetchData()
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(4);
    
    const indexOfLastPost = currentPage * resultsPerPage;
    const indexOfFirstPost = indexOfLastPost - resultsPerPage;
    
    
    const previousPage = () => {
        if (currentPage!== 1){
            setCurrentPage(currentPage-1);
        }
    };

    const nextPage = () => {
        if (currentPage !==Math.ceil(results.length/resultsPerPage)){
            setCurrentPage(currentPage+1)
        }
    };

    return (
        <>
            <h1 className="page-title">Starwars Characters</h1>
            <Search results={results} setResults={setResults}/>
            <div className="nav-container">
                <Pagination 
                    resultsPerPage={resultsPerPage}
                    length={results.length}
                    currentPage={currentPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
                <div>
                    <p>Rows Per Page</p>
                    <NumericInput min={1} max={10} onChange={(value) => setResultsPerPage(value)} />
                </div>
            </div>
            
            <Table results={results}/>
        </>
    );
}

export default MainPage
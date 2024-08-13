import { useState, useEffect } from 'react';
import axios from 'axios'
import NumericInput from "react-numeric-input";
import Search from '../components/Search'
import Table from '../components/Table'
import Pagination from '../components/Pagination';

const MainPage = () => {
    const [results,setResults] = useState([]);
    const [loading, setLoading] = useState(true)
    const [next, setNext] = useState('')
    const [filteredResults, setFilteredResults] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: response} = await axios.get(`https://swapi.dev/api/people`);
                setResults(response.results)
                setNext(response.next)
                
            } catch (error) {
                console.error(error)
            }

        };
        fetchData()
    }, []);

    //scroll through api pagination
    useEffect(() => {
        if (next===null){
            setLoading(false);
            return;
        }
        const fetchNextData = async () => {
            try {
                const {data: response} = await axios.get(next);
                const resResults = response.results
                const resNext = response.next
                const newResults = Array.from(results)
                newResults.push(...resResults)
                setResults(newResults)
                setFilteredResults(newResults)
                setNext(resNext)
                
            } catch (error) {
                console.error(error)
            }
            
        };
        fetchNextData()
    }, [next,results])

    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);
    
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
            <h1 className="page-title">STARWARS CHARACTERS</h1>
            <Search results={results} setNewResults={setFilteredResults}/>
            {!loading && <div className="nav-container">
            <Pagination 
                    resultsPerPage={resultsPerPage}
                    length={results.length}
                    currentPage={currentPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
                <div className='num-results'>
                    <p>Rows Per Page</p>
                    <NumericInput min={1} max={10} onChange={(value) => setResultsPerPage(value)}  className='num-input' />
                </div>
            </div>}
            
            <Table results={currentResults} indexFirst={indexOfFirstResult}/>
        </>
    );
}

export default MainPage
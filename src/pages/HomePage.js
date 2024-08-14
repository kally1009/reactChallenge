import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom';


const fetchPaginatedData = async (url) => {
  let results = [];
  let nextUrl = url;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    results = results.concat(response.data.results);
    nextUrl = response.data.next;
  }

  return results;
};

const getHairColorStyle = (hairColor) => {
    switch (hairColor.toLowerCase()) {
      case 'blonde':
        return { color: 'yellow' };
      case 'blond':
        return { color: '#eadb1b' }
      case 'brown':
        return { color: 'brown' };
      case 'black':
        return { color: 'black' };
      case 'red':
        return { color: 'red' };
      default:
        return { color: 'gray' };
    }
  };

const HomePage = () => {
  const [people, setPeople] = useState([]);
  const [starships, setStarships] = useState({});
  const [homeworlds, setHomeworlds] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const peopleData = await fetchPaginatedData('https://swapi.dev/api/people/');

        // Extract starship URLs from all people
        const starshipUrls = peopleData.flatMap(person => person.starships);
        const uniqueStarshipUrls = [...new Set(starshipUrls)];

        const homeworldUrls = [...new Set(peopleData.map(person => person.homeworld))];

        // Fetch starships data
        const fetchStarships = async () => {
          const chunkSize = 10;
          let starshipData = {};
          
          for (let i = 0; i < uniqueStarshipUrls.length; i += chunkSize) {
            const chunk = uniqueStarshipUrls.slice(i, i + chunkSize);
            const starshipResponses = await Promise.all(chunk.map(url => axios.get(url)));
            starshipResponses.forEach(response => {
              starshipData[response.data.url] = response.data.name;
            });
          }
          
          return starshipData;
        };

        const starshipData = await fetchStarships();

        const fetchHomeworlds = async () => {
            let homeworldData = {};
  
            for (let url of homeworldUrls) {
              const response = await axios.get(url);
              homeworldData[url] = response.data.name;
            }
            
            return homeworldData;
          };
  
          const homeworldData = await fetchHomeworlds();
          
          const peopleWithIds = peopleData.map((person, index) => ({
            ...person,
            id: index + 1
          }));
          
          setPeople(peopleWithIds);
          setFilteredResults(peopleWithIds)
          setStarships(starshipData);
          setHomeworlds(homeworldData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchData();
  }, []);

  

  // Handle pagination
  const paginatedPeople = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const getUniqueId = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <p>Loading...</p>;
  
  return (
    <>
    <h1 className="page-title">STARWARS CHARACTERS</h1>
    <Search results={people} setNewResults={setFilteredResults} setCurrentPage={setCurrentPage}/>
    <div>
    <div className="nav-container">
        <div>
            <button className='nav-btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </button> 
            <span> {currentPage} / {totalPages} </span>
            <button className='nav-btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            Next
            </button>
            <div className='num-results'>
                    <p>Rows Per Page</p>
                    <NumericInput min={1} max={10} onChange={(value) => setItemsPerPage(value)}  className='num-input' />
            </div>
        </div>

    </div>
    {!loading &&
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Hair Color</th>
            <th>Home World</th>
            <th>Gender</th>
            <th>Starships</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPeople.map((person,index) => (
            <tr key={person.id}>
              <td><Link to={`/details/${person.id}`}>{person.id}</Link></td>  
              <td>{person.name}</td>
              <td>{person.height}</td>
              <td style={getHairColorStyle(person.hair_color)}>{person.hair_color}</td>
              <td>{homeworlds[person.homeworld] || 'Unknown Homeworld'}</td>
              <td>{person.gender}</td>
              <td>
                <ul>
                  {person.starships.map(starshipUrl => (
                    <li key={starshipUrl}>
                      {starships[starshipUrl] || 'Unknown Starship'}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>
    </>
  );
};

export default HomePage;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [starshipData, setStarshipData] = useState({});
  const [homeworld, setHomeworld] = useState('');

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setPerson(response.data);
        
        // Fetch starships
        const starshipUrls = response.data.starships;
        const starshipResponses = await Promise.all(starshipUrls.map(url => axios.get(url)));
        const starshipNames = starshipResponses.reduce((acc, response) => {
          acc[response.data.url] = response.data.name;
          return acc;
        }, {});
        setStarshipData(starshipNames);

        // Fetch homeworld
        const homeworldResponse = await axios.get(response.data.homeworld);
        setHomeworld(homeworldResponse.data.name);
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };

    fetchPersonData();
  }, [id]);

  if (!person) return <p>Loading...</p>;

  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}</p>
      <p>Hair Color: {person.hair_color}</p>
      <p>Homeworld: {homeworld}</p>
      <p>Gender: {person.gender}</p>
      <h2>Starships</h2>
      <ul>
        {person.starships.map(starshipUrl => (
          <li key={starshipUrl}>
            {starshipData[starshipUrl] || 'Unknown Starship'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;

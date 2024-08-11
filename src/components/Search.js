import { IoMdSearch } from "react-icons/io"
const Search = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("https://swapi.dev/").then((response) => response.json).then(json => {
            const results = json.filter((character) => {
                return value && character && character.name && character.name.toLowerCase().includes(value);
                 
            });
            setResults(results);
        });
    };

    const handleClick = (value) => {
        setInput(value)
        fetchData (value)
    }
   return(
    <>
        <div>
            <div class="search-content">
                <IoMdSearch />
                <input type="text" placeholder="search" value={input}></input>
            </div>
            <button onClick={(e) => handleClick(e.target.value)}>SEARCH</button>
        </div>
    </>

   ) 
}

export default Search;
import { useState } from "react";
import { IoMdSearch } from "react-icons/io"

const Search = ({ results, setNewResults}) => {
    const [searchInput, setSearchInput] = useState('');
    
    
    const searchItems = () => {
        if(searchInput!==''){
            const filteredData = results.filter((item) => {
                return Object.values(item.name).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setNewResults(filteredData)
        }
        else {
            setNewResults(results)
            setSearchInput('')
        }
    }

   return(
    <>
        <div className="search-container">
            <div className="search-content">
                <IoMdSearch size={40}/>
                <input type="text" placeholder="search" className="search-bar" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}>
                
                </input>
            </div>
            <button className="search-button" onClick={() => searchItems()}>SEARCH</button>
        </div>
    </>

   ) 
}

export default Search;
import { Link } from "react-router-dom";

const Table = ({results, indexFirst}) => {
   
    return(
        <>
            <h3>Search Results list</h3>
            <div>
                <table>
                    <tr className="table-header table-row">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Hair Color</th>
                        <th>Home World</th>
                        <th>Gender</th>
                        <th>Starships</th>
                    </tr>
                    {results.map((val, key) => {
                        return (
                            <tr key={key} className="table-row">
                                <td ><Link to={'/details/'+(indexFirst+1+key)}>{(indexFirst+1)+key}</Link></td>
                                <td>{val.name}</td>
                                <td>{val.height}</td>
                                <td color={val.hair_color}>{val.hair_color}</td>
                                <td>{val.homeworld}</td>
                                <td>{val.gender}</td>
                                <td>{}</td>
                                
                            </tr>
                        )
                    })}
                </table>
                
            </div>
        </>
    )
};

export default Table


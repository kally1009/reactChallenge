import TableResult from "./TableResult";

const Table = ({results}) => {
   
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
                            <tr key={key+1} className="table-row">
                                <td>{key+1}</td>
                                <td>{val.name}</td>
                                <td>{val.height}</td>
                                <td>{val.hair_color}</td>
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


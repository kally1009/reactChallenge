import TableResult from "./TableResult";

const Table = ({results}) => {
    return(
        <>
            <h3>Search Results list</h3>
            <div>
                Where listings will be.
                {results.map((result, id) => {
                    return <TableResult result={result} key={id}/>
                })}
            </div>
        </>
    )
};

export default Table
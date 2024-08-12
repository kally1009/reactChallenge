const TableResult = ({ result }) => {
    return (
        <>
            <div> onClick={(e)=> console.log(`You clicked on ${result.name}`)} {result.name}</div>
        </>
        

    )
    
    
}

export default TableResult
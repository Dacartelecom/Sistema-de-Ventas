import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from "./table-row/TableRow";

const TableSales = () => {
    const sections = useSelector(state=>state.sections);

    return (
        <div className='table-container'>
            <TableRow />
            {sections?.map(section=>(
                <TableRow section={section} name={section?.name} key={section?.id} body={true}/>
            ))}
        </div>
    );
};

export default TableSales;
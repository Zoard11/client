import React, { useMemo } from "react";
import { useTable } from "react-table";
import { InterfaceInci } from "./Types";

type Props = {
  data: InterfaceInci[];
};

const columns = [{  
    Header: 'ID',  
    accessor: 'COSING Ref No',
   }
   ,{  
    Header: 'INCI name',  
    accessor: 'INCI name' ,
    }
   
   ,{  
   Header: 'INN name',  
   accessor: 'INN name' ,
   }
   ,{  
   Header: 'Ph. Eur. Name',  
   accessor: 'Ph. Eur. Name',
   },
   {  
    Header: 'CAS No',  
    accessor: 'CAS No',
    },
    {  
    Header: 'EC No',  
    accessor: 'EC No',
    },
    {  
    Header: 'Chem/IUPAC Name / Description',  
    accessor: 'Chem/IUPAC Name / Description',
    },
    {  
    Header: 'Restriction',  
    accessor: 'Restriction',
    },
    {  
    Header: 'Function',  
    accessor: 'Function',
    },
    {  
    Header: 'Update Date',  
    accessor: 'Update Date',
    }
]

function Table(props: Props) {
 
  const data = useMemo(() => props.data, [props.data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table className="table table-striped table-sm">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;

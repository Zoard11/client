import React, { useMemo } from "react";
import { useTable } from "react-table";
import { InterfaceInci } from "./Types";

type Props = {
  data: InterfaceInci[];
};

const columns = [{  
    Header: 'COSING Ref No',  
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
    },
    {  
      Header: 'Id',  
      accessor: 'Id',
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
      {/* <tr>
      
        </tr> */}
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
              <th>
              EDIT
              </th>
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
              <td>
                    button 
              </td>
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

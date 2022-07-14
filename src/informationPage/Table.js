import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import {useBetween} from 'use-between';
import {useShareableState} from './UseBetween';
import moment from 'moment';
import PropTypes from 'prop-types';

Table.propTypes = {
  data: PropTypes.array,
};

const columns = [
  {
    Header: 'COSING Ref No',
    accessor: 'COSING Ref No',
  },
  {
    Header: 'INCI name',
    accessor: 'INCI name',
  },

  {
    Header: 'INN name',
    accessor: 'INN name',
  },
  {
    Header: 'Ph. Eur. Name',
    accessor: d => d['Ph. Eur. Name'],
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
    accessor: d => moment(d['Update Date']).format('YYYY-MM-DD'),
  },
  {
    Header: 'Id',
    accessor: 'Id',
  },
];

function Table(props) {
  const data = useMemo(() => props.data, [props.data]);
  const {getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data,
  });

  const {setEditIngredientId, setDeleteIngredientId} =
    useBetween(useShareableState);

  const editButton = id => {
    setEditIngredientId(id);
  };

  const deleteButton = id => {
    setDeleteIngredientId(id);
  };

  return (
    <table className="table table-striped table-sm">
      <thead>
        {headerGroups.map(headerGroup => {
          const {key, ...restHeaderProps} = headerGroup.getHeaderGroupProps();

          return (
            <tr key={key} {...restHeaderProps}>
              {headerGroup.headers.map(column => {
                const {key, ...restColumnProps} = column.getHeaderProps();

                return (
                  <th key={key} {...restColumnProps}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => {
                const {key, ...restCellProps} = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
              {localStorage.getItem('permission') === 'admin' && (
                <>
                  <td>
                    <button
                      className="btn btn-default"
                      onClick={() => editButton(row.id)}>
                      <i className="bi bi-pencil-square"></i>Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => deleteButton(row.id)}>
                      <i className="bi bi-trash3-fill"></i>Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;

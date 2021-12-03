import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
const Table = ({data}) => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'Select',
            accessor: 'col1'
          },
          {
            Header: 'Name',
            accessor: 'col2'
          },
          {
            Header: 'Company',
            accessor: 'col3'
          },
          {
            Header: 'Quantity',
            accessor: 'col4', 
          },
          {
            Header: 'Time',
            accessor: 'col5' 
          },
          {
            Header: 'Status',
            accessor: 'col6' 
          },
          {
            Header: 'Delete',
            accessor: 'col7' 
          }
        ],
        []
      )

         
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })
    
      // Render the UI for your table
    return (
        <div>
             <div className='center'>
            <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        </Styles>
            </div>
        </div>
    );
};

export default Table;
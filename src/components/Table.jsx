import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTable } from '../redux/tableSlice';
import TableCell from './TableCell';
import './../styles/Table.css';

const Table = () => {
  const dispatch = useDispatch();
  const { columnHeaders, rowHeaders, cells } = useSelector((state) => state.table);

  useEffect(() => {
    const json = {
      table: {
        columnHeaders: { rows: 4, columns: 5 },
        rowHeaders: { rows: 20, columns: 5 },
        cells: { columns: 5, rows: 20 },
      },
    };
    dispatch(loadTable(json.table));
  }, [dispatch]);

  return (
    <div className="table-container">
      <table className="editable-table">
        <thead>
          {/* Render column headers */}
          {columnHeaders.map((row, rowIndex) => (
            <tr key={`col-header-row-${rowIndex}`}>
              {/* Empty cells for row header columns */}
              {[...Array(rowHeaders[0].length)].map((_, colIndex) => (
                <th key={`empty-col-header-${rowIndex}-${colIndex}`}></th>
              ))}
              {/* Column headers */}
              {row.map((header, colIndex) => (
                <th key={`col-header-${rowIndex}-${colIndex}`} className="column-header">
                  {header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {/* Render row headers */}
              {rowHeaders[rowIndex].map((header, colIndex) => (
                <th key={`row-header-${rowIndex}-${colIndex}`} className="row-header">
                  {header}
                </th>
              ))}
              {/* Render cells */}
              {row.map((cell, colIndex) => (
                <TableCell
                  key={`cell-${rowIndex}-${colIndex}`}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  value={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
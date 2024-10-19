import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCell } from '../redux/TableSlice';

const TableCell = ({ rowIndex, colIndex, value }) => {
  const dispatch = useDispatch();

  const handleCellChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      dispatch(updateCell({ rowIndex, colIndex, newValue }));
    }
  };

  return (
    <td>
      <input
        type="text"
        value={value}
        onChange={handleCellChange}
        className="table-cell-input"
      />
    </td>
  );
};

export default TableCell;

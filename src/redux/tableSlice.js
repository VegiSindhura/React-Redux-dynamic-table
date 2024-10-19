import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columnHeaders: [],
  rowHeaders: [],
  cells: [],
};

// Generates a table with multiple rows of column headers and multiple columns of row headers
const generateRandomTable = (columnHeadersRows, columnHeadersCols, rowHeadersRows, rowHeadersCols, cellRows, cellCols) => {
  const randomNumber = () => Math.floor(Math.random() * 1e10);

  // Generate multiple rows of column headers
  const columnHeaders = Array.from({ length: columnHeadersRows }, (_, rowIndex) =>
    Array.from({ length: columnHeadersCols }, (_, colIndex) => `col-header-${rowIndex}-${colIndex}`)
  );

  // Generate multiple columns of row headers
  const rowHeaders = Array.from({ length: rowHeadersRows }, (_, rowIndex) =>
    Array.from({ length: rowHeadersCols }, (_, colIndex) => `row-header-${rowIndex}-${colIndex}`)
  );

  // Generate random cell data
  const cells = Array.from({ length: cellRows }, () =>
    Array.from({ length: cellCols }, () => randomNumber())
  );

  return { columnHeaders, rowHeaders, cells };
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    loadTable: (state, action) => {
      const { columnHeaders, rowHeaders, cells } = generateRandomTable(
        action.payload.columnHeaders.rows,
        action.payload.columnHeaders.columns,
        action.payload.rowHeaders.rows,
        action.payload.rowHeaders.columns,
        action.payload.cells.rows,
        action.payload.cells.columns
      );

      state.columnHeaders = columnHeaders;
      state.rowHeaders = rowHeaders;
      state.cells = cells;
    },
    updateCell: (state, action) => {
      const { rowIndex, colIndex, newValue } = action.payload;
      state.cells[rowIndex][colIndex] = newValue;
    },
  },
});

export const { loadTable, updateCell } = tableSlice.actions;
export default tableSlice.reducer;

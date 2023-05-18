import React, { useRef } from 'react';



function Tile({ puzzle, grid, handleChange }) {
  const ref = useRef(null);
  return grid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      return (
        <input
          className={
              rowIndex % 3 === 0 && colIndex % 3 === 0
              ? 'base-cell thicker-left-border thicker-top-border'
              : rowIndex === 8 && colIndex % 3 === 0
              ? 'base-cell thicker-left-border thicker-bottom-border'
              : rowIndex % 3 === 0 && colIndex === 8
              ? 'base-cell thicker-top-border thicker-right-border'
              : rowIndex === 8 && colIndex === 8
              ? 'base-cell thicker-right-border thicker-bottom-border'
              : rowIndex === 8
              ? 'base-cell thicker-bottom-border '
              : rowIndex === 0 || rowIndex === 3 || rowIndex === 6
              ? 'base-cell thicker-top-border'
              : colIndex % 3 === 0
              ? 'base-cell thicker-left-border '
              : colIndex % 3 === 0 && rowIndex % 3 === 0
              ? 'base-cell thicker-top-border thicker-left-border'
              : colIndex === 8
              ? 'base-cell thicker-right-border '
              : colIndex === 0 || colIndex === 3 || colIndex === 6
              ? 'base-cell'
              : 'base-cell'
          }
          style={{
            backgroundColor:puzzle[rowIndex][colIndex] !== 0? "#eef4ff":""}}
          value={col === 0 ? '' : col}
          key={rowIndex + ' ' + colIndex}
          type='text'
          ref={ref}
          onChange={(e) => handleChange(rowIndex, colIndex, e)}
        />
      );
    });
  });
}

export default Tile;

import React, { useEffect, useState } from 'react'
import withPagination from '../hoc/withPagination'
import { usePagination } from '../hooks/usePagination'
interface ColumnModel<T extends object> {
  id: string;
  name: string;
  dataIndex: keyof T;
  render?: (data: T[keyof T]) => JSX.Element;
}

interface AbstractTableProps<T extends object> {
  columns: ColumnModel<T>[];
  data: T[];
  loading: boolean;
  keyField: keyof T;
  showIndexer?: boolean;
  LoadingComponent?: React.ComponentType<unknown>;
  startIndex?: number;
  // disablePagination?: boolean;
  // onNextPage?: () => void;
  // onPrevPage?: () => void;
  // pageIndex?: number;
  // pageSize?: number;
  // disableNext?: boolean;
}

function AbstractTable<T extends object>({
  showIndexer = false,
  // disablePagination = true,
  startIndex = 1,
  keyField,
  columns,
  data,
  loading,
  LoadingComponent,
  // onNextPage,
  // onPrevPage,
  // pageIndex,
  // pageSize,
  // disableNext
}: AbstractTableProps<T>) {
  return (
    <table style={{ border: 1 }}>
      <thead>
        <tr>
          {showIndexer && <td>Index</td>}
          {columns.map(col => (
            <td key={col.id}>
              {col.name}
            </td>
          ))}

        </tr>
      </thead>
      <tbody>
        {!loading && data.map((item, index) => (
          <tr key={String(item[keyField])}>
            {/* {showIndexer && <td>{disablePagination ? (index + 1) : (((pageIndex! - 1) * pageSize!) + index + 1)}</td>} */}
            {showIndexer && <td>{startIndex + index + 1}</td>}
            {columns.map(col => (
              <td key={col.id}>
                {col.render && col.render(item[col.dataIndex])}
                {!col.render && item[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
        {loading && <tr>
          <td colSpan={columns.length + (showIndexer ? 1 : 0)}>
            {LoadingComponent && <LoadingComponent />}
            {!LoadingComponent && "Please wait ..."}
          </td>
        </tr>}
      </tbody>
    </table>

  )
}

interface TableProps<T extends object> {
  columns: ColumnModel<T>[];
  data: T[];
  loading: boolean;
  keyField: keyof T;
  showIndexer?: boolean;
  LoadingComponent?: React.ComponentType<unknown>;
  disablePagination?: boolean;
}

export default withPagination(AbstractTable) as TableProps<any>;

// export default function Table<T extends object>({
//   showIndexer = false,
//   disablePagination = true,
//   keyField,
//   columns,
//   data,
//   loading,
//   LoadingComponent
// }: TableProps<T>) {
//   const {
//     data: slicedData,
//     handlePrevious,
//     handleNext,
//     pageSize,
//     pageIndex,
//     nextDisabled
//   } = usePagination<T>(data);

//   return (
//     <AbstractTable<T>
//       disablePagination={disablePagination}
//       showIndexer={showIndexer}
//       keyField={keyField}
//       data={disablePagination ? data : slicedData}
//       onNextPage={handleNext}
//       onPrevPage={handlePrevious}
//       pageIndex={pageIndex}
//       pageSize={pageSize}
//       disableNext={nextDisabled}
//       loading={loading}
//       columns={columns}
//       LoadingComponent={LoadingComponent}
//     />
//   )

// }
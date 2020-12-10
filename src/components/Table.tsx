import React, { useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window';

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
  disablePagination?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  pageIndex?: number;
  pageSize?: number;
  disableNext?: boolean;
}

export default function AbstractTable<T extends object>({
  showIndexer = false,
  disablePagination = true,
  keyField,
  columns,
  data,
  loading,
  LoadingComponent,
  onNextPage,
  onPrevPage,
  pageIndex,
  pageSize,
  disableNext
}: AbstractTableProps<T>) {
  return (
    <div>
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
          {/* {!loading && <List
          height={500}
          itemCount={data.length}
          itemSize={26}
          width={600}
        > */}
          {/* {({ index, style }) => {
            const item = data[index]
            return (
              <tr key={String(item[keyField])} style={style}>
                {showIndexer && <td>{index + 1}</td>}
                {columns.map(col => (
                  <td key={col.id}>
                    {col.render && col.render(item[col.dataIndex])}
                    {!col.render && item[col.dataIndex]}
                  </td>
                ))}
              </tr>
            )
          }
          }
        </List>} */}
          {!loading && data.map((item, index) => (
            <tr key={String(item[keyField])}>
              {showIndexer && <td>{disablePagination ? (index + 1) : (((pageIndex! - 1) * pageSize!) + index + 1)}</td>}
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
      {!disablePagination && !loading && <div className='pagination'>
        <button disabled={pageIndex! === 1} onClick={onPrevPage}>Back</button>
        <button disabled={disableNext!} onClick={onNextPage}>Next</button>
      </div>}
    </div>
  )
}

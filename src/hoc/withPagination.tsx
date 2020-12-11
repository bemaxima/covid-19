import React from 'react'
import { usePagination } from '../hooks/usePagination';

export default function withPagination(Component: React.ComponentType<any>): any {
  return (props: any) => {

    const {
      data: slicedData,
      handlePrevious,
      handleNext,
      pageSize,
      pageIndex,
      nextDisabled
    } = usePagination<any>(props.data);

    return <div>
      <Component {...props} data={slicedData} startIndex={(((pageIndex! - 1) * pageSize!))} />
      {!props.loading && <div className='pagination'>
        <button disabled={pageIndex! === 1} onClick={handlePrevious}>Back</button>
        <button disabled={nextDisabled!} onClick={handleNext}>Next</button>
      </div>}
    </div>
  }
}



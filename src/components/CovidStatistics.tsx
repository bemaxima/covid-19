import React, { useEffect, useState } from 'react';
import { get } from '../utility/api';
import AbstractTable from './Table';
import '../App.css'

export interface CovidDataModel {
  country: string;
  flag: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
}

interface CovideServerModel {
  country: string;
  countryInfo: CountryInfoModel;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
}

type CountryInfoModel = {
  flag: string;
}

type StateModel = CovidDataModel[];

const PAGE_SIZE = 18;

export default function CovidStatistics() {
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<StateModel>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [yesterday, setYesterday] = useState(true);
  useEffect(
    () => {
      get<CovideServerModel[]>(`countries?yesterday=${yesterday ? 'true' : 'false'}`)
        .then(response => {
          setData(response.map(x => {
            return {
              country: x.country,
              flag: x.countryInfo.flag,
              cases: x.cases,
              todayCases: x.todayCases,
              deaths: x.deaths,
              todayDeaths: x.todayDeaths
            }
          }));
          setLoading(false);
        })
    },
    [yesterday]
  )

  return (
    <>
      <input type='checkbox' checked={yesterday} onChange={e => setYesterday(e.target.checked)} /> Yesterday
      <AbstractTable<CovidDataModel>
        disablePagination={false}
        showIndexer
        keyField='country'
        data={data.slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE)}
        onNextPage={() => setPageIndex(pageIndex + 1)}
        onPrevPage={() => setPageIndex(pageIndex - 1)}
        pageIndex={pageIndex}
        pageSize={PAGE_SIZE}
        disableNext={(Math.ceil(data.length / PAGE_SIZE)) === pageIndex}
        loading={loading}
        columns={[
          {
            id: '1',
            name: 'COUNTRY',
            dataIndex: 'country',
          },
          {
            id: '2',
            name: 'FLAG',
            dataIndex: 'flag',
            render: data => <img className='flag' alt={String(data)} src={String(data)} />
          },
          {
            id: '3',
            name: 'Today Cases',
            dataIndex: 'todayCases',
          },
          {
            id: '4',
            name: 'Country2',
            dataIndex: 'country',
          }
        ]}
        LoadingComponent={Loading}
      />
    </>
  )
}

const Loading = () => <div>My loading component</div>;



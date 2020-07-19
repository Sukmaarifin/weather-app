import React from 'react';
import { PageHeader, Table, Divider } from 'antd';
import useHome from './helpers';
import AutoComplete from '../../components/AutoComplete';

const Home = () => {
  const {loading, columns, weaters, onHandleSearchWeather } = useHome();

  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        title="Weather App"
      />
      
      <div style={{ padding: '0px 24px'}}>
        <AutoComplete onHandleSearchWeather={onHandleSearchWeather} />
        <Divider/>
        <Table
          loading={loading}
          columns={columns}
          dataSource={weaters}
          pagination={false} />
      </div>
    </React.Fragment>
  )
}

export default Home
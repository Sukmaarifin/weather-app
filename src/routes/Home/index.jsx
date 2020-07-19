import React from 'react';
import { PageHeader, Input, AutoComplete, Table, Divider } from 'antd';
import cities from '../../assets/cities.json';
import useHome from './helpers';

const Home = () => {

  const {columns, weaters, city, handleChangeCity} = useHome();

  return (
    <React.Fragment>
      <div>
        <PageHeader
          className="site-page-header"
          title="Weather App"
        />
      </div>
      <div style={{ padding: '0px 24px'}}>
        <AutoComplete
          style={{ textAlign: 'left' }}
          options={cities}
        >
          <Input.Search
            size="large"
            placeholder="Search City"
            value={city}
            onChange={e => handleChangeCity(e)}/>
        </AutoComplete>
        <Divider/>
        <Table columns={columns} dataSource={weaters} pagination={false} />
      </div>
    </React.Fragment>
  )
}

export default Home
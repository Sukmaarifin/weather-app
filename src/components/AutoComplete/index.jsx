import React, {useState} from 'react';
import { Input, AutoComplete, Button } from 'antd';
import { SearchOutlined  } from '@ant-design/icons';
import { func } from 'prop-types';
import citiesMock from '../../assets/cities.json';

const AutoCompleteComponent = ({ onHandleSearchWeather }) => {
    const [city, setCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState(citiesMock);

    const onSearch = (item) => {
      const citiesTemp = citiesMock.filter(cit => cit.value.toUpperCase().includes(item?.toUpperCase()));
      setCities(citiesTemp);
    }

    const handleSelectCity = (e) => {
      setSelectedCity(e);
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const handleSearchWeather = (e) => {
      onHandleSearchWeather(e);
    }

    return (
    <React.Fragment>
      <AutoComplete
        style={{ textAlign: 'left' }}
        onSearch={onSearch}
        options={cities}
        onSelect={e => handleSelectCity(e)}
      >
        <Input
          size="large"
          placeholder="Search City"
          value={city}
          onChange={e => handleChangeCity(e)}
          />
      </AutoComplete>
      <Button
        type="primary" 
        icon={<SearchOutlined />} 
        size="large"
        onClick={() => handleSearchWeather(selectedCity)}
        />
    </React.Fragment>
  )
}

AutoCompleteComponent.propTypes = {
  onHandleSearchWeather: func
};


export default AutoCompleteComponent
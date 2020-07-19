import React,{ useState } from 'react';
import axios from 'axios';

const useHome = () => {
  const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env
  const [weaters, setWeaters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const columns = [
    {
      title: `${selectedCity || 'City'}`,
      dataIndex: 'date',
      key: 'date',
    },
  {
      title: 'Suhu',
      dataIndex: 'temp',
      key: 'temp',
    },
    {
      title: 'Perbedaan',
      dataIndex: 'diff',
      key: 'diff',
    },
  ];

  const onHandleSearchWeather = (e) => {
    setLoading(true);
    setSelectedCity(e);
    axios.get(`${REACT_APP_API_URL}/forecast?q=${e}&mode=json&units=metric&appid=${REACT_APP_API_KEY}`)
    .then(res => {
      //grouping wather by date
      let weatherDate = {};
      res.data.list.forEach(item => {
        const date = new Date(item.dt*1000).toISOString().substring(0,10).replace('\-', '_');
        const date_ = date.replace(/-/g, '_');
        let tempDate = weatherDate[date_] || 0;
        if(Array.isArray(tempDate)){
          weatherDate[date_].push(item);
        }else {
          weatherDate[date_] = [];
          weatherDate[date_].push(item);
        }
      })
      
      // calculate & restructure weather as table
      const tempWeather = Object.keys(weatherDate).map((el, key) => {
        const item = weatherDate[el];
        const tempTemprature = [];
        let tempMax = 0;
        let tempMin = 0;

        //calculate average /day
        item.forEach(element => {
          tempTemprature.push(element.main.temp);
          if(!tempMax || tempMax < element.main.temp_max ) tempMax = element.main.temp_max;
          if(!tempMin ||  element.main.temp_min < tempMin ) tempMin = element.main.temp_min;
        });

        const tempAverage = tempTemprature.reduce((a, r) => a + r)/tempTemprature.length;

        return {
          key,
          date: item[0].dt_txt.substring(0,10),
          temp: (tempAverage).toFixed(2),
          diff: (tempMax-tempMin).toFixed(2),
        };
      });
       
      // add last field
      // note: for calculate total average
      const tempTemp = (tempWeather.map(e => e.temp).reduce((a, r) => Number(a)+Number(r))/tempWeather.length).toFixed(2);
      const tempDiff = (tempWeather.map(e => e.diff).reduce((a, r) => Number(a)+Number(r))/tempWeather.length).toFixed(2);
      tempWeather.push({
        key: 'avegare',
        date: (<b>Rata-rata</b>),
        temp: (<b>{tempTemp}</b>),
        diff: (<b>{tempDiff}</b>)
      })
      
      setWeaters(tempWeather);
    })
    .catch(err => {
      setWeaters([]);
    })
    .finally(() =>{
      setLoading(false);
    })
  }

  return {
      weaters,
      columns,
      loading,
      onHandleSearchWeather
  }
}

export default useHome;
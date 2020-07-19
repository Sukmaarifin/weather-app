import React, { useEffect, useState } from 'react';

const useHome = () => {

    const [weaters, setWeaters] = useState([]);
    const [city, setCity] = useState('');

    const handleChangeCity = (e) => {
        console.log(e);
    }

    const getWeather = () => {
    
    }

    const columns = [
        {
          title: 'Cities',
          dataIndex: 'cities',
          key: 'cities',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Suhu',
          dataIndex: 'suhu',
          key: 'suhu',
        },
        {
          title: 'diff',
          dataIndex: 'diff',
          key: 'diff',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                //   <Tag color={color} key={tag}>
                    <div> {tag.toUpperCase()} </div>
                //   </Tag>
                );
              })}
            </>
          ),
        },
      ];
  
    useEffect(getWeather, []);

  return {
      weaters,
      city,
      columns,
      handleChangeCity
  }
}

export default useHome;
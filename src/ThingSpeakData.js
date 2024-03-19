// src/ThingSpeakData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThingSpeakData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.thingspeak.com/channels/2401393/feeds.json?results=15'
        );
        setData(response.data.feeds); 
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data)
  return (
    <div>
      <h2>ThingSpeak Data</h2>
      <br/>
      {/* {data} */}
      <br/>
      <ul>
        {data.map((item) => (
          <li key={item.entry_id}>
            <strong>Field1:</strong> {item.field1},{' '}
            <strong>Field2:</strong> {item.field2},{' '}
            <strong>Field3:</strong> {item.field3}{' '}
            &#176;C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThingSpeakData;

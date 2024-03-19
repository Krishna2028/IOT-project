import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const YourComponent = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchDataFromThingSpeak();
  }, []);

  const fetchDataFromThingSpeak = async () => {
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2401393/feeds.json?results=10');
      const data = await response.json();
      // Assuming data structure: { feeds: [{ created_at: 'timestamp', field1: 'value' }, ...] }
      const timestamps = data.feeds.map(feed => feed.created_at);
      const values = data.feeds.map(feed => parseFloat(feed.field1)); // Assuming the data is in field1
      setChartData({ labels: timestamps, datasets: [{ data: values }] });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Text>Chart from ThingSpeak Data</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
        yAxisSuffix=" units"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => rgba(0, 0, 0, ${opacity}),
          style: {
            borderRadius: 16,
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default YourComponent;
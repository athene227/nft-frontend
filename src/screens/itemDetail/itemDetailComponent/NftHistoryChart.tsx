import { Box } from '@mui/system';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import faker from 'faker';
import React from 'react';
import { Line } from 'react-chartjs-2';
import InputSelect from 'src/components/select/index';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const optionSelect = [
  {
    title: 'All time',
    value: ''
  },
  { title: 'Hourly', value: 'Hourly' },
  { title: 'Monthly', value: 'Monthly' },
  { title: 'Weekly', value: 'Weekly' }
];
export const options = {
  scales: {
    y: {
      grid: {
        color: '#585555'
      }
    },
    x: {
      grid: {
        color: '#585555'
      }
    }
  },
  elements: {
    line: {
      tension: 0.4 // disables bezier curves
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
      fontColor: 'blue',
      fontSize: 14
    },
    title: {
      display: false,
      text: 'Price History'
    },
    scales: {
      xAxes: {
        display: true,
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          fontColor: [
            'rgba(44,44,44,0.8)',
            'rgba(44,44,44,0.8)',
            'rgba(44,44,44,0.8)',
            'rgba(178,31,31,1)',
            'rgba(44,44,44,0.8)',
            'rgba(44,44,44,0.8)',
            'rgba(44,44,44,0.8)',
            'rgba(44,44,44,0.8)'
          ],
          backgroundColor: 'rgb(220, 221, 226)'
        }
      }
    }
  }
};

const labels = [
  '1/25',
  '2/16',
  '3/10',
  '4/1',
  '4/23',
  '5/15',
  '6/6',
  '6/28',
  '7/20'
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 2 })),
      backgroundColor: 'rgb(245, 6, 229)',
      borderColor: 'rgb(255, 255, 255)',
      color: '#ffffff'
    }
  ]
};

import { NftHistoryChartWrapper } from '../itemdetail.style';
const NftHistoryChart = () => {
  return (
    <NftHistoryChartWrapper>
      <Box className="nft-history-chart">
        <Box
          display={'flex'}
          alignItems="center"
          justifyContent={'space-between'}
          className="history-chart-header"
        >
          <h2>Price History</h2>
          <p>
            All time avg. price
            <br /> <span>1.1917</span>
          </p>
          <InputSelect className="sorting-select" menuItem={optionSelect} />
        </Box>
        <Line options={options} data={data} width={'600'} height={'110'} />
      </Box>
    </NftHistoryChartWrapper>
  );
};
export default NftHistoryChart;

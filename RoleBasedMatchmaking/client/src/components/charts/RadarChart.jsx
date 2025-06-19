import { Card } from 'antd';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ labels, data, title }) => {
    const chartConfig = {
        labels: labels,
        datasets: [
            {
                label: '# of Users',
                data: data,
                backgroundColor: [
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <Card title={title}>
            <Radar data={chartConfig} />
        </Card>
    );
};

export default RadarChart;
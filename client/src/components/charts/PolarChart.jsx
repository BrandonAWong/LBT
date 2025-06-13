import { Card } from 'antd';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = ({ labels, data=[], title }) => {
    const chartConfig = {
        labels: labels,
        datasets: [
        {
            label: '# of Users',
            data: data,
            borderWidth: 1,
        },
        ],
    }

    return (
        <Card title={title}>
            <PolarArea data={chartConfig} />
        </Card>
    );
};

export default PolarChart;
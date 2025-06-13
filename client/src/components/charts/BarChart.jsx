import { Card, Skeleton } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ labels, data, title }) => {
    const chartConfig = {
        labels: labels,
        datasets: [
            {
            label: '# of Users',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
            },
        ],
    }

    return (
        <Card title={title}>
            {data == null || data.length <= 0 &&
              <Skeleton.Node style={{ width: 1300, height: 450 }}>
                  <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
              </Skeleton.Node>
            }

            {data != null && data.length > 0 &&
                <Bar data={chartConfig} />
            }
        </Card>
    );
};

export default BarChart;
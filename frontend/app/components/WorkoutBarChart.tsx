import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type VolumeBarChartProps = {
    weeklyStats: { [key: string]: { totalVolume: number, totalWorkouts: number } };
    monthlyStats: { [key: string]: { totalVolume: number, totalWorkouts: number } };
};

const VolumeBarChart = ({ weeklyStats, monthlyStats }: VolumeBarChartProps) => {
    const [viewMode, setViewMode] = useState('weekly');
    const [chartType, setChartType] = useState('volume');

    const formatData = (stats: { [key: string]: { totalVolume: number, totalWorkouts: number } }) =>
        Object.entries(stats).map(([key, value]) => ({
            period: key,
            totalVolume: value.totalVolume,
            totalWorkouts: value.totalWorkouts,
        }));

    const data = viewMode === 'weekly' ? formatData(weeklyStats) : formatData(monthlyStats);

    return (
        <div className='bar-chart-container'>
            <div className='bar-chart-controls'>
                <div>
                    <button className={viewMode === 'weekly' ? 'active' : ''} onClick={() => setViewMode('weekly')}>
                        Weekly
                    </button>
                    <button className={viewMode === 'monthly' ? 'active' : ''}onClick={() => setViewMode('monthly')}>
                        Monthly
                    </button>
                </div>
                <div>
                    <button className={chartType === 'volume' ? 'active' : ''}onClick={() => setChartType('volume')}>
                        Volume
                    </button>
                    <button className={chartType === 'workouts' ? 'active' : ''}onClick={() => setChartType('workouts')}>
                        Workouts
                    </button>
                </div>
            </div>

            <BarChart className='bar-chart' width={500} height={250} data={data.map(({ period, totalVolume, totalWorkouts }) => ({
                period,
                Value: chartType === 'volume' ? totalVolume : totalWorkouts
            }))} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" label={{ value: 'Time Period', position: 'insideBottom', offset: -2 }} stroke="#ffffff" />
                <YAxis 
                    label={{ value: chartType === 'volume' ? 'Volume (kg)' : 'Workouts', angle: -90, offset: -1, position: 'insideLeft' }} 
                    allowDecimals={false} stroke="#ffffff"
                />
                <Tooltip 
                    contentStyle={{ fontSize: '10px', padding: '5px', height: "50px", color: "black" }} 
                    formatter={(value) => chartType === 'volume' ? `${value} kg` : value}
                />
                <Bar dataKey="Value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default VolumeBarChart;

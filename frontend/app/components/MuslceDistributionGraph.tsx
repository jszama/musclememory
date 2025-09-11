import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

interface MuscleDistributionGraphProps {
    volumePerMuscle: { [key: string]: number };
    repsPerMuscle: { [key: string]: number };
    setsPerMuscle: { [key: string]: number };
}

const MuscleDistributionGraph: React.FC<MuscleDistributionGraphProps> = ({ volumePerMuscle, repsPerMuscle, setsPerMuscle }) => {
    const [dataType, setDataType] = useState('Volume');
    const data = dataType === 'Volume' ? volumePerMuscle : dataType === 'Reps' ? repsPerMuscle : setsPerMuscle;

    const formattedData = Object.keys(data).map(key => ({
        subject: key,
        value: data[key]
    }));

    return (
        <div className='radar-chart-container'>
            <div className='radar-chart-controls'>
                <button className={dataType === 'Volume' ? 'active' : ''}  onClick={() => setDataType('Volume')}>Volume</button>
                <button className={dataType === 'Reps' ? 'active' : ''} onClick={() => setDataType('Reps')}>Reps</button>
                <button className={dataType === 'Sets' ? 'active' : ''} onClick={() => setDataType('Sets')}>Sets</button>
            </div>
            <RadarChart className='radar-chart' outerRadius={150} width={500} height={400} data={formattedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" stroke="#ffffff"/>
                <Radar name={dataType} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
                <Tooltip 
                    formatter={(value: number) => dataType === 'Volume' ? `${value} kg` : value} 
                    contentStyle={{ fontSize: '10px', padding: '5px', height: "50px"}} 
                />
            </RadarChart>
        </div>
    );
};

export default MuscleDistributionGraph;

import { useState } from 'react';
import { Paper, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BiometricData } from '../../services/simulationService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BiometricChartProps {
  data: BiometricData[];
}

/**
 * Component to display historical biometric data as charts
 * @param data - Array of biometric data points
 */
const BiometricChart = ({ data }: BiometricChartProps) => {
  const [metric, setMetric] = useState<string>('heartRate');
  
  const handleMetricChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMetric: string,
  ) => {
    if (newMetric !== null) {
      setMetric(newMetric);
    }
  };

  // Format timestamps for display
  const labels = data.map(item => {
    const date = new Date(item.timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  // Prepare chart data based on selected metric
  const chartData = {
    labels,
    datasets: [
      {
        label: metric === 'heartRate' 
          ? 'Heart Rate (BPM)' 
          : metric === 'stressLevel' 
            ? 'Stress Level (%)' 
            : metric === 'movementIntensity'
              ? 'Movement Intensity (%)'
              : 'Voice Stress (%)',
        data: data.map(item => item[metric as keyof BiometricData] as number),
        borderColor: metric === 'heartRate' 
          ? 'rgb(255, 99, 132)' 
          : metric === 'stressLevel' 
            ? 'rgb(255, 159, 64)' 
            : metric === 'movementIntensity'
              ? 'rgb(54, 162, 235)'
              : 'rgb(153, 102, 255)',
        backgroundColor: metric === 'heartRate' 
          ? 'rgba(255, 99, 132, 0.5)' 
          : metric === 'stressLevel' 
            ? 'rgba(255, 159, 64, 0.5)' 
            : metric === 'movementIntensity'
              ? 'rgba(54, 162, 235, 0.5)'
              : 'rgba(153, 102, 255, 0.5)',
        tension: 0.4, // Add curve to the line for modern look
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '24-Hour Biometric History',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Lighter grid lines for modern look
        },
      },
      x: {
        grid: {
          display: false, // Hide x-axis grid for cleaner look
        },
      },
    },
    elements: {
      point: {
        radius: 3, // Smaller points for cleaner look
        hoverRadius: 5,
      },
    },
  };

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Biometric Trends</Typography>
        <ToggleButtonGroup
          value={metric}
          exclusive
          onChange={handleMetricChange}
          size="small"
          aria-label="biometric metric"
        >
          <ToggleButton value="heartRate" aria-label="heart rate">
            Heart Rate
          </ToggleButton>
          <ToggleButton value="stressLevel" aria-label="stress level">
            Stress
          </ToggleButton>
          <ToggleButton value="movementIntensity" aria-label="movement">
            Movement
          </ToggleButton>
          <ToggleButton value="voiceStressIndicator" aria-label="voice stress">
            Voice Stress
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ height: 300 }}>
        <Line options={options} data={chartData} />
      </Box>
    </Paper>
  );
};

export default BiometricChart; 
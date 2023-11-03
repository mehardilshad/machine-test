import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

function LineChart({ data }) {
  Chart.register(...registerables)
  // Extract data from the object
  const labels = Object.keys(data)
  const values = Object.values(data)

  // Create the dataset
  const dataset = {
    labels: labels,
    datasets: [
      {
        label: 'Gatepass Counts',
        data: values,
        fill: true,
        backgroundColor: 'rgba(239, 134, 55, 0.79)',
        borderColor: '#ef8637',
        tension: 0.5,
      },
    ],
  }

  // Chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category', // Use 'category' scale for x-axis
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear', // Use 'linear' scale for y-axis
        beginAtZero: true, // Depending on your data, you may need to adjust other scale options
        grid: {
          display: false,
        },
      },
    },
  }
  return (
    <div>
      <Line data={dataset} options={options} />
    </div>
  )
}

export default LineChart

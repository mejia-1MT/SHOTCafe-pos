import React, { useRef, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler, // Import Filler for the area fill
} from 'chart.js'

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler
)

const HighlightCharts = ({ primaryColor, secondaryColor, dataset }) => {
  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: dataset.datasets[0].label,
        data: dataset.datasets[0].data,
        backgroundColor: (context) => {
          if (!context.chart.chartArea) {
            return
          }
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)

          gradientBg.addColorStop(0, primaryColor)
          gradientBg.addColorStop(0.5, primaryColor) // Middle ground
          gradientBg.addColorStop(0.7, primaryColor) // Middle ground
          gradientBg.addColorStop(1, 'rgba(255, 87, 51, 0)') // Transparent

          return gradientBg
        }, // Make it semi-transparent for the area
        borderColor: secondaryColor, // Line color
        borderWidth: 2,
        fill: true, // Enable area fill
        tension: 0.4, // Smooth line
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  }

  return (
    <div className=" h-full w-full">
      <Line data={data} options={options} />
    </div>
  )
}
export default HighlightCharts

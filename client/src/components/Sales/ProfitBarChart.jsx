import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const colors = {
  primary: '#02342d',
  secondary: '#f4f7f7',
  tertiary: '#ffffff',
  customWhite: '#f1f0f0',
  customGray: '#e2e5ea',
  opaque: '#668c85',
}

const ProfitBarChart = () => {
  const [sales, setSales] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sales/bar`) // Ensure this URL matches your API endpoint
        setSales(response.data)
      } catch (error) {
        setError(error.message || 'Failed to fetch sales')
      }
    }

    fetchSales()
  }, [])

  const labels = Object.keys(sales)
  const dataset = Object.values(sales)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Convert labels from "2024-1" to "January"
  const monthLabels = labels.map((label) => {
    const [year, month] = label.split('-')
    const monthIndex = parseInt(month, 10) - 1 // Adjust index (0-based)
    return monthNames[monthIndex]
  })

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Data',
        data: dataset,
        backgroundColor: colors.primary,
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
        external: function (context) {
          const { tooltip } = context
          let tooltipEl = document.getElementById('chartjs-tooltip')

          if (!tooltipEl) {
            tooltipEl = document.createElement('div')
            tooltipEl.id = 'chartjs-tooltip'
            tooltipEl.style.backgroundColor = colors.customGray
            tooltipEl.style.borderRadius = '4px'
            tooltipEl.style.padding = '10px'
            tooltipEl.style.pointerEvents = ''
            tooltipEl.style.position = 'absolute'
            tooltipEl.style.transition = 'all 0.1s ease'
            document.body.appendChild(tooltipEl)
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0'
            return
          }

          tooltipEl.innerHTML = `
            <div class="text-center text-sm p-1">
              <div class="flex items-center pb-2"> 
                <div class="h-3 w-3 rounded-full bg-primary mr-2"> </div>
                <div>${tooltip.dataPoints[0].raw}</div>
              </div>
              <div>${tooltip.dataPoints[0].label}</div>
            </div>
          `

          const { offsetLeft: positionX, offsetTop: positionY } =
            context.chart.canvas
          tooltipEl.style.left = `${positionX + tooltip.caretX}px`
          tooltipEl.style.top = `${positionY + tooltip.caretY}px`
          tooltipEl.style.opacity = '1'
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          display: false, // Hide the x-axis grid lines
        },
        border: {
          display: false, // Hide the x-axis border line
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2000, // Hide the y-axis ticks
        },
        grid: {
          color: colors.opaque,
          tickBorderDash: [5, 5],
        },
        border: {
          dash: [5, 5],
          display: false,
          dashOffset: '1',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
        maxBarLength: 0,
      },
    },
  }

  return (
    <div className="h-[85%] w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

export default ProfitBarChart

import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const colors = {
  primary: '#02342d',
  secondary: '#f4f7f7',
  tertiary: '#ffffff',
  customWhite: '#f1f0f0',
  customGray: '#e2e5ea',
  opaque: '#668c85',
}

// Helper function to get the last 7 months and aggregate sales
const getMonthlySales = (orders) => {
  const now = new Date()
  const months = []
  const sales = []

  for (let i = 6; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = monthDate.toLocaleString('default', { month: 'long' })
    months.push(monthName)

    const monthSales = orders
      .filter(order => {
        const orderDate = new Date(order.date)
        return (
          orderDate.getFullYear() === monthDate.getFullYear() &&
          orderDate.getMonth() === monthDate.getMonth()
        )
      })
      .reduce((acc, order) => acc + order.total_price, 0)

    sales.push(monthSales)
  }

  return { months, sales }
}

const ProfitBarChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    fetch('/orders.json')
      .then(response => response.json())
      .then(orders => {
        const { months, sales } = getMonthlySales(orders)
        setData({
          labels: months,
          datasets: [
            {
              label: 'Total Sales',
              data: sales,
              backgroundColor: colors.opaque,
              hoverBackgroundColor: colors.primary,
              barThickness: 50,
            },
          ],
        })
      })
      .catch(error => console.error('Error fetching orders:', error))
  }, [])

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
    <div className="h-[85%]">
      <Bar data={data} options={options} />
    </div>
  )
}

export default ProfitBarChart

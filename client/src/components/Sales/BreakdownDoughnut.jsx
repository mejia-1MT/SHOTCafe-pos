import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const colors = {
  primary: '#02342d',
  secondary: '#f4f7f7',
  tertiary: '#ffffff',
  customWhite: '#f1f0f0',
  customGray: '#e2e5ea',
  opaque: '#668c85',
}

const data = {
  labels: [
    'Coffee',
    'Americano',
    'Frappuccino',
    'Latte',
    'Matcha Latte',
    'Choco Chip Frappuccino',
    'Matcha Frappuccino',
  ],
  datasets: [
    {
      label: 'Breakdown',
      data: [6200, 1500, 4800, 3600, 5400, 4700, 7000], // Use an array of values for each segment
      backgroundColor: [colors.opaque], // Color for each segment
      hoverBackgroundColor: [colors.primary],
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
}

const BreakdownDoughnut = () => (
  <div className="h-[85%]">
    <Doughnut data={data} options={options} />
  </div>
)

export default BreakdownDoughnut

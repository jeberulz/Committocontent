"use client"

import { useEffect, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const config: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.9)',
          padding: 12,
          titleColor: 'rgba(255,255,255,0.9)',
          bodyColor: 'rgba(255,255,255,0.7)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.6)',
            font: { family: 'Geist, Inter' }
          }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.6)',
            font: { family: 'Geist, Inter' }
          }
        }
      }
    }

    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: ['Dec 1', 'Dec 5', 'Dec 10', 'Dec 15', 'Dec 20', 'Dec 25', 'Dec 30'],
        datasets: [{
          label: 'Views',
          data: [450, 520, 680, 750, 920, 1100, 1240],
          borderColor: 'rgba(255,255,255,0.9)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255,255,255,1)',
          pointBorderColor: 'rgba(0,0,0,1)',
          pointBorderWidth: 2
        }]
      },
      options: config as any
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return <canvas ref={canvasRef} />
}

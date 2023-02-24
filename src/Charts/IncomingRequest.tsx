import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  // LineChart,
  BarChart,
  // PieChart,
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts'
// import components, all suffixed with Component
import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from 'echarts/components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { route } from '../_backend/routes'

echarts.use([
  CanvasRenderer,
  BarChart,
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent,
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
])

export default function IncomingRequest() {
  const [loading, setLoading] = useState(true)
  const [option, setOption] = useState({
    title: {
      text: `Incoming Request`,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      valueFormatter: (value: string) => {
        const n = Number(value)

        if (n < 1000) {
          return `${n}ms`
        }

        return `${n / 1000}s`
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    legend: {
      show: true,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    dataZoom: [
      {
        id: 'dataZoomY',
        type: 'inside',
        start: 80,
        end: 100,
      },
      {
        type: 'slider',
      }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: [0, 0.01],
      axisLabel: { interval: 0, rotate: 45 },
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      },
      data: [] as any[],
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [] as any[],
  })

  const fetch = () => {
    axios.get(route('incoming-request.average'))
      .then(response => response.data as {
        name: string
        path: string
        method: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'
        min: number
        max: number
        average: number
        count: number
      }[])
      .then(response => {
        setOption({
          ...option,
          xAxis: {
            ...option.xAxis,
            data: response.map(({ name, count }) => `${name}(${count})`),
          },
          series: [
            {
              name: 'Min',
              type: 'bar',
              itemStyle: {
                borderRadius: [8, 8, 0, 0],
              },
              data: response.map(({ name, min }) => {
                return {
                  name,
                  value: min,
                }
              })
            },
            {
              name: 'Max',
              type: 'bar',
              itemStyle: {
                borderRadius: [8, 8, 0, 0],
              },
              data: response.map(({ name, max }) => {
                return {
                  name,
                  value: max,
                }
              })
            },
            {
              name: 'Average',
              type: 'bar',
              itemStyle: {
                borderRadius: [8, 8, 0, 0],
              },
              data: response.map(({ name, average }) => {
                return {
                  name,
                  value: average,
                }
              })
            },
          ],
        })

        setLoading(false)
      })
  }

  useEffect(() => {
    let interval = setInterval(fetch, 5000)
    fetch()

    return () => clearInterval(interval)
  }, [])

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      showLoading={loading}
      style={{
        height: 'calc(100vh - 10rem)',
      }}
    />
  )
}
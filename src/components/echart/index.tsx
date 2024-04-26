import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

interface Echart3DDemoProps {
  width?: string;
  height?: string;
}

const Echart3DDemo: React.FC<Echart3DDemoProps> = ({ width = '100%', height = '100%' }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const data = [];
      // Parametric curve
      for (let t = 0; t < 25; t += 0.001) {
        const x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
        const y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
        const z = t + 2.0 * Math.sin(75 * t);
        data.push([x, y, z]);
      }
      console.log(data.length);

      const option = {
        tooltip: {},
        backgroundColor: '#fff',
        visualMap: {
          show: false,
          dimension: 2,
          min: 0,
          max: 30,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026',
            ],
          },
        },
        xAxis3D: {
          type: 'value',
        },
        yAxis3D: {
          type: 'value',
        },
        zAxis3D: {
          type: 'value',
        },
        grid3D: {
          viewControl: {
            projection: 'orthographic',
          },
        },
        series: [
          {
            type: 'line3D',
            data: data,
            lineStyle: {
              width: 4,
            },
          },
        ],
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width, height }}></div>;
};

export default Echart3DDemo;
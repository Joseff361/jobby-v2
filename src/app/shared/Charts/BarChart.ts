import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';


export const barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 5, 0], label: 'Marzo' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Abril' }
]

export const barChartLabels: Label[] = [
  'DBA',
  'Calidad',
  'Develop',
  'GPTI',
  'IA',
  'BI',
  'SI',
  'Redes',
  ];

export const barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
};

//export const barChartPlugins = [pluginDataLabels];
export const barChartLegend = true;
export const barChartType: ChartType = 'bar';

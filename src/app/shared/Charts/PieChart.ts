import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';


export const pieChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

export const pieChartLabels: Label[] = [
  'Analista de Base de Datos',
  'Calidad de Software',
  'Desarrolldor de Software',
  'Gerencia de Proyectos de TI',
  'Inteligencia Artificial',
  'Inteligencia de Negocios',
  'Seguridad Informatica',
  'Servidores y Redes',
  ];

export const pieChartType: ChartType = 'pie';

export const pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

export const  pieChartColors = [
{
    backgroundColor: ['rgba(218, 247, 166)', 'rgb(255, 192, 203)', 'rgba(255, 87, 51)','rgba(0,0,255,0.3)',
    '	rgb(245, 222, 179)','rgb(244, 164, 96)','rgb(238, 232, 170)','	rgb(216, 191, 216)'],
},
];

export const pieChartLegend = true;

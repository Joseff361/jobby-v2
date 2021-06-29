import { ChartType } from "chart.js";
import { Label, MultiDataSet } from "ng2-charts";

export const  doughnutChartLabels: Label[] =  [
    'Analista de Base de Datos',
    'Calidad de Software',
    'Desarrolldor de Software',
    'Gerencia de Proyectos de TI',
    'Inteligencia Artificial',
    'Inteligencia de Negocios',
    'Seguridad Informatica',
    'Servidores y Redes',
    ];

export const doughnutChartData: MultiDataSet = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
export const doughnutChartType: ChartType = 'doughnut';
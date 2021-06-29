import { ChartType } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";


export const polarAreaChartLabels: Label[] = [
    'Analista de Base de Datos',
    'Calidad de Software',
    'Desarrolldor de Software',
    'Gerencia de Proyectos de TI',
    'Inteligencia Artificial',
    'Inteligencia de Negocios',
    'Seguridad Informatica',
    'Servidores y Redes',
];

export const polarAreaChartData: SingleDataSet = [0,0,0,0,0,0,0,0];
export const polarAreaLegend = true;
export const polarAreaChartType: ChartType = 'polarArea';
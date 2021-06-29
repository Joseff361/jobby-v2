import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

export const radarChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Mes de Marzo' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Mes de Abril' }
];

export const radarChartOptions: RadialChartOptions = {
    responsive: true,
};

export const radarChartLabels: Label[] = [
    'Analista de Base de Datos',
    'Calidad de Software',
    'Desarrolldor de Software',
    'Gerencia de Proyectos de TI',
    'Inteligencia Artificial',
    'Inteligencia de Negocios',
    'Seguridad Informatica',
    'Servidores y Redes',
    ];

export const radarChartType: ChartType = 'radar';

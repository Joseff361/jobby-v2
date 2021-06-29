import { Component, OnInit } from '@angular/core';
import { barChartData, barChartLabels, barChartOptions, barChartLegend, barChartType } from '../../shared/Charts/BarChart';
import { pieChartData, pieChartLabels, pieChartType, pieChartOptions, pieChartColors, pieChartLegend} from '../../shared/Charts/PieChart';
import { radarChartData, radarChartOptions, radarChartLabels, radarChartType } from '../../shared/Charts/RadarChart';
import { WebscrapingService } from '../../services/webscraping.service';
import { Estadistica } from '../../shared/Charts/Estadistica';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  // BARCHART
  barChartData: any;
  barChartLabels: any;
  barChartOptions: any;
  barChartLegend: any;
  barChartType: any;

  // PIECHART
  pieChartData: any;
  pieChartLabels: any;
  pieChartType: any;
  pieChartOptions: any;
  pieChartColors: any;
  pieChartLegend: any;

  // RADARCHART
  radarChartData: any;
  radarChartOptions: any;
  radarChartLabels: any;
  radarChartType: any;

  estadistica: Estadistica[];
  ofertasMarzo: Estadistica[] = [];
  ofertasFebrero: Estadistica[] = [];

  cantidadFebrero: Number[] = [];
  cantidadMarzo: Number[] = [];

  constructor(
    private webscrapingService: WebscrapingService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.webscrapingService.obtenerEstadisticas()
      .subscribe( data => {
        this.estadistica = data;
        for(let et of this.estadistica){
          if(et.mes == 'MARZO'){
            this.ofertasMarzo.push(et);
          }else if (et.mes == 'FEBRERO'){
            this.ofertasFebrero.push(et);
          }
        }

        // ORDENAR POR SEGUN ESPECIALIDAD
        this.ofertasFebrero.sort(function (a, b) {
          if (a.especialidad > b.especialidad) {
            return 1;
          }
          if (a.especialidad < b.especialidad) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        this.ofertasMarzo.sort(function (a, b) {
          if (a.especialidad > b.especialidad) {
            return 1;
          }
          if (a.especialidad < b.especialidad) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        // CREAR UN ARRAY DE OFERTAS
        for(let oferta of this.ofertasFebrero){
          this.cantidadFebrero.push(oferta.cantidad);
        }

        for(let oferta of this.ofertasMarzo){
          this.cantidadMarzo.push(oferta.cantidad);
        }

        /****  ELIMNIAR LUEGO DE PRUEBA ****/
        this.cantidadFebrero.push(10)
        this.cantidadFebrero.push(5)
        /**** ELIMNIAR LUEGO DE PRUEBA ****/


        // ASIGNAR AL BARCHART
        this.barChartData[0].data = this.cantidadFebrero;
        this.barChartData[1].data = this.cantidadMarzo;

        // ASIGNAR AL PIE CHART
        this.pieChartData = this.cantidadMarzo;

        // ASIGNAR AL RADARCHART
        this.radarChartData[0].data = this.cantidadFebrero;
        this.radarChartData[1].data = this.cantidadMarzo;

        window.localStorage.setItem('MARZO', JSON.stringify(this.cantidadFebrero));
        window.localStorage.setItem('ABRIL', JSON.stringify(this.cantidadMarzo));

        this.spinner.hide();
      }, err => {
        console.log(err);
      })

    // BARCHART
    this.barChartData = barChartData;
    this.barChartLabels = barChartLabels;
    this.barChartOptions = barChartOptions;
    this.barChartLegend = barChartLegend;
    this.barChartType = barChartType;

    // PIECHART
    this.pieChartData = pieChartData;
    this.pieChartLabels = pieChartLabels;
    this.pieChartType = pieChartType;
    this.pieChartOptions = pieChartOptions;
    this.pieChartColors = pieChartColors;
    this.pieChartLegend = pieChartLegend;

    // RADARCHART
    this.radarChartData = radarChartData;
    this.radarChartOptions = radarChartData;
    this.radarChartLabels = radarChartLabels;
    this.radarChartType = radarChartType;
  }

}

import { Component, OnInit } from '@angular/core';
import { WebscrapingService } from 'src/app/services/webscraping.service';
import { Tensorflow } from 'src/app/shared/WebScrap/Tensorflow';
import { polarAreaChartLabels, polarAreaChartData, polarAreaLegend, polarAreaChartType} from '../../shared/Charts/PolarAreaChart';
import { barChartData, barChartLabels, barChartOptions, barChartLegend, barChartType } from '../../shared/Charts/Barchart2';
import { doughnutChartLabels, doughnutChartData, doughnutChartType} from '../../shared/Charts/DoughnutChart';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-tensorflow',
  templateUrl: './tensorflow.component.html',
  styleUrls: ['./tensorflow.component.css']
})
export class TensorflowComponent implements OnInit {

  misProyecciones: Tensorflow[];

  // POLARCHART
  polarAreaChartLabels: any;
  polarAreaChartData: any;
  polarAreaLegend: any;
  polarAreaChartType: any;

   // BARCHART
   barChartData: any;
   barChartLabels: any;
   barChartOptions: any;
   barChartLegend: any;
   barChartType: any;

   // DOUGHNUT
  doughnutChartLabels: any;
  doughnutChartData: any;
  doughnutChartType: any;

  miProyeccion: number[] = [];

  constructor(
    private webscrapingService: WebscrapingService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.webscrapingService.tensorflow()
      .subscribe( data => {
        this.misProyecciones = data;
        console.log(this.misProyecciones);

        // ORDENAR POR SEGUN ESPECIALIDAD
        this.misProyecciones.sort(function (a, b) {
          if (a.especialidad > b.especialidad) {
            return 1;
          }
          if (a.especialidad < b.especialidad) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

         // CREAR UN ARRAY DE OFERTAS DE PROYECIONES
         for(let proyeccion of this.misProyecciones){
          this.miProyeccion.push(proyeccion.cantidad);
        }

        console.log(this.miProyeccion)

        //ASIGNANDO A LOS CHARTS
        this.polarAreaChartData = this.miProyeccion;

        this.barChartData[0].data = this.miProyeccion;
        this.barChartData[0].label = this.misProyecciones[0].fecha;

        this.doughnutChartData[0] = this.miProyeccion;
        this.doughnutChartData[1] = JSON.parse(window.localStorage.getItem('MARZO'));
        this.doughnutChartData[2] = JSON.parse(window.localStorage.getItem('ABRIL'));

      }, err => {
        console.log(err);
      })

      // POLAR CHART
      this.polarAreaLegend = polarAreaLegend;
      this.polarAreaChartType = polarAreaChartType;
      this.polarAreaChartLabels = polarAreaChartLabels;
      this.polarAreaChartData = polarAreaChartData;

      // BARCHART
      this.barChartData = barChartData;
      this.barChartLabels = barChartLabels;
      this.barChartOptions = barChartOptions;
      this.barChartLegend = barChartLegend;
      this.barChartType = barChartType;

      //DOUGHNUT
      this.doughnutChartLabels = doughnutChartLabels;
      this.doughnutChartData= doughnutChartData;
      this.doughnutChartType= doughnutChartType;

      this.spinner.hide();
  }

}

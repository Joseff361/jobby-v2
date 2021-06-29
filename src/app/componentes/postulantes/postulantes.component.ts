import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteDto } from 'src/app/shared/Dto/EstudianteDto';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {

  estudiantes: EstudianteDto[];

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.estudiantes = JSON.parse(window.sessionStorage.getItem('POSTULANTES'));
    console.log(this.estudiantes);
  }

  volver(): void{
    this.route.navigate(['/usuarios']);
  }
}

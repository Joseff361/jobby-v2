import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrls: ['./universidades.component.scss']
})
export class UniversidadesComponent implements OnInit {
  titulo: string = 'JobbyBlog';
  subtitulo: string = 
    `Encuentra artículos con contenido actualizado y novedoso sobre temas específicos relacionados a las carreras mas llamativas!
    Los datos son recogidos de las principales universidades del Peru por lo que la fiablidad de la informacion esta asegurada.`;

  constructor() { }

  ngOnInit(): void {
  }

}

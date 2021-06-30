import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

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
  articles: Article[];
  isBlogger: boolean;

  constructor(
    private blogService: BlogService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    
    // let idUsuario = sessionStorage.getItem('Id');

    this.isBlogger =  sessionStorage.getItem('Tipo') === 'BLOGGER';

    this.blogService.obtenerArticulos('60dbd479bd33b81f049646cc')
      .subscribe( (data: Article[]) => {
        this.articles = data;
      }, err => {
        console.log(err);
      })
  }

  editBlog(data: Article): void {
    console.log(data)
    this.blogService.guardarActualBlog(data);
    this.route.navigate(['/blog-edit-panel']);
  }

}

interface Article {
  content: string;
  createAt: string;
  updateAt: string;
  _id: string;
  title: string;
  img: string;
}

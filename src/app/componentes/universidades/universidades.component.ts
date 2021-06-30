import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    // let idUsuario = sessionStorage.getItem('Id');

    this.isBlogger =  sessionStorage.getItem('Tipo') === 'BLOGGER';

    this.blogService.obtenerArticulos('60dbd479bd33b81f049646cc')
      .subscribe( (data: Article[]) => {
        this.articles = data;
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.spinner.hide();
      })
  }

  readBlog(data): void {
    this.blogService.readOnly = true;
    this.blogService.guardarActualBlog(data);
    this.route.navigate(['/blog-edit-panel']);
  }

  editBlog(data: Article): void {
    console.log(data)
    this.blogService.guardarActualBlog(data);
    this.blogService.readOnly = false;
    this.route.navigate(['/blog-edit-panel']);
  }

  createBlog(): void {
    let emptyArticle = {
      content: '',
      createAt: '',
      updateAt: '',
      _id: '',
      title: '',
      img: '',
    }
    this.blogService.guardarActualBlog(emptyArticle);
    this.blogService.readOnly = false;
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

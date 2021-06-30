import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { SesionStorageService } from '../../services/sesion-storage.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  articleForm: Article = {
    content: '',
    createAt: '',
    updateAt: '',
    _id: '',
    title: '',
    img: '',
  }

  constructor(
    private blogService: BlogService,
    private sesionStorageService: SesionStorageService
  ) { }

  ngOnInit(): void {
    this.articleForm = this.blogService.obtenerActualBlog();
  }

  createBlog(theTitle: string, theImage: string, theContent: string): void{
    let article: NewArticle = {
      img: theImage,
      _id: this.sesionStorageService.obtenerId(),
      content: theContent,
      title: theTitle,
    }
    this.blogService.crearArticulo(article)
      .subscribe(data => {
        console.log(data);
      })
  }

  updateBlog(theTitle: string, theImage: string, theContent: string): void{
    let article: EditArticle = {
      img: theImage,
      idArticle: this.articleForm._id,
      id: this.sesionStorageService.obtenerId(),
      content: theContent,
      title: theTitle,
    }
    this.blogService.editarArticulo(article)
      .subscribe(data => {
        console.log(data);
      })
  }

  deleteBlog(): void{
    let article: DeleteArticle = {
      idArticle: this.articleForm._id,
      id: this.sesionStorageService.obtenerId(),
    }
    console.log(article);
    this.blogService.eliminarArticulo(article)
      .subscribe(data => {
        console.log(data);
      })
  }


}

interface NewArticle {
  img: string;
  _id: string;
  content: string;
  title: string;
}

interface Article {
  content: string;
  createAt: string;
  updateAt: string;
  _id: string;
  title: string;
  img: string;
}

interface EditArticle {
  id: string;
  idArticle: string;
  title: string;
  content: string;
  img: string;
}

interface DeleteArticle {
  id: string;
  idArticle: string
}
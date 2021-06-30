import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class BlogService {

  baseURL: string = 'https://jobbyblogback.herokuapp.com';
  blog: Article;

  constructor(
    private http: HttpClient,
  ) { }

  public obtenerUsuarios(): Observable<UserUniv[]>{
    return this.http.get<UserUniv[]>(this.baseURL + '/user/list');
  }

  public obtenerArticulos(theId: string): Observable<Article[]>{
    return this.http.get<Article[]>(this.baseURL + '/user/article/' + theId);
  }

  public crearArticulo(newArticle: NewArticle): Observable<Article[]>{
    return this.http.post<Article[]>(this.baseURL + '/user/createarticle', newArticle);
  }

  public editarArticulo(editArticle: EditArticle): Observable<Article[]>{
    return this.http.post<Article[]>(this.baseURL + '/user/updatearticle', editArticle);
  }

  public eliminarArticulo(deleteArticle: DeleteArticle): Observable<any>{
    return this.http.post<any>(this.baseURL + '/user/removearticle', deleteArticle);
  }

  public guardarActualBlog(theBlog: Article): void {
    this.blog = theBlog;
  }

  public obtenerActualBlog(): Article{
    return this.blog;
  }

}

interface UserUniv {
  univName: string;
  location: string;
  _id: string;
  username: string;
  password: string;
  article: Article[];
}

interface Article {
  content: string;
  createAt: string;
  updateAt: string;
  _id: string;
  title: string;
  img: string;
}

interface NewArticle {
  img: string;
  _id: string;
  content: string;
  title: string;
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
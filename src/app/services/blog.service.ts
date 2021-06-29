import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class BlogService {

  baseURL: string = 'https://jobbyblogback.herokuapp.com';

  constructor(
    private http: HttpClient,
  ) { }

  public obtenerUsuarios(): Observable<UserUniv[]>{
    return this.http.get<UserUniv[]>(this.baseURL + '/user/list');
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
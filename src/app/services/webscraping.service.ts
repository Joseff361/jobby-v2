import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURLWs } from '../shared/Config';
import { Estadistica } from '../shared/Charts/Estadistica'; 
import { Tensorflow } from '../shared/WebScrap/Tensorflow';

@Injectable({
  providedIn: 'root'
})
export class WebscrapingService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerOfertasWebScraping(): Observable<any>{
    return this.http.get<any>(baseURLWs + '/api/oferta');
  }

  public obtenerEstadisticas(): Observable<Estadistica[]>{
    return this.http.get<Estadistica[]>(baseURLWs + 'api/piechart');
  }

  public tensorflow(): Observable<Tensorflow[]>{
    return this.http.get<Tensorflow[]>(baseURLWs + 'api/data_proyecciones');
  }

}



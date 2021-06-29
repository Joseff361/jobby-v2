import { Injectable } from '@angular/core';
import { baseURL, baseURLWs } from '../shared/Config';
import { UsuarioDto } from '../shared/Dto/UsuarioDto';
import { Estudiante } from '../shared/Dto/Estudiante';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/Dto/Login';
import { Curriculum, EstudianteDto } from '../shared/Dto/EstudianteDto';
import { Postulacion } from '../shared/Dto/Postulacion';


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(
    private http: HttpClient
  ) { }

  public login(login: Login): Observable<UsuarioDto>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UsuarioDto>(baseURL + '/api/login', login, httpOptions);
  }

  public obtenerEstudiantePorId(id: String): Observable<Estudiante>{
    return this.http.get<Estudiante>(baseURL + '/api/estudiantes/' + id);
  }

  public registrarEstudiante(estudiante: Estudiante): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(baseURL + '/api/estudiantes', estudiante, httpOptions);
  }

  public obtenerEstudiantePorusuario(usuario: UsuarioDto): Observable<EstudianteDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<EstudianteDto>(baseURL + '/api/estudianteInfo', usuario, httpOptions);    
  }

  public guardarCurriculum(curriculum: Curriculum, idEstudiante: String): Observable<Curriculum>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(baseURL + "/api/curriculum/" + idEstudiante , curriculum, httpOptions);
  }

  public postularseAOferta(postulacion: Postulacion): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(baseURL + '/api/postularse', postulacion, httpOptions);
  }
}

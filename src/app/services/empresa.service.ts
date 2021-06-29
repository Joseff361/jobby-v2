import { Injectable } from '@angular/core';
import { baseURL } from '../shared/Config';
import { EmpresaDto } from '../shared/Dto/EmpresaDto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../shared/Dto/Empresa';
import { UsuarioDto } from '../shared/Dto/UsuarioDto';
import { OfertaEmpresaDto } from '../shared/Dto/OfertaEmpresaDto';
import { SesionStorageService } from './sesion-storage.service';
import { CredencialesDto } from '../shared/Dto/CredencialesDto';
import { OfertaPorEmpresa } from '../shared/Dto/OfertaPorEmpresa';
import { Postulacion } from '../shared/Dto/Postulacion';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient,
    private sesionStorageService: SesionStorageService
  ) { }

  public obtenerTodasLasEmpresas(): Observable<EmpresaDto[]>{
      return this.http.get<EmpresaDto[]>(baseURL + '/api/empresas');
  }

  public obtenerEmpresaPorId(id: String): Observable<EmpresaDto>{
    return this.http.get<EmpresaDto>(baseURL + "/api/empresas/" + id);
  }

  public registrarEmpresa(empresa: Empresa): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(baseURL + '/api/empresas', empresa, httpOptions);
  }

  public obtenerEmpresaPorusuario(usuario: UsuarioDto): Observable<EmpresaDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<EmpresaDto>(baseURL + '/api/empresaInfo', usuario, httpOptions);    
  }

  public publicarOfertaDeTrabajo(ofertaEmpresa: OfertaEmpresaDto): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    ofertaEmpresa.IdEmpresa = Number(this.sesionStorageService.obtenerIdTipo());
    console.log(ofertaEmpresa);
    return this.http.post<any>(baseURL + '/api/ofertasEmpresa', ofertaEmpresa, httpOptions);
  }
  
  public obtenerOferfasEmpleoPorEmpresa( ): Observable<OfertaPorEmpresa[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const credenciales = new CredencialesDto(Number(this.sesionStorageService.obtenerIdTipo()),
                                            this.sesionStorageService.obtenerCorreo(),
                                            this.sesionStorageService.obtenerContrasenia());

    return this.http.post<OfertaPorEmpresa[]>(baseURL + "/api/ofertasSegunEmpresa", credenciales, httpOptions);
  }

  public obtenerOferfasEmpleoTotales(): Observable<OfertaPorEmpresa[]>{
    return this.http.get<OfertaPorEmpresa[]>(baseURL + "/api/ofertasTotales");
  }

}

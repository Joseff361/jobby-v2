import { Injectable } from '@angular/core';
import { UsuarioDto } from '../shared/Dto/UsuarioDto';

const ID_KEY = 'Id';
const CORREO_KEY = 'Username';
const CONTRASENIA_KEY = 'Password';
const TIPO_KEY = 'Tipo';
const ID_TIPO_KEY = 'IdTipo';

@Injectable({
  providedIn: 'root'
})
export class SesionStorageService {

  constructor() { }

  public guardarCredenciales(usuarioDto: UsuarioDto): void{
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.removeItem(CORREO_KEY);
    window.sessionStorage.removeItem(CONTRASENIA_KEY);
    window.sessionStorage.removeItem(TIPO_KEY);

    window.sessionStorage.setItem(ID_KEY, usuarioDto.id.toString());   
    window.sessionStorage.setItem(CORREO_KEY, usuarioDto.correo);   
    window.sessionStorage.setItem(CONTRASENIA_KEY, usuarioDto.contrasenia); 
    window.sessionStorage.setItem(TIPO_KEY, usuarioDto.tipo);   
  }

  public obtenerId(): string {
    return sessionStorage.getItem(ID_KEY);
  }

  public obtenerCorreo(): string {
    return sessionStorage.getItem(CORREO_KEY);
  }

  public obtenerContrasenia(): string {
    return sessionStorage.getItem(CONTRASENIA_KEY);
  }

  public obtenerTipo(): string {
    return sessionStorage.getItem(TIPO_KEY);
  }

  public guardarIdTipo(idTipo: Number): void{
    window.sessionStorage.setItem(ID_TIPO_KEY, String(idTipo)); 
  }

  public obtenerIdTipo(): String{
    return sessionStorage.getItem(ID_TIPO_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}

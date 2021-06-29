import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { Subscription } from 'rxjs';
import { SesionStorageService } from '../../services/sesion-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logeado: boolean = false;
  subscription: Subscription;
  usuario: string;


  constructor(
    private mensajeService: MensajeService,
    private sesionStorageService: SesionStorageService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.mensajeService.getMessage().subscribe( mensaje =>{
      if(mensaje){
        this.logeado = true;
        this.usuario = mensaje.text;
      }else{
        
      }
    });

    if(this.sesionStorageService.obtenerCorreo() != null){
      this.logeado = true;
      this.usuario = this.sesionStorageService.obtenerCorreo();
    }
  }

  logOut(event: any){
    this.sesionStorageService.logOut();
    this.logeado = false;
  }

}

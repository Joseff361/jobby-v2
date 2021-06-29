import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { MensajeService } from '../../services/mensaje.service';


@Component({
  selector: 'app-login-univ',
  templateUrl: './login-univ.component.html',
  styleUrls: ['./login-univ.component.scss']
})
export class LoginUnivComponent implements OnInit {
  
  username: string = '';
  password: string = '';
  loading: boolean = false;

  errorMessage: Message = {
    text: 'Credenciales incorrectas',
    status: false,
  }
  successMessage: Message = {
    text: 'Login exitoso!',
    status: false,
  }

  credentials: UserUniv[] = null;

  constructor( 
      private blogService: BlogService, 
      private route: Router,
      private mensajeService: MensajeService,
  ) { }

  ngOnInit(): void {
  }

  sigIn(username: string, password: string): void {
    this.errorMessage.status = false;
    this.successMessage.status = false;
    this.loading = true;

    this.blogService.obtenerUsuarios()
      .subscribe( (data: UserUniv[])  => {
        this.loading = false;
        this.credentials = data.filter( dt => {
          if(dt.username === username && dt.password === password) {
            return dt;
          }
        })

        if(this.credentials.length === 0 ){
          this.errorMessage.status = true;
          this.successMessage.status = false;
        }else{
          this.errorMessage.status = false;
          this.successMessage.status = true;

          window.sessionStorage.setItem('Id', this.credentials[0]._id);   
          window.sessionStorage.setItem('Username', this.credentials[0].username);   
          window.sessionStorage.setItem('Password', this.credentials[0].password); 
          window.sessionStorage.setItem('Tipo', 'BLOGGER'); 

          this.mensajeService.sendMessage(this.credentials[0].username);
          
          setTimeout(() => {
            this.route.navigate(['/blog']);
          }, 1000);
        }

      }, err => {
        this.loading = false;
        this.errorMessage.status = true;
        this.successMessage.status = false;
      })
  }
}

interface UserUniv {
  univName?: string;
  location?: string;
  _id?: string;
  username?: string;
  password?: string;
  article?: Article[];
}

interface Article {
  content: string;
  createAt: string;
  updateAt: string;
  _id: string;
  title: string;
  img: string;
}

interface Message {
  text: string;
  status: boolean;
}

interface UserDto {
  id: string;
  correo: string;
  contrasenia: string
  tipo: string;
}
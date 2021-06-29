import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { ScrapingComponent } from './componentes/scraping/scraping.component';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { LoginComponent } from './componentes/login/login.component';
import { SigninEmpresasComponent } from './componentes/signin-empresas/signin-empresas.component';
import { SigninEstudiantesComponent } from './componentes/signin-estudiantes/signin-estudiantes.component';

// CHART MODULE
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoAreas1Component } from './componentes/info-areas1/info-areas1.component';
import { InfoAreas2Component } from './componentes/info-areas2/info-areas2.component';
import { OfertaEmpresaComponent } from './componentes/oferta-empresa/oferta-empresa.component';
import { OfertaDetalleComponent } from './componentes/oferta-detalle/oferta-detalle.component';
import { CurriculumComponent } from './componentes/curriculum/curriculum.component';
import { PostulantesComponent } from './componentes/postulantes/postulantes.component';
import { TensorflowComponent } from './componentes/tensorflow/tensorflow.component';

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EstadisticasComponent,
    ScrapingComponent,
    EmpresasComponent,
    LoginComponent,
    SigninEmpresasComponent,
    SigninEstudiantesComponent,
    UsuarioComponent,
    InfoAreas1Component,
    InfoAreas2Component,
    OfertaEmpresaComponent,
    OfertaDetalleComponent,
    CurriculumComponent,
    PostulantesComponent,
    TensorflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

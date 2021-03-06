import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { LoginComponent } from './componentes/login/login.component';
import { OfertaDetalleComponent } from './componentes/oferta-detalle/oferta-detalle.component';
import { PostulantesComponent } from './componentes/postulantes/postulantes.component';
import { ScrapingComponent } from './componentes/scraping/scraping.component';
import { SigninEmpresasComponent } from './componentes/signin-empresas/signin-empresas.component';
import { SigninEstudiantesComponent } from './componentes/signin-estudiantes/signin-estudiantes.component';
import { TensorflowComponent } from './componentes/tensorflow/tensorflow.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UniversidadesComponent } from './componentes/universidades/universidades.component';
import { LoginUnivComponent } from './componentes/login-univ/login-univ.component';
import { AddBlogComponent } from './componentes/add-blog/add-blog.component';

const routes: Routes = [
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'estudiantes', component: SigninEstudiantesComponent},
  { path: 'empresas', component: SigninEmpresasComponent},
  { path: 'login', component: LoginComponent},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'scraping', component: ScrapingComponent},
  { path: 'postulantes', component: PostulantesComponent},
  { path: 'blog', component: UniversidadesComponent},
  { path: 'tensorflow', component: TensorflowComponent},
  { path: 'login-univ', component: LoginUnivComponent},
  { path: 'blog-edit-panel', component: AddBlogComponent},
  { path: 'oferta-detalle', component: OfertaDetalleComponent},
  { path: '', redirectTo: '/estadisticas', pathMatch: 'full'},
  { path: '**', component: EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

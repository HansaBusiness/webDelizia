import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapaComponent } from './component/mapa/mapa.component';
import { LoginComponent } from './component/login/login.component';
import { MenuPrincipalComponent } from './component/menu-principal/menu-principal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'menu', component: MenuPrincipalComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

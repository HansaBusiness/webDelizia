import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './component/mapa/mapa.component';
import { LoginComponent } from './component/login/login.component';
import { MenuPrincipalComponent } from './component/menu-principal/menu-principal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    LoginComponent,
    MenuPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.configurarFirebase), // Inicializa Firebase
    AngularFireDatabaseModule // Importa el módulo de la base de datos
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  
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
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { app_routing } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    LoginComponent,
    MenuPrincipalComponent
  ],
  imports: [
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.configurarFirebase), // Inicializa Firebase
    AngularFireDatabaseModule,
    app_routing
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
  
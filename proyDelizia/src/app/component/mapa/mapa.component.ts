import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  center: google.maps.LatLngLiteral = { lat: -34.397, lng: 150.644 };
  zoom = 8;
}
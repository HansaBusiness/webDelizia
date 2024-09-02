import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  locations$!: Observable<any[]>;
  map!: google.maps.Map;

  constructor(private db: AngularFireDatabase) {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -16.494812, lng: -68.142537 },
      zoom: 12,
    };

    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement as HTMLElement, mapOptions);
      this.loadLocations();
    } else {
      console.error('Map element not found');
    }
  }

  loadLocations() {
    this.locations$ = this.db.list('Inventarios/').valueChanges();
    this.locations$.subscribe(locations => {
      locations.forEach((location: any) => {
        this.addMarker(location);
      });
    });
  }

  addMarker(location: any) {
    console.log(location);
    const position = { lat: parseFloat(location.LatitudPlan), lng: parseFloat(location.LongitudPlan) };

    // Determinar el color del marcador en función del campo 'Estado'
    let iconUrl = '';
    let ani;
    switch (location.Estado) {
      case 'Pendiente':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      case 'Ejecutando':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      case 'Finalizado':
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      default:
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        ani = google.maps.Animation.DROP;
        break;
    }

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: location.Nombre,
      icon: iconUrl,
      animation: ani
    });

    const infoWindowContent = `
        <div style="background-color: #01b9d6; color: white; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0;">${location.Nombre}</h3>
          <p style="margin: 5px 0 0;">Hora Incio : 09:15 <br> Hora Fin : 12:30 <br><br>Estado : ${location.Estado} </p>
        </div>
      `;
    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}

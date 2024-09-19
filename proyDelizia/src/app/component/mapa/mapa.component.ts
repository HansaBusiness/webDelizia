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
    const position_real = { lat: parseFloat(location.LatitudReal), lng: parseFloat(location.LongitudReal) };

    // Determinar el color del marcador en función del campo 'Estado'
    let iconUrl_real = '';
    let ani;
    switch (location.Estado) {
      case 'Pendiente':
        iconUrl_real = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      case 'Ejecutando':
        iconUrl_real = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      case 'Esperando Supervisor':
        iconUrl_real = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        ani = google.maps.Animation.DROP;
        break;
      default:
        iconUrl_real = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        ani = google.maps.Animation.DROP;
        break;
    }

    const marker = new google.maps.Marker({
      position: position_real,
      map: this.map,
      title: location.Nombre,
      icon: iconUrl_real,
      animation: ani
    });

    const infoWindowContent = `
        <div style="background-color: #e9e9e9; color: black; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0;">${location.Nombre}</h3>
          <p style="margin: 5px 0 0;">Hora Incio : ${location.FechaInicio.substring(11, 16)} <br> Hora Fin : ${location.FechaFin.substring(11, 16)} 
          <br><br>Estado : <b>${location.Estado} </b>
          <br>Obs. : ${location.Observacion} 
          </p>
        </div>
      `;
    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });


    // PUNTOS PARA LA UBICACION AGENCIA
    const position_agencia = { lat: parseFloat(location.LatitudPlan), lng: parseFloat(location.LongitudPlan) };

    const marker_agencia = new google.maps.Marker({
      position: position_agencia,
      map: this.map,
      title: location.Nombre,
      icon: {
        url: 'assets/icons/home.png',  //'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(40, 40)  // Redimensiona el ícono
      },      
      animation: google.maps.Animation.DROP
    });

    const infoWindow_agencia = new google.maps.InfoWindow({
      content: `<div style="background-color: #1366a4; color: white; padding: 15px; border-radius: 5px;">
          <h3 style="margin: 0;">${location.Nombre}</h3>
          <p style="margin: 5px 0 0;">Agencia : ${location.Direccion} <br>
          </p>
        </div>`
    });

    marker_agencia.addListener('click', () => {
      infoWindow_agencia.open(this.map, marker_agencia);
    });


    if(location.LatitudReal!='0.0' && location.LongitudReal!='0.0'){
      const polyline = new google.maps.Polyline({
        path: [
          { lat: parseFloat(location.LatitudPlan), lng: parseFloat(location.LongitudPlan) }, // Punto 1
          { lat: parseFloat(location.LatitudReal), lng: parseFloat(location.LongitudReal) }, // Punto 2
        ],
        geodesic: true, // Para que la línea siga la curvatura de la Tierra
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
  
      // Añadir la línea al mapa
      polyline.setMap(this.map);
    }   

  }
}


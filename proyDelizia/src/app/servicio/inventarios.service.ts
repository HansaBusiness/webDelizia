import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MapaComponent implements OnInit {

  locations$!: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.locations$ = this.db.list('Inventarios/').valueChanges();
  }
}

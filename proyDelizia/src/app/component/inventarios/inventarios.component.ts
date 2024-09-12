import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})
export class InventariosComponent {
  datos: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['CodUsuario', 'Nombre', 'Estado', 'FechaInicio', 'FechaFin'];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list('Inventarios').valueChanges().subscribe((data) => {
      this.datos = data;
      this.dataSource.data = this.datos; 
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  // Aplicar filtro
  }
}

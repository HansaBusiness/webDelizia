import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  datos: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Bloqueado', 'CodUsuario', 'Nombre', 'Direccion', 'Email', 'Telefono', 'TipoUsuario', 'Latitud', 'Longitud'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list('Usuarios').valueChanges().subscribe((data) => {
      this.datos = data;
      this.dataSource.data = this.datos; 
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  // Aplicar filtro
  }


}

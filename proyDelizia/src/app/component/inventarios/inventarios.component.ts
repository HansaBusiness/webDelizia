import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})
export class InventariosComponent {
  data_xls: any[] = [];
  datos: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['CodInventario', 'CodUsuario', 'Nombre', 'Regional', 'Agencia', 'Supervisor','Estado', 'Observacion' ,'FechaInicio', 'FechaFin', 'Acciones'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list('Inventarios').valueChanges().subscribe((data) => {
      this.datos = data;
      this.dataSource.data = this.datos; 
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  // Aplicar filtro
  }

  MenuOpciones(obj_inv: any) {
    console.log(obj_inv.Estado);
  }


  // Método para manejar la carga del archivo Excel
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('No se puede cargar múltiples archivos');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* Leer el archivo Excel */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* Tomar la primera hoja */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* Convertir el contenido de la hoja en un array de objetos JSON */
      this.data_xls = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Ahora puedes enviar la data a Firebase
      this.uploadToFirebase(this.data_xls);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  // Método para enviar la data a Firebase
  uploadToFirebase(data: any[]): void {
    data.forEach((row, index) => {
      if (index > 0) { // Omitir la primera fila si son encabezados
        const [CodInventario, CodUsuario, CodUsuarioFecha, Direccion, Fecha, Id,	LatitudPlan, LongitudPlan, Nombre, Regional,	Supervisor, SupervisorFecha] = row;
        const newData = { CantItems:'0', CheckAgente:'false', CheckSupervisor:'false', CodInventario, CodUsuario, CodUsuarioFecha, Direccion, Estado:'Pendiente', Fecha,	FechaFin:'1900-01-01 00:00:00',	FechaInicio:'1900-01-01 00:00:00', Id,	LatitudPlan,	LatitudReal:'0.0',	LongitudPlan,	LongitudReal:'0.0',	Nombre, Observacion:'',	Regional,	Supervisor, SupervisorFecha };
        console.log(newData);
        // Enviar cada fila de datos a Firebase
        //this.db.list('Inventarios').push(newData);
        this.db.object(`Inventarios/${Id}`).set(newData);
      }
    });
  }

}

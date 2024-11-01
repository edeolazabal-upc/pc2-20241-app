import { Component, OnInit, ViewChild } from '@angular/core';
import { MinaService } from '../../service/mina.service';
import { Mina } from '../../model/mina';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-mina',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './list-mina.component.html',
  styleUrls: ['./list-mina.component.css']
})
export class ListarMinaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'fechaInicio', 'tipo'];
  dataSource = new MatTableDataSource<Mina>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Configuración del paginator

  constructor(private minaService: MinaService, private router: Router) { }

  ngOnInit() {
    this.cargarMinas();
  }

  cargarMinas() {
    this.minaService.listarMinas().subscribe(
      (response: Mina[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.paginator._changePageSize(3); // Cambia el tamaño de página a 3 registros
      });
  }
}

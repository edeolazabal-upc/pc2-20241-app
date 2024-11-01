import { Component, OnInit } from '@angular/core';
import { MinaService } from '../../service/mina.service';
import { Mina } from '../../model/mina';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
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
  minas: Mina[] = [];
  pageSize = 3;
  pageIndex = 0;

  constructor(private minaService: MinaService, private router: Router) { }

  ngOnInit() {
    this.cargarMinas(this.pageIndex, this.pageSize);
  }

  cargarMinas(page: number, size: number) {
    this.minaService.listarMinas(page, size).subscribe(
      response => this.minas = response,
      error => console.error('Error al listar minas', error)
    );
  }

  cambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarMinas(this.pageIndex, this.pageSize);
  }
}


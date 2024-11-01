import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mina } from '../model/mina';



@Injectable({
   providedIn: 'root'
})
export class MinaService {
   private apiUrl = 'http://localhost:8080/api/minas'; // URL del backend de Spring Boot

   constructor(private http: HttpClient) { }

   // Método para registrar una nueva mina
   registrarMina(mina: Mina): Observable<Mina> {
      return this.http.post<Mina>(`${this.apiUrl}/nuevo`, mina, {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      });
   }

   // Método para listar minas con paginación
   listarMinas(page: number, size: number): Observable<Mina[]> {
      return this.http.get<Mina[]>(`${this.apiUrl}?page=${page}&size=${size}`);
   }
}

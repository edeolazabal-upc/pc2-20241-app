import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MinaService } from '../../service/mina.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-crear-mina',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear-mina.component.html',
  styleUrls: ['./crear-mina.component.css']
})
export class CrearMinaComponent {
  minaForm: FormGroup;
  tiposMina = ['Tajo Abierto', 'Subterránea', 'Mixta'];

  constructor(
    private fb: FormBuilder,
    private minaService: MinaService,
    private snackBar: MatSnackBar
  ) {
    this.minaForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      tipo: ['', Validators.required],
      tonsProducidas: [0]  // opcional, con valor predeterminado de 0
    });
  }

  registrarMina() {
    if (this.minaForm.valid) {
      this.minaService.registrarMina(this.minaForm.value).subscribe(
        response => {
          this.snackBar.open('Mina registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.minaForm.reset();
        },
        error => {
          this.snackBar.open('Error al registrar la mina', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
 registroForm!: FormGroup; 

  constructor(private fb: FormBuilder) {

    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        edad: ['', [Validators.required, Validators.min(18)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmarPassword: ['', [Validators.required, Validators.minLength(8)]],
        terminos: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsIguales('password', 'confirmarPassword') }
    );
}

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noIguales: true });
      }
    };
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      console.warn("Formulario inválido, no se envió.");
      this.registroForm.markAllAsTouched();
      return;
    }

    console.log("Datos del formulario:", this.registroForm.value);
  }

}

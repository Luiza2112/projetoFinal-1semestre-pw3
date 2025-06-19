import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule], //CabecalhoComponent
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formAdicionar!: FormGroup; // O ! Declara que a variável será inicializada depois e impede erro de compilação
  formConsultar!: FormGroup;
  formDeletar!: FormGroup;
  formEditar!: FormGroup;

  listaFeedbacks: any[] = []; // any -> lista pode conter qualquer tipo de dado

  adicionar : boolean = false;

  /*constructor(private fb: FormBuilder) {
    this.formAdicionar = this.fb.group({
      username: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      })
    });
  } */

  constructor(private fb: FormBuilder) {
    this.criarForms();
  }

  criarForms() {
    this.formAdicionar = this.fb.group({
      remetente: ['', [Validators.required], [Validators.maxLength(50)]],
      destinatario: ['', [Validators.required], [Validators.maxLength(50)]],
      descricao: ['', [Validators.required], [Validators.maxLength(450)]],
      data: [new Date()] // Validar data
    });

    this.formConsultar = this.fb.group({
      id: ['', [Validators.required]]
    });

    this.formDeletar = this.fb.group({
      id: ['', [Validators.required]],
    });

    this.formEditar = this.fb.group({
      id: ['', [Validators.required]],
      remetente: ['', [Validators.required], [Validators.name], [Validators.maxLength(50)]],
      destinatario: ['', [Validators.required], [Validators.name], [Validators.maxLength(50)]],
      descricao: ['', [Validators.required], [Validators.maxLength(450)]],
      data: [new Date()] // Validar data
    });
  }

  onAdicionar(){
    if (this.formAdicionar.valid) {
    let novoFeedback = this.formAdicionar.value;

    this.listaFeedbacks.push(novoFeedback); // push adiciona

    // Limpar o formulário para poder inserir dados novos
    this.formAdicionar.reset();
  } else {
    alert('Formulário inválido!'); // Verificar lógica!!
  }
  }

  // Falta: Terminar Consultar e fazer Delete e Editar. Arrumar o css e terminar roteamento.

}

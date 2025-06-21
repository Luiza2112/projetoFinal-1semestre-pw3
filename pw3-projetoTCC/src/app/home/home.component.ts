import { Component } from '@angular/core';
import { CabecalhoComponent } from "../cabecalho/cabecalho.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CabecalhoComponent], //CabecalhoComponent
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
      remetente: ['', [Validators.required, Validators.maxLength(50)]],
      destinatario: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(450)]]
    });

    this.formConsultar = this.fb.group({
      id: ['', [Validators.required]],
      remetente: ['', [Validators.required, Validators.maxLength(50)]],
      destinatario: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(450)]]
    });

    this.formDeletar = this.fb.group({
      id: ['', [Validators.required]]
    });

    this.formEditar = this.fb.group({
      id: ['', [Validators.required]],
      remetente: ['', [Validators.required, Validators.maxLength(50)]],
      destinatario: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(450)]]
    });
  }

  onAdicionar() {
    if (this.formAdicionar.valid) {
      const novoFeedback = this.formAdicionar.value;

      this.listaFeedbacks.push(novoFeedback);

      this.formAdicionar.reset();
      alert('Feedback criado com sucesso.');
    } else {
      alert('Feedback inválido!');
    }
  }

  onConsultar() {
    const id = this.formConsultar.value.id;

    if (id >= 0 && id < this.listaFeedbacks.length) {
      const feedback = this.listaFeedbacks[id];
      this.formConsultar.controls['remetente'].setValue(feedback.remetente);
      this.formConsultar.controls['destinatario'].setValue(feedback.destinatario);
      this.formConsultar.controls['descricao'].setValue(feedback.descricao);
      //alert('Remetente: ' + feedback.remetente + '\nDestinatário: ' + feedback.destinatario + '\nDescrição: ' + feedback.descricao);
    } else {
      this.formConsultar.controls['remetente'].setValue('');
      this.formConsultar.controls['destinatario'].setValue('');
      this.formConsultar.controls['descricao'].setValue('');
      alert('Nenhum feedback com esse ID.');
    }
  }

  onDeletar() {
    const id = this.formDeletar.value.id;

    if (id >= 0 && id < this.listaFeedbacks.length) {
      this.listaFeedbacks.splice(id, 1); // Remove 1 item no índice "id"
      this.formDeletar.reset();
      alert('Feeback foi deletado.')
    } else {
      alert('Nenhum feedback com esse ID.');
    }
  }
}

  // Falta: Terminar Consultar e fazer Delete e Editar. Arrumar o css e terminar roteamento.

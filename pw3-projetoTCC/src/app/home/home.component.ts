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
      descricao: ['', [Validators.required, Validators.maxLength(450)]],
      data: ['']
    });

    this.formConsultar = this.fb.group({
      id: ['', [Validators.required]],
      remetente: ['', [Validators.required, Validators.maxLength(50)]],
      destinatario: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(450)]],
      data: ['']
    });

    this.formDeletar = this.fb.group({
      id: ['', [Validators.required]]
    });

    this.formEditar = this.fb.group({
      id: ['', [Validators.required]],
      remetente: ['', [Validators.required, Validators.maxLength(50)]],
      destinatario: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(450)]],
      data: ['']
    });
  }

  onAdicionar() {
    if (this.formAdicionar.valid) {
      const dataAtual = this.formatarDataAtual();
      this.formAdicionar.get('data')?.setValue(dataAtual);

      const novoFeedback = this.formAdicionar.value;

      this.listaFeedbacks.push(novoFeedback);

      this.formAdicionar.reset();
      alert("Feedback criado com sucesso.");
    } else {
      alert("Feedback inválido!");
    }
  }

  onConsultar() {
    const id = this.formConsultar.value.id;

    if (id >= 0 && id < this.listaFeedbacks.length) {
      const feedback = this.listaFeedbacks[id];
      this.formConsultar.controls['remetente'].setValue(feedback.remetente);
      this.formConsultar.controls['destinatario'].setValue(feedback.destinatario);
      this.formConsultar.controls['descricao'].setValue(feedback.descricao);
      this.formConsultar.controls['data'].setValue(feedback.data);
      //alert('Remetente: ' + feedback.remetente + '\nDestinatário: ' + feedback.destinatario + '\nDescrição: ' + feedback.descricao);
    } else {
      this.formConsultar.controls['remetente'].setValue('');
      this.formConsultar.controls['destinatario'].setValue('');
      this.formConsultar.controls['descricao'].setValue('');
      this.formConsultar.controls['data'].setValue('');
      alert("Nenhum feedback com esse ID.");
    }
  }

  onDeletar() {
    const id = this.formDeletar.value.id;

    if (id >= 0 && id < this.listaFeedbacks.length) {
      this.listaFeedbacks.splice(id, 1); // Remove 1 item no índice "id"
      this.formDeletar.reset();
      alert("Feeback foi deletado.")
    } else {
      alert("Nenhum feedback com esse ID.");
    }
  }

  onEditar(){
    const id = this.formEditar.value.id;

    if (id >= 0 && id < this.listaFeedbacks.length) {
      const feedbackEditado = {
      remetente: this.formEditar.value.remetente,
      destinatario: this.formEditar.value.destinatario,
      descricao: this.formEditar.value.descricao,
      data: [this.formatarDataAtual()]
      };

      this.listaFeedbacks[id] = feedbackEditado;

      alert("Feedback atualizado com sucesso!");
      this.formEditar.reset();

    }
    else{
      alert("Nenhum feedback com esse ID.");
    }

  }

  formatarDataAtual(): string{
    const data = new Date();
    return data.toISOString().split('T')[0].split('-').reverse().join('/');
    // Pegando só a parte da data, sem horário, tirando o hífen, invertendo para o formato dia/mês/ano e colocando barra.
  }
}

  // Falta: Terminar Consultar e fazer Delete e Editar. Arrumar o css e terminar roteamento.

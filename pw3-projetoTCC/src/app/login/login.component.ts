import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  userBase : string = 'Marion';
  passwordBase : string = '123HAS';
  login : boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      {validators: this.mesmaSenhaValidator})
    });
  }

  submit() {
    if (this.loginForm.valid) {
      alert('Formulário válido');
    } else {
      alert('Formulário inválido');
    }
  }
                        //tipo                    //tipo             //retorno
  mesmaSenhaValidator : ValidatorFn = (formGroup : AbstractControl): ValidationErrors | null => {
    let senha = formGroup.get('password')?.value;
    let confirmarSenha = formGroup.get('confirmPassword')?.value;

    if(senha !== confirmarSenha){
      return{senhasDiferentes : true};
    }

    return null;
  }

    onAutenticar(){
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;

    if(username == this.userBase && password == this.passwordBase){
      this.login = true;
      alert("Marion");
    }
    else{
      this.login = false;
      alert("NoMarion");
    }

  }
}

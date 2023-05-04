import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.intializeForm();
  }

  intializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('Hello',Validators.required),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  register() {
    // this.accountService.register(this.model).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   error: error => {
    //     console.log(error)
    //     const errs = error.error.errors;
    //     if (errs) {
    //       const key = Object.keys(errs)[0];
    //       this.toastr.error(errs[key] ? errs[key] : 'bad request')

    //     }
    //   }
    // })
    console.log(this.registerForm?.value);
  }

   cancel() {
    this.cancelRegister.emit(false);
   }

}

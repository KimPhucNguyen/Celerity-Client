import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get abstract(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public login():void{
    this.authService.login(this.form.value);
  }
}

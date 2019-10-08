import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  authenticate() {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    
    this.shared.login(username, password).subscribe(response => {
      
      localStorage.setItem('token', response['token']);
      localStorage.setItem('user', JSON.stringify(response['user']));

      this.router.navigate(['/dashboard']);

    }, (error) => {
      this.loginForm.reset();
    })
  }

}

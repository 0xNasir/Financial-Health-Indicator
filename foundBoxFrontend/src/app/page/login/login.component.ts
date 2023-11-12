import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FoundboxService} from "../../shared/service/foundbox.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup = this.fb.group({});
  showLoading = false;

  constructor(
    private fb: FormBuilder,
    private foundBoxService: FoundboxService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.showLoading = true;
      this.foundBoxService.postLogin(this.form.value).subscribe(response => {
        this.showLoading = false
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        this.router.navigateByUrl('/home')
      }, error => {
        this.showLoading = false;
        this.snackBar.open(error.error['detail'], 'Close', {duration: 2000});
      })
    }
  }
}

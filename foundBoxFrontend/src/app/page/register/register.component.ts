import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FoundboxService} from "../../shared/service/foundbox.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup = this.fb.group({});
  showLoading = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private foundBoxService: FoundboxService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.form.valid) {
      if (this.form.value.password != this.form.value.password2) {
        this.snackBar.open('Confirm password didn\' match', 'Close', {duration: 2000});
        return;
      }
      this.showLoading = true;
      this.foundBoxService.postRegister(this.form.value).subscribe(response => {
        this.showLoading = false
        this.snackBar.open('Registration success.', 'Close', {duration: 2000});
        this.router.navigateByUrl('/login');
      }, error => {
        this.error = error.error;
        this.showLoading = false;
        if (this.error['detail']!=undefined){
          this.snackBar.open(this.error['detail'][0], 'Close', {duration: 2000});
        }else{
          this.snackBar.open('Invalid form', 'Close', {duration: 2000});
        }
      })
    }
  }

}

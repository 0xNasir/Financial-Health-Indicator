import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FoundboxService} from "../../../shared/service/foundbox.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'dialog-finance-popup',
  templateUrl: 'finance.component.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule, NgIf],
})
export class FinancePopComponent implements OnInit {
  form: any;

  constructor(
    public dialogRef: MatDialogRef<FinancePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foundboxService: FoundboxService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      income: [this.data?.income || '', Validators.required],
      expenses: [this.data?.expenses || '', Validators.required],
      debts: [this.data?.debts || '', Validators.required],
      assets: [this.data?.assets || '', Validators.required],
    });
  }

  submitForm() {
    if (this.form.valid) {
      if(this.data.id!=undefined){
        this.foundboxService.putFinancialData(this.data.id, this.form.value).subscribe(res => {
          this.snackBar.open('Financial Data is updated', 'Close', {duration: 2000});
          this.onNoClick();
        }, error => {
          this.snackBar.open('Something went wrong. Try again', 'Close', {duration: 2000});
        })
      }else{
        this.foundboxService.postFinancialData(this.form.value).subscribe(res => {
          this.snackBar.open('Financial Data is stored', 'Close', {duration: 2000});
          this.onNoClick();
        }, error => {
          this.snackBar.open('Something went wrong. Try again', 'Close', {duration: 2000});
        })
      }
    }
  }
}

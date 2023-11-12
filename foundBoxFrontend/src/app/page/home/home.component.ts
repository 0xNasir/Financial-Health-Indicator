import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FoundboxService} from "../../shared/service/foundbox.service";
import {MatDialog} from "@angular/material/dialog";
import {FinancePopComponent} from "./popup/finance.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tableMeta = [
    {label: 'ID', key: 'id'},
    {label: 'Title', key: 'title'},
    {label: 'Income', key: 'income'},
    {label: 'Expenses', key: 'expenses'},
    {label: 'Debts', key: 'debts'},
    {label: 'Assets', key: 'assets'}
  ]
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private router: Router,
    private foundBoxService: FoundboxService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = [];
    this.tableMeta.forEach(col => {
      this.displayedColumns.push(col.key)
    })
    this.displayedColumns.push('option')
    if (!localStorage.getItem('access')) {
      this.router.navigateByUrl('/login')
    }
    this.foundBoxService.getFinanceData().subscribe(response => {
      this.dataSource = response;
    }, error => {

    })
  }

  openPopUp(data: any = {}) {
    const dialogRef = this.dialog.open(FinancePopComponent, {
      height: 'auto',
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteRow(element: any) {
    if (confirm('You are deleting financial data')) {
      this.foundBoxService.deleteFinanceData(element.id).subscribe(response => {
        this.snackBar.open('Data is deleted', 'Close', {duration: 2000});
        this.ngOnInit();
      });
    }
  }
}

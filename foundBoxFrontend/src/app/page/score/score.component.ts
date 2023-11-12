import {Component, OnInit} from '@angular/core';
import {FoundboxService} from "../../shared/service/foundbox.service";
import {Router} from "@angular/router";
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  data: any;
  selectedData: any;
  debtRatio: number | undefined;
  expenseRatio: number | undefined;
  public health: number | undefined;
  public chart: any;
  public chart2: any;
  public chart3: any;

  constructor(private foundBoxService: FoundboxService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if (!localStorage.getItem('access')) {
      this.router.navigateByUrl('/login')
    }
    this.foundBoxService.getFinanceData().subscribe(response => {
      this.data = response;
    }, error => {

    })
  }

  generateScore($event: any) {
    this.selectedData = $event.value;
    this.debtRatio = Number(this.selectedData.assets) <= 0 ? 1 : Number(this.selectedData.debts) / Number(this.selectedData.assets);
    this.health = (Number(this.selectedData.expenses) + Number(this.selectedData.debts)) <= 0 ? 1 : (Number(this.selectedData.assets) + Number(this.selectedData.income)) / (Number(this.selectedData.expenses) + Number(this.selectedData.debts))
    this.health = (this.health > 1 ? 1 : this.health)*100;
    this.expenseRatio = Number(this.selectedData.income) == 0 ? 1 : Number(this.selectedData.expenses) / Number(this.selectedData.income)
    console.log(this.debtRatio)
    console.log(this.health)
    console.log(this.expenseRatio)
    this.createDebtChart(this.debtRatio * 100);
    this.createExpenseChart(this.expenseRatio * 100)
    this.createHealthChart(this.health)
  }

  createDebtChart(ratio: number) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("debtRatio", {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: [
          'Dept Ratio',
          'Remaining'
        ],
        datasets: [{
          label: 'Ratio',
          data: [ratio, 100 - ratio],
          backgroundColor: [

            'rgb(54, 162, 235)',
            'gray',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          title: {
            text: 'Debt Ratio',
            display: true,
            position: "bottom",
            align: 'center'
          }
        }
      }

    });
    this.chart.update();
  }

  createExpenseChart(ratio: number) {
    if (this.chart2) {
      this.chart2.destroy();
    }
    this.chart2 = new Chart("expenseRatio", {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: [
          'Expense Ratio',
          'Remaining'
        ],
        datasets: [{
          label: 'Ratio',
          data: [ratio, 100 - ratio],
          backgroundColor: [

            'rgb(54, 162, 235)',
            'gray',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          title: {
            text: 'Expense Ratio',
            display: true,
            position: "bottom",
            align: 'center'
          }
        }
      }

    });
    this.chart2.update();
  }

  createHealthChart(ratio: number) {
    if (this.chart3) {
      this.chart3.destroy();
    }
    this.chart3 = new Chart("healthScore", {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: [
          'Solvency',
          'Remaining'
        ],
        datasets: [{
          label: 'Ratio',
          data: [ratio, 100 - ratio],
          backgroundColor: [

            'rgb(54, 162, 235)', 'gray',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          title: {
            text: 'Financial Health Score',
            display: true,
            position: "bottom",
            align: 'center'
          }
        }
      }

    });
    this.chart3.update();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  apiResponse = [
    {
      title: 'users',
      status: '',
      statusCode: '',
      statusText: '',
    },
    {
      title: 'transactionstats',
      status: '',
      statusCode: '',
      statusText: '',
    },
  ];

  statsData: any;
  userListData: any;

  apiBase = 'https://630369f20de3cd918b34e9e.mockapi.io/';

  displayedStatsColumns = ['label', 'rate'];
  displayedUserListColumns = ['avatar', 'name'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataFromApi('transactionstats');
    this.getDataFromApi('users');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userListData.filter = filterValue.trim().toLowerCase();
  }

  getDataFromApi(title: any) {
    this.http.get(`${this.apiBase}${title}`).subscribe(
      (response: any) => {
        if (title === 'transactionstats') {
          this.statsData = new MatTableDataSource(response);
		  this.apiResponse[0].status = 'success';
        } else {
          this.userListData = new MatTableDataSource(response);
		  this.apiResponse[1].status = 'success';
        }
      },
      (error: any) => {
		if(title === 'transactionstats'){
			this.apiResponse[0].status = 'error';
			this.apiResponse[0].statusCode = error.status;
			this.apiResponse[0].statusText = error.statusText;
		}
		else{
			this.apiResponse[1].status = 'error';
			this.apiResponse[1].statusCode = error.status;
			this.apiResponse[1].statusText = error.statusText;
		}
        
      }
    );
  }
}

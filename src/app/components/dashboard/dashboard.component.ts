import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

// export interface StatsList {
//     label: string;
//     rate: number;
//   }

//   export interface UserList {
//     avatar: string;
//     name: string;
//   }
export class DashboardComponent implements OnInit {
  statsData: any;
  userListData: any;

  apiBase = 'https://630369f20de3cd918b34e39e.mockapi.io/';

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
        } else {
          this.userListData = new MatTableDataSource(response);
        }
      },
      (error: any) => {}
    );
  }
}

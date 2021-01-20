import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { UserService } from '../services/users/user.service';



export class PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  type: string;
  action: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isNewUser: boolean;
  users: any[] = [];
  searchUser: string;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers('none');
  }

  backToUserList(event) {
    this.loadUsers('add');
  }

  loadUsers(value) {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data;
          if (value === 'add' || value === 'delete') {
          }
          this.isNewUser = false;
        },
        error => { console.log(error + ''); }
      );
  }

  newEmployee() {
    this.isNewUser = true;
  }


  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }



  closeCreateUser(even: boolean) {
    this.loadUsers('add');
    this.isNewUser = false;
  }


}

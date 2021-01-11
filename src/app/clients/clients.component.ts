import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/users/user.service';
import { PeriodicElement } from '../users/users.component';


export class ClientElement {

}
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<PeriodicElement>;
  isNewUser: boolean;


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'type', 'action'];
  displayedColumns: string[] = ['id', 'name'];
  // dataSource = ELEMENT_DATA;
  newPeriod: PeriodicElement;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers('none');
  }


  loadUsers(value) {
    this.userService.getClients()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          // this.table.renderRows();
          if (value === 'add' || value === 'delete') {
            window.location.reload();
          }
        },
        error => { console.log(error + ''); }
      );
  }

  newEmployee() {
    this.isNewUser = true;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  backToProduct(even: boolean) {
    // if (even) {}
    this.loadUsers('add');
    this.isNewUser = even;
  }

  openDialog(element): void {
    // const dialogRef = this.dialog.open(DialogOverviewExampleComponent, {
    //   width: '250px',
    //   data: {name: element.name, productid: element.id}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}

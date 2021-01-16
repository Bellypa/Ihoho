import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-partner-services',
  templateUrl: './partner-services.component.html',
  styleUrls: ['./partner-services.component.scss']
})
export class PartnerServicesComponent implements OnInit {
  @ViewChild('table', { static: false }) table: MatTable<Element>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  isNewUser: boolean;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'type', 'action'];
  displayedColumns: string[] = ['names', 'role'];
  // dataSource = ELEMENT_DATA;
  // newPeriod: PeriodicElement;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadPartnerService('add');
  }

  loadPartnerService(value) {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          // this.table.renderRows();
          if (value === 'add' || value === 'delete') {
            // window.location.reload();
          }
          this.isNewUser = false;
        },
        error => { console.log(error + ''); }
      );
  }

}

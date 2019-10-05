import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { SharedService } from './../../services/shared.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatTable, null) table: MatTable<any>;
  displayedColumns: string[] = ['name', 'phone', 'role', 'active', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  
  villages: any[] = [];

  selectedUser: any;
  currentVillage: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('ngForm', null) ngForm: NgForm;

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private shared: SharedService) { 
    this.createUserForm();
  }

  ngOnInit() {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.shared.villages.subscribe(villages => this.villages = villages);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generatePassword() {
    return Math.random().toString(36).slice(8) + Math.random().toString(36).slice(8)
  }

  createUserForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl(null, Validators.required),
      password: new FormControl(this.generatePassword()),
      VillageId: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  saveUser() {
    if (this.userForm.invalid) return;

    if (typeof this.selectedUser == 'object' && Object.keys(this.selectedUser).length > 0) { // update user
      this.shared.updateUser(this.selectedUser.id, this.userForm.value).subscribe(response => {
        this.userForm.reset();
        this.userForm.clearValidators();
        this.ngForm.resetForm({ password: this.generatePassword() });
        this.selectedUser = {};
        this.getUsers();
      });
    } else {
      // new user
      this.shared.addUser(this.userForm.value).subscribe(response => {
        this.userForm.reset();
        this.ngForm.resetForm({ password: this.generatePassword() });
        this.userForm.clearValidators();

        const newUser = { ...response['user'] };
        newUser.position = newUser.id;
        newUser.name = `${newUser.firstName} ${newUser.lastName}`;
        newUser.active = (newUser.active) ? 'Yes' : 'No';

        this.dataSource.data.push(newUser);
        this.table.renderRows();
        this.getUsers();
      });
    }
  }

  editUser(user) {
    user = { ...user };
    this.selectedUser = { ...user };

    user.password = '';
    delete user.id;
    delete user.active;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.position;
    delete user.name;

    this.userForm.setValue(user);
  }

  getUsers() {
    this.shared.getUsers().subscribe(
      (response) => {
        const users: Array<any> = response['users'];
        users.map((user, index) => {
          user.position = index;
          user.name = `${user.firstName} ${user.lastName}`;
          user.active = (user.active) ? 'Yes' : 'No';
        })
        this.dataSource.data = users;
      }
    )
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { map } from 'bluebird';


@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {

  villageForm: FormGroup;
  villages: Array<any> = [];

  displayedColumns: string[] = ['id', 'name', 'district', 'pincode'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable, null) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('ngForm', null) ngForm: NgForm;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getVillages();
    this.createVillageForm();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createVillageForm() {
    this.villageForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      pincode: new FormControl(null, [Validators.required])
    })
  }

  getVillages() {
    this.sharedService.getVillages().subscribe(res => {
      this.sharedService.villages.next(res['villages']);
      this.dataSource.data = res['villages'];
    })
  }

  saveVillage() {
    if (this.villageForm.invalid) return;
    this.villageForm.markAsPristine()    
    this.sharedService.addVillage(this.villageForm.value).subscribe(_ => {
      this.ngForm.resetForm();
      this.getVillages();
    });
  }

  resetVillageForm() {
    this.ngForm.resetForm();
  }

}

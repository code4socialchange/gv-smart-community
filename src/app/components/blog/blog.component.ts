import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QuillViewComponent } from 'ngx-quill';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('editor', null) editor: QuillViewComponent;
  @ViewChild('ngForm', null) ngForm: NgForm;

  blogForm: FormGroup;
  selectedBlog: any;

  constructor(private shared: SharedService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createBlogForm();
    this.getBlogs();
  }

  createBlogForm() {
    this.blogForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBlogs() {
    this.shared.getBlogs().subscribe(response => this.dataSource.data = response['blogs']);
  }

  editBlog(blog) {
    this.selectedBlog = { ...blog };

    this.shared.getBlogbyId(blog.id).subscribe(res => {
      
      delete blog.id;
      delete blog.createdAt;
      delete blog.updatedAt;

      blog.content = res['blog'].content;
      
      this.blogForm.patchValue(blog);

    })

  }

  saveBlog() {

    if (this.blogForm.invalid) return;

    if (typeof this.selectedBlog == 'object' && Object.keys(this.selectedBlog).length > 0) {

      this.shared.updateBlog(this.selectedBlog.id, this.blogForm.value).subscribe(response => {
        this.ngForm.resetForm();
        this.selectedBlog = {};
        this.getBlogs();
      })

    } else { // create blog

      this.shared.addBlog({ blog: this.blogForm.value }).subscribe(response => {
        this.ngForm.resetForm();
        this.getBlogs();
      })

    }
  }

  resetBlogForm() {
    this.ngForm.resetForm();
  }

}

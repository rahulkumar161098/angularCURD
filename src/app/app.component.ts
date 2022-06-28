import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component'
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'curdOperation';
  displayedColumns: String[] = ['productName', 'category', 'price', 'date', 'action'];
  // the source code where you got all data
  dataSource = new MatTableDataSource<any>();


  products:any ;
  constructor(private dialog: MatDialog, private api: ApiService){  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  

  ngOnInit(): void {
    this.getAllProduct()
    console.log('mgoninit',this.getAllProduct());
    
  }

  openDialog() {
    this.dialog.open(DialogComponent,{
      width: '30%'
    })
    // after closing dialog box this method is called
    .afterClosed().subscribe(val=>{
      if(val==="save"){
        this.getAllProduct()
      }
    })

  }

  // getting all product method
  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(data)=>{
        this.dataSource= new MatTableDataSource(data)
        // this.products=data;
        console.log('.................',this.products); 
      },
      error:()=>{
        alert('Something went wrong')
      }
    })
  }
// edit product method
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    })
    // after closing dialog box this method is called
    .afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProduct()
      }
    })
  }

  // delete product method
  deleteProduct(id:number){
    this.api.delData(id)
    .subscribe({
      next:()=>{
        alert('Product delete successfully!');
        this.getAllProduct();
      },
      error:()=>{
        alert('Somthing went wrong!');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

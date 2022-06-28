import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
// import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  prodcutForm !: FormGroup
  actionBtn: string= "Save"

  constructor(private fb:FormBuilder, 
    private api: ApiService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>,) { }

  freshLevel= ['Fresh', 'Second', 'Refurbished']

  ngOnInit(): void {
    this.prodcutForm= new FormGroup({
      p_name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      feed: new FormControl('', Validators.required)
    })
    console.log(this.editData);
    if(this.editData){
      this.actionBtn= "Update"
      this.prodcutForm.controls['p_name'].setValue(this.editData.p_name)
      this.prodcutForm.controls['category'].setValue(this.editData.category)
      this.prodcutForm.controls['date'].setValue(this.editData.date)
      this.prodcutForm.controls['level'].setValue(this.editData.level)
      this.prodcutForm.controls['price'].setValue(this.editData.price)
      this.prodcutForm.controls['feed'].setValue(this.editData.feed)

    }
  }
   
  // add product
  addProduct(){
    // edit data if update
    if(!this.editData){
      // else save data
      if(this.prodcutForm.valid){
        this.api.postProduct(this.prodcutForm.value)
        .subscribe({
          next:(res)=>{
            alert('Product add successfully!');
            this.prodcutForm.reset();
            this.dialogRef.close();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert('Something went wrong!')
          }
        })
      }
    }
    // call update method
    else{
      this.updateProduct();
    }
  }
  // update product method 
  updateProduct(){
    this.api.updateData(this.prodcutForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Update Successfully");
        this.prodcutForm.reset();
        this.dialogRef.close();
        this.dialogRef.close('update')
      },
      error:()=>{
        alert('Something went worng')
      }
    })
  }

}

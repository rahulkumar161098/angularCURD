import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  prodcutForm !: FormGroup
  constructor(private fb:FormBuilder) { }
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
  }
  
  addProduct(){
    console.log(this.prodcutForm.value);
    
  }


}

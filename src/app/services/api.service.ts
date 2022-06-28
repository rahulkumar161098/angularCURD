import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/productLists/", data)
  }

  getProduct(){
    return this.http.get<any>('http://localhost:3000/productLists/')
  }

  updateData(data:any, id:number){
    return this.http.put<any>('http://localhost:3000/productLists/'+id, data)
  }

  delData(id:number){
    return this.http.delete('http://localhost:3000/productLists/'+id)
  }
}

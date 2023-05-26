import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>

  constructor() {
    this.products = [
      {id: UUID.UUID(),  name: "Computer",    price: 4200, promotion: true},
      {id: UUID.UUID(),  name: "Printer",     price: 1600, promotion: false},
      {id: UUID.UUID(),  name: "Smart Phone", price: 8500, promotion: true},
    ]

    for (let i=0; i<10; i++){
      this.products.push({id: UUID.UUID(), name: "Product_A" + i.toString(), price: i*100, promotion: false})
      this.products.push({id: UUID.UUID(), name: "Product_B" + i.toString(), price: i*100+10, promotion: true})
      this.products.push({id: UUID.UUID(), name: "Product_C" + i.toString(), price: i*100+20, promotion: false})
    }
  }

  public getAllProducts() : Observable<Product[]> {
    return of(this.products)
  }

  public getPageProducts(page : number, size : number) : Observable<PageProduct> {
    let index = page * size
    let totalPages = ~~(this.products.length / size)
    if (this.products.length % size != 0)
      totalPages++
    let pageProducts = this.products.slice(index, index + size)
    return of({page:page, size:size, totalPages:totalPages, products:pageProducts})
  }
  public saveProduct(product:Product) :Observable<Product>{
    product.id=UUID.UUID()
    this.products.push(product)
    return of(product)
  }
  public deleteProduct(id: string) :Observable<boolean> {
    this.products = this.products.filter(p=> p.id != id )
    return of(true)
  }

  SetPromotion(id: string) {
    let product = this.products.find(p => p.id == id)
    if (product != undefined) {
      product.promotion =! product.promotion;
      return of(true)
    } else return throwError(() => Error("Product not found"))
  }

  public searchProducts(keyword : string, page : number, size : number) : Observable<PageProduct> {
    let result = this.products.filter(p => p.name.toUpperCase().includes(keyword.toUpperCase()))
    let index = page * size
    let totalPages = ~~(result.length / size)
    if (this.products.length % size != 0)
      totalPages++
    let pageProducts = result.slice(index, index + size)
    return of({page : page, size : size, totalPages : totalPages, products : pageProducts})
  }

  public getProduct(id : string) : Observable<Product>{
    let product = this.products.find(p=> p.id == id)
    if(product) return of(product)
    else return throwError(() => new Error("Product not found"))
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products = this.products.map(p=> (p.id == product.id) ? product : p)
    return of(product)
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors) : string {
    if(errors['required'])  return fieldName + " is Required";
    if(errors['minlength'])  return fieldName + " should have at least " + errors['minlength']['requiredLength'] + " Characters";
    if(errors['min']) return fieldName + " should have min value " + errors['min']['min'];
    return ""
  }
}

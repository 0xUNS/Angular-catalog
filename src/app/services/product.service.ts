import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.models";
import {UUID} from "angular2-uuid";

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
}

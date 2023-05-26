import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  productId !: string
  productFormGroup! : FormGroup;
  errorMessage! : string ;
  constructor(private fb : FormBuilder, public productService : ProductService, private route : ActivatedRoute, private router : Router) { }
  ngOnInit(): void{
    this.productId = this.route.snapshot.params['id'];
    if(this.productId){
      this.productService.getProduct(this.productId).subscribe({
        next :(data)=>{
          this.productFormGroup=this.fb.group({
            id : this.fb.control(data.id),
            name : this.fb.control(data.name, [Validators.required, Validators.minLength(4)]),
            price : this.fb.control(data.price, [Validators.required, Validators.min(10)]),
            promotion : this.fb.control(data.promotion),
          });
        },
        error : err => this.errorMessage=err
      });
    }
  }

  handleUpdateProduct() {
    this.productService.updateProduct(this.productFormGroup.value).subscribe({
      next : data=>{
        alert("Product has been successfully updated")
        this.router.navigateByUrl("/admin/products")
      },
      error : err => this.errorMessage = err
    })
  }
}

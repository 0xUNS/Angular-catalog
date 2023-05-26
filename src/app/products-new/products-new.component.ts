import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {
  productFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, public productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required, Validators.minLength(4)]),
      price : this.fb.control(0, [Validators.required, Validators.min(10)]),
      promotion : this.fb.control(false)
    })
  }

  handleSaveProduct() {
    let product = this.productFormGroup.value
    this.productService.saveProduct(product).subscribe({
      next :(data)=>{
        alert("Product saved successfully")
        this.productFormGroup.reset()
        this.router.navigateByUrl("/admin/products")
      }
    });
  }
}

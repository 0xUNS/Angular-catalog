import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ProductsNewComponent} from "./products-new/products-new.component";
import {ProductsEditComponent} from "./products-edit/products-edit.component";

const routes: Routes = [
	{path: "", component: LoginComponent},
	{path: "login", component: LoginComponent},
	{path: "admin", component: AdminTemplateComponent, canActivate : [AuthenticationGuard],
		children : [
			{path: "products", component: ProductsComponent},
      {path: "new-product", component: ProductsNewComponent},
      {path: "edit-product/:id", component: ProductsEditComponent},
      {path: "customers", component: CustomersComponent},
		]},
	];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

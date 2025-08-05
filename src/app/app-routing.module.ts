import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyBillComponent } from './pages/company-bill/company-bill.component';
import { CustomerBillComponent } from './pages/customer-bill/customer-bill.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customer-bill', component: CustomerBillComponent },
  { path: 'company-bill', component: CompanyBillComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

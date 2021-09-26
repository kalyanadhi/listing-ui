import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
//import 'rxjs/add/operator/filter';import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.sass']
})
export class ProductListingComponent implements OnInit {
  keyword: string;
  routeNavSubscription: Subscription;
  searchResultItem: any;
  searchResultCount: number;
  loading: boolean = false;
  searchFilterForm: FormGroup;
  minPrice: number;
  maxPrice: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loadSearchFilterForm();
    console.log("Inside list init")
    this.routeNavSubscription = this.route.queryParams.subscribe(params => {
      console.log("Inside route subscribe")
      if (Object.keys(params).length > 0) {
        this.keyword = params['keyword'];
        if(params['minPrice'] && params['maxPrice']){
          this.maxPrice = params['maxPrice'];
          this.minPrice = params['minPrice'];
        }
        this.getApiService();
      }
    });

    //this.routeNavSubscription.unsubscribe();
  }

  getApiService() {
    this.loading = true;
    let searchFilterReqData = {}
    if(this.keyword){
      searchFilterReqData['keyword'] = this.keyword;
    }
    if(this.maxPrice && this.minPrice){
      searchFilterReqData['maxPrice'] = this.maxPrice;
      searchFilterReqData['minPrice'] = this.minPrice;
    }
    this.http.post<any>('https://2sqpa9ibs9.execute-api.us-east-1.amazonaws.com/', searchFilterReqData).subscribe(response => {
      let searchResult = response.findItemsByKeywordsResponse[0].searchResult;

      if (searchResult.length > 0) {
        searchResult.forEach(element => {
          this.searchResultItem = element['item'];
          this.searchResultCount = element['@count'];
        });
        this.loading = false;
      }
    });
  }

  productImage(galleryURL) {
    if (galleryURL.length > 0 && galleryURL[0] != "") {
      return galleryURL[0]
    }
    else {
      return "../../assets/images/placeholder.png";
    }
  }

  loadSearchFilterForm() {
    this.searchFilterForm = this.formBuilder.group({
      minValue: ['', []],
      maxValue: ['', []],
    });
  }

  valueRangeValidation() {
    let minValue = this.searchFilterForm.value.minValue;
    let maxValue = this.searchFilterForm.value.maxValue;
    if (minValue && maxValue) {
      if (maxValue < minValue) {
        console.log("Max price is lesser than Min price")
        this.searchFilterForm.controls.maxValue.reset("");
      }
      else {
        this.router.navigate(['/'], { queryParams: { minPrice: minValue, maxPrice: maxValue }, queryParamsHandling: 'merge' });
        //this.router.navigate(['/users'], { queryParams: { filter: 'new' }, queryParamsHandling: 'merge' });
        return;
      }
    }
  }

}

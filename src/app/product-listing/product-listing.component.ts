import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
//import 'rxjs/add/operator/filter';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    console.log("Inside list init")
    this.routeNavSubscription = this.route.queryParams.subscribe(params => {
      console.log("Inside route subscribe")
      if (Object.keys(params).length > 0) {
        this.keyword = params['keyword'];
        this.getApiService();
      }
    });

    //this.routeNavSubscription.unsubscribe();
  }

  getApiService() {
    console.log("Inside getApiService - " + this.keyword);
    //console.log(this.keyword);
    // this.http.get<any>('https://2sqpa9ibs9.execute-api.us-east-1.amazonaws.com/').subscribe(response => {
    //   console.log(response);
    // })
    this.http.post<any>('https://2sqpa9ibs9.execute-api.us-east-1.amazonaws.com/', {keyword: this.keyword}).subscribe(response => {
      let searchResult = response.findItemsByKeywordsResponse[0].searchResult;

      if(searchResult.length > 0){
        searchResult.forEach(element => {
          this.searchResultItem = element['item'];
          this.searchResultCount = element['@count'];
        });
      }

      console.log(this.searchResultItem);
    })

  }

  productImage(galleryURL){
    if(galleryURL.length > 0 && galleryURL[0] != ""){
      return galleryURL[0]
    }
    else{
      return "../../assets/images/placeholder.png";
    }
  }

}

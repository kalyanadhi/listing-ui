import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  searchControl = new FormControl;

  constructor(private apiService: ApiServicesService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  navigateToSearch(){
    let keyword = this.searchControl.value;
    console.log(keyword)
    if(keyword){
      this.http.get<any>('https://2sqpa9ibs9.execute-api.us-east-1.amazonaws.com/').subscribe(response => {
        console.log(response);
      })
    }
  }

}

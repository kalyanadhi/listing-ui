import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ApiServicesService } from '../services/api-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  searchControl = new FormControl;

  constructor(private apiService: ApiServicesService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  navigateToSearch() {
    let keyword = this.searchControl.value;
    if (keyword) {
      this.router.navigate(['/'], { queryParams: { keyword: keyword } });
      return;
    }
    else{
      this.router.navigate(['/']);
      return;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading-indicator',
  template: `
    @if(loading){
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    }
  `,
  styleUrl: './loading-indicator.component.css'
})
export class LoadingIndicatorComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading$.subscribe((loading) => {
      this.loading = loading;
    });
  }
}

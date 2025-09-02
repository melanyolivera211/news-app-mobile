import { Component, OnInit } from '@angular/core';
import { Loader } from '@shared/services/loader/loader';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent implements OnInit {
  public isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  public constructor(private loadingService: Loader) {}

  public ngOnInit() {}
}

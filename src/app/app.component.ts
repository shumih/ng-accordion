import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { delay, mapTo, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public loading = false;
  public closeOthers = false;

  public message$ = of(null).pipe(
    tap(() => (this.loading = true)),
    delay(2500),
    tap(() => (this.loading = false)),
    mapTo('ASYNC DATA')
  );
}

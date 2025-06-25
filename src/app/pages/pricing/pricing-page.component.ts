import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private _title = inject(Title);
  private _meta = inject(Meta);
  private _platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // document.title = 'Pricing page';
    // console.log(isPlatformServer(this._platform));
    this._title.setTitle(' Pricing Page');
    this._meta.updateTag({
      name: 'description',
      content: 'Mi página de Pricing Page',
    });
    this._meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this._meta.updateTag({ name: 'keywords', content: 'course, Angular, SSR' });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle(' About Page');
    this._meta.updateTag({
      name: 'description',
      content: 'Mi página de About Page',
    });
    this._meta.updateTag({ name: 'og:title', content: 'About Page' });
    this._meta.updateTag({ name: 'keywords', content: 'course, Angular, SSR' });
  }
}

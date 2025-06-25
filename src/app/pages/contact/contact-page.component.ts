import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent {
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    this._title.setTitle(' Contact Page');
    this._meta.updateTag({
      name: 'description',
      content: 'Mi página de Contact Page',
    });
    this._meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this._meta.updateTag({ name: 'keywords', content: 'course, Angular, SSR' });
  }
}

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CoreModule } from '@appcore/core.module';

/**
 * Service responsible for setting the title that appears above the components and guide pages.
 */
@Injectable({ providedIn: CoreModule })
export class PageTitleService {
  _defaultTitle = 'MEAN Material App';
  _title = '';

  get title(): string { return this._title; }

  set title(title: string) {
    this._title = title;
    if (title !== '') {
      title = `${title} | `;
    }
    this.bodyTitle.setTitle(title + this._defaultTitle);
  }

  constructor(private bodyTitle: Title) {
    this.bodyTitle.setTitle(this._defaultTitle);
  }

}

import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule,
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule, TdMediaService,
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as seriesDetails from '../../testing/series-details.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../../people/list-people/list-people.component';
import { ListSeriesComponent } from '../list-series/list-series.component';
import { FooterComponent } from '../../footer/footer.component';
import { MovieImagesComponent } from '../../movies/movie-images/movie-images.component';
import { MovieVideosComponent } from '../../movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from '../../movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../../movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../../movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from '../series-details/series-details.component';
import { SeriesImagesComponent } from './series-images.component';
import { SeriesVideosComponent } from '../series-videos/series-videos.component';
import { FormatStringPipe } from '../../shared/format-string/format-string.pipe';
import { SeriesCastComponent } from '../series-cast/series-cast.component';
import { SeriesRecommendationsComponent } from '../series-recommendations/series-recommendations.component';
import { PersonDetailsComponent } from '../../people/person-details/person-details.component';
import { PersonMoviesComponent } from '../../people/person-movies/person-movies.component';
import { PersonSeriesComponent } from '../../people/person-series/person-series.component';
import { PersonImagesComponent } from '../../people/person-images/person-images.component';
import { SearchComponent } from '../../search/search.component';
import { SearchBarComponent } from '../../search/search-bar/search-bar.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { DiscoverComponent } from '../../discover/discover.component';
import { CustomCardComponent } from '../../shared/custom-card/custom-card.component';
import { LimitTextComponent } from '../../shared/limit-text/limit-text.component';
import { API } from '../../shared/api/api';
import { SeriesService } from '../shared/series.service';


describe('SeriesImages component test', () => {
  let component: SeriesImagesComponent;
  let fixture: ComponentFixture<SeriesImagesComponent>;

  // Spy creation

  // Movie service
  const getSeriesImagesSpy = jasmine.createSpy('getSeriesImages')
    .and.returnValue(Observable.of(seriesDetails));

  // TdMediaQuery
  const mediaQuerySpy = jasmine.createSpy('query')
    .and.returnValue(false);
  const mediaRegisterQuerySpy = jasmine.createSpy('registerQuery')
    .and.returnValue(Observable.of(false));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListMoviesComponent,
        FooterComponent,
        TrendingComponent,
        ListSeriesComponent,
        ListPeopleComponent,
        MovieDetailsComponent,
        ListPeopleComponent,
        MovieImagesComponent,
        MovieVideosComponent,
        MovieCastComponent,
        MovieReviewsComponent,
        MovieRecommendationsComponent,
        SeriesDetailsComponent,
        SeriesImagesComponent,
        SeriesVideosComponent,
        FormatStringPipe,
        SeriesCastComponent,
        SeriesRecommendationsComponent,
        PersonDetailsComponent,
        PersonMoviesComponent,
        PersonSeriesComponent,
        PersonImagesComponent,
        SearchComponent,
        SearchBarComponent,
        NotFoundComponent,
        DiscoverComponent,
        CustomCardComponent,
        LimitTextComponent
      ],
      imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        ModalGalleryModule.forRoot(),
        MatButtonModule,
        MatSidenavModule,
        MatTooltipModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTabsModule,
        MatToolbarModule,
        MatGridListModule,
        MatSelectModule,
        CovalentLayoutModule,
        CovalentMenuModule,
        CovalentSearchModule,
        CovalentHttpModule,
        CovalentMediaModule,
        CovalentPagingModule,
        CovalentLoadingModule,
        CovalentNotificationsModule,
        CovalentChipsModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: SeriesService, useClass: class {
            getSeriesImages = getSeriesImagesSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        },
        {
          provide: TdMediaService, useClass: class {
            query = mediaQuerySpy;
            registerQuery = mediaRegisterQuerySpy;
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesImagesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();
      expect(component.columns)
        .toBeUndefined();
      expect(component._querySubscription)
        .toBeUndefined();

      expect(component.seriesBackdrops)
        .toEqual([]);
      expect(component.seriesPosters)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');

      expect(component.images)
        .toEqual([]);
      expect(component.openModalWindow)
        .toBe(false);
      expect(component.imagePointer)
        .toEqual(0);
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updateSeriesImages').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updateSeriesImages)
        .toHaveBeenCalledTimes(1);
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
  });

  describe('WHEN updateSeriesImages function is called', () => {
    let id: number;
    beforeEach(() => {
      getSeriesImagesSpy.calls.reset();
      spyOn(component, 'buildImagesArray').calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.seriesBackdrops = [];
      component.seriesPosters = [];
    });
    it('SHOULD call service', () => {
      id = 10;
      component.route.params = Observable.of({ id: id });
      component.updateSeriesImages();

      expect(component.seriesService.getSeriesImages)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getSeriesImages)
        .toHaveBeenCalledWith(id);
      expect(component.buildImagesArray)
        .toHaveBeenCalledTimes(1);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values', () => {
      component.updateSeriesImages();

      expect(component.seriesBackdrops)
        .toEqual((<any>seriesDetails).backdrops.slice(0, 12));
      expect(component.seriesPosters)
        .toEqual((<any>seriesDetails).posters.slice(0, 12));
    });
    it('SHOULD handle error', () => {
      getSeriesImagesSpy.and.returnValue(Observable.throw('test error'));
      component.updateSeriesImages();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN buildImagesArray function is called', () => {
    it('SHOULD build an array containing all images', () => {
      component.seriesBackdrops = (<any>seriesDetails).backdrops;
      component.seriesPosters = (<any>seriesDetails).posters;
      component.buildImagesArray();

      expect(component.images.length)
        .toEqual((<any>seriesDetails).backdrops.length + (<any>seriesDetails).posters.length);
    });
  });

  describe('WHEN openImageModal function is called', () => {
    let index: number;
    it('SHOULD set values', () => {
      index = 3;
      component.openImageModal(index);

      expect(component.imagePointer)
        .toEqual(index);
      expect(component.openModalWindow)
        .toBe(true);
    });
  });

  describe('WHEN onCloseImageModal function is called', () => {
    it('SHOULD set values', () => {
      component.onCloseImageModal();

      expect(component.openModalWindow)
        .toBe(false);
    });
  });

  describe('WHEN checkScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
      mediaQuerySpy.calls.reset();
    });
    it('SHOULD call internal functions', () => {
      component.checkScreen();

      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(1);
      expect(component._mediaService.query)
        .toHaveBeenCalledTimes(4);
    });
    it('SHOULD set internal values when query is (max-width: 600px)', () => {
      mediaQuerySpy.and.callFake((query: string) => query === '(max-width: 600px)');
      component.checkScreen();

      expect(component.columns)
        .toEqual(1);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-xs');
      component.checkScreen();

      expect(component.columns)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-sm');
      component.checkScreen();

      expect(component.columns)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaQuerySpy.and.callFake((query: string) => query === 'gt-md');
      component.checkScreen();

      expect(component.columns)
        .toEqual(4);
    });
  });

  describe('WHEN watchScreen function is called', () => {
    beforeEach(() => {
      spyOn(component._ngZone, 'run').and.callFake(fn => fn());
      mediaRegisterQuerySpy.calls.reset();
    });
    it('SHOULD call internal functions', () => {
      component.watchScreen();

      expect(component._mediaService.registerQuery)
        .toHaveBeenCalledTimes(4);
      expect(component._ngZone.run)
        .toHaveBeenCalledTimes(4);
    });
    it('SHOULD set internal values when query is (max-width: 600px)', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === '(max-width: 600px)') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(1);
    });
    it('SHOULD set internal values when query is gt-xs', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-xs') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(2);
    });
    it('SHOULD set internal values when query is gt-sm', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-sm') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(3);
    });
    it('SHOULD set internal values when query is gt-md', () => {
      mediaRegisterQuerySpy.and.callFake((query: string) => {
        if (query === 'gt-md') {
          return Observable.of(true);
        }
        return Observable.of(false);
      });
      component.watchScreen();

      expect(component.columns)
        .toEqual(4);
    });
  });

  describe('WHEN registerLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'register');
      component.registerLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.register)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.register)
        .toHaveBeenCalledWith('series-images');
    });
  });

  describe('WHEN resolveMoviesLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('series-images');
    });
  });
});

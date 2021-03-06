import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { Dir } from '@angular/cdk/bidi';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentLayoutModule, CovalentLoadingModule, CovalentMediaModule, CovalentMenuModule,
  CovalentNotificationsModule, CovalentPagingModule, CovalentSearchModule, IPageChangeEvent, TdMediaService,
  TdPagingBarComponent
} from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';

import * as series from '../../testing/series.json';
import * as categories from '../../testing/list-series.json';

import { TrendingComponent } from '../../trending/trending.component';
import { ListMoviesComponent } from '../../movies/list-movies/list-movies.component';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';
import { ListPeopleComponent } from '../../people/list-people/list-people.component';
import { ListSeriesComponent } from './list-series.component';
import { FooterComponent } from '../../footer/footer.component';
import { MovieImagesComponent } from '../../movies/movie-images/movie-images.component';
import { MovieVideosComponent } from '../../movies/movie-videos/movie-videos.component';
import { MovieCastComponent } from '../../movies/movie-cast/movie-cast.component';
import { MovieReviewsComponent } from '../../movies/movie-reviews/movie-reviews.component';
import { MovieRecommendationsComponent } from '../../movies/movie-recommendations/movie-recommendations.component';
import { SeriesDetailsComponent } from '../series-details/series-details.component';
import { SeriesImagesComponent } from '../series-images/series-images.component';
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


describe('ListSeries component test', () => {
  let component: ListSeriesComponent;
  let fixture: ComponentFixture<ListSeriesComponent>;

  // Spy creation

  // Service
  const getPopularSeriesSpy = jasmine.createSpy('getPopularMovies')
    .and.returnValue(Observable.of(series));
  const getOnTheAirSeriesSpy = jasmine.createSpy('getOnTheAirSeries')
    .and.returnValue(Observable.of(series));
  const getLatestSeriesSpy = jasmine.createSpy('getLatestSeries')
    .and.returnValue(Observable.of(series));
  const getTopRatedSeriesSpy = jasmine.createSpy('getTopRatedSeries')
    .and.returnValue(Observable.of(series));

  // TdMediaQuery
  const mediaQuerySpy = jasmine.createSpy('query')
    .and.returnValue(false);
  const mediaRegisterQuerySpy = jasmine.createSpy('registerQuery')
    .and.returnValue(Observable.of(false));

  // Router
  const navigateSpy = jasmine.createSpy('navigate');

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
            getPopularSeries = getPopularSeriesSpy;
            getOnTheAirSeries = getOnTheAirSeriesSpy;
            getLatestSeries = getLatestSeriesSpy;
            getTopRatedSeries = getTopRatedSeriesSpy;
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({})
          }
        },
        {
          provide: Router, useClass: class {
            navigate = navigateSpy;
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
    fixture = TestBed.createComponent(ListSeriesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  describe('WHEN the component is created', () => {
    it('SHOULD create the global variables', () => {
      expect(component)
        .toBeTruthy();
      expect(component.pagingBar)
        .toBeUndefined();
      expect(component.columns)
        .toBeUndefined();
      expect(component._querySubscription)
        .toBeUndefined();

      expect(component.selectedCategory)
        .toEqual('popular');
      expect(component.categories)
        .toEqual(categories['categories']);

      expect(component.currentPage)
        .toEqual(1);
      expect(component.firstLast)
        .toBe(true);
      expect(component.totalResults)
        .toBeUndefined();
      expect(component.totalPages)
        .toBeUndefined();

      expect(component.series)
        .toEqual([]);
      expect(component.apiImg)
        .toEqual(API.apiImg + 'w500');
      expect(component.apiImgOrig)
        .toEqual(API.apiImg + 'original');
    });
  });

  describe('WHEN ngOnInit function is called', () => {
    let category: string;
    let page: number;
    beforeEach(() => {
      spyOn(component, 'registerLoading').calls.reset();
      spyOn(component, 'updateSeries').calls.reset();
      spyOn(component, 'checkScreen').calls.reset();
      spyOn(component, 'watchScreen').calls.reset();
    });
    it('SHOULD set default values if no params are provided', fakeAsync(() => {
      component.route.params = Observable.of({});
      component.ngOnInit();
      tick();

      expect(component.selectedCategory)
        .toEqual('popular');
      expect(component.currentPage)
        .toEqual(1);
    }));
    it('SHOULD call functions', fakeAsync(() => {
      component.ngOnInit();
      tick();

      expect(component.registerLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.updateSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.checkScreen)
        .toHaveBeenCalledTimes(1);
      expect(component.watchScreen)
        .toHaveBeenCalledTimes(1);
    }));
    it('SHOULD read param values', fakeAsync(() => {
      category = 'upcoming';
      page = 2;
      component.route.params = Observable.of({ category: category, page: page });
      component.ngOnInit();
      tick();

      expect(component.selectedCategory)
        .toEqual(category);
      expect(component.currentPage)
        .toEqual(page);
    }));
  });

  describe('WHEN updateSeries function is called', () => {
    let page: number;
    beforeEach(() => {
      getPopularSeriesSpy.calls.reset();
      getOnTheAirSeriesSpy.calls.reset();
      getLatestSeriesSpy.calls.reset();
      getTopRatedSeriesSpy.calls.reset();
      spyOn(component, 'resolveLoading').calls.reset();
      component.series = [];
    });
    it('SHOULD call service when category is popular', () => {
      page = 2;
      component.currentPage = page;
      component.selectedCategory = 'popular';
      component.updateSeries();

      expect(component.seriesService.getPopularSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getPopularSeries)
        .toHaveBeenCalledWith(page);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values when category is popular', () => {
      component.selectedCategory = 'popular';
      component.updateSeries();

      expect(component.series)
        .toEqual((<any>series).results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
    });
    it('SHOULD handle error', () => {
      getPopularSeriesSpy.and.returnValue(Observable.throw('test error'));
      component.selectedCategory = 'popular';
      component.updateSeries();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call service when category is on the air', () => {
      page = 1;
      component.currentPage = page;
      component.selectedCategory = 'air';
      component.updateSeries();

      expect(component.seriesService.getOnTheAirSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getOnTheAirSeries)
        .toHaveBeenCalledWith(page);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values when category is on the air', () => {
      component.selectedCategory = 'air';
      component.updateSeries();

      expect(component.series)
        .toEqual((<any>series).results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
    });
    it('SHOULD handle error', () => {
      getOnTheAirSeriesSpy.and.returnValue(Observable.throw('test error'));
      component.selectedCategory = 'air';
      component.updateSeries();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call service when category is latest', () => {
      page = 2;
      component.currentPage = page;
      component.selectedCategory = 'latest';
      component.updateSeries();

      expect(component.seriesService.getLatestSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getLatestSeries)
        .toHaveBeenCalledWith(page);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values when category is latest', () => {
      component.selectedCategory = 'latest';
      component.updateSeries();

      expect(component.series)
        .toEqual((<any>series).results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
    });
    it('SHOULD handle error', () => {
      getLatestSeriesSpy.and.returnValue(Observable.throw('test error'));
      component.selectedCategory = 'latest';
      component.updateSeries();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD call service when category is top rated', () => {
      page = 3;
      component.currentPage = page;
      component.selectedCategory = 'top';
      component.updateSeries();

      expect(component.seriesService.getTopRatedSeries)
        .toHaveBeenCalledTimes(1);
      expect(component.seriesService.getTopRatedSeries)
        .toHaveBeenCalledWith(page);
      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD set values when category is top rated', () => {
      component.selectedCategory = 'top';
      component.updateSeries();

      expect(component.series)
        .toEqual((<any>series).results);
      expect(component.totalResults)
        .toEqual((<any>series).total_results);
      expect(component.totalPages)
        .toEqual((<any>series).total_pages);
    });
    it('SHOULD handle error', () => {
      getTopRatedSeriesSpy.and.returnValue(Observable.throw('test error'));
      component.selectedCategory = 'top';
      component.updateSeries();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
    });
    it('SHOULD navigate to 404 if in invalid category', () => {
      navigateSpy.calls.reset();
      component.selectedCategory = 'invalid-category';
      component.updateSeries();

      expect(component.resolveLoading)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/404']);
    });
  });

  describe('WHEN onCategoryChanged function is called', () => {
    beforeEach(() => {
      navigateSpy.calls.reset();
    });
    it('SHOULD navigate to page 1 if there is a paging bar', () => {
      component.pagingBar = new TdPagingBarComponent(new Dir());
      spyOn(component.pagingBar, 'navigateToPage');
      component.onCategoryChanged();

      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledTimes(1);
      expect(component.pagingBar.navigateToPage)
        .toHaveBeenCalledWith(1);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(0);
    });
    it('SHOULD route navigate if there is no paging bar', () => {
      component.pagingBar = undefined;
      component.onCategoryChanged();

      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/list-series', component.selectedCategory, { 'page': 1 }]);
    });
  });

  describe('WHEN changePage function is called', () => {
    let event: IPageChangeEvent;
    beforeEach(() => {
      event = {
        page: 1,
        maxPage: 1,
        pageSize: 20,
        total: 1,
        fromRow: 1,
        toRow: 1
      };
      navigateSpy.calls.reset();
    });
    it('SHOULD set internal values and call internal functions', () => {
      component.changePage(event);

      expect(component.currentPage)
        .toEqual(event.page);
      expect(component.router.navigate)
        .toHaveBeenCalledTimes(1);
      expect(component.router.navigate)
        .toHaveBeenCalledWith(['/list-series', component.selectedCategory, { 'page': event.page }]);
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
        .toHaveBeenCalledWith('series');
    });
  });

  describe('WHEN resolveLoading function is called', () => {
    beforeEach(() => {
      spyOn(component._loadingService, 'resolve');
      component.resolveLoading();
    });
    it('SHOULD call functions', () => {
      expect(component._loadingService.resolve)
        .toHaveBeenCalledTimes(1);
      expect(component._loadingService.resolve)
        .toHaveBeenCalledWith('series');
    });
  });
});

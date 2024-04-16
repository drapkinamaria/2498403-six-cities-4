import { useState } from 'react';
import Card from '../components/card/Card';
import { CitiesList } from '../components/citiesList/CitiesList';
import { Header } from '../components/header/Header';
import {MainProps} from '../types/types';
import Map from '../components/map/Map';
import cn from 'classnames';

function Main({ rentalOffersCount, offers, cities }: MainProps): JSX.Element {
  const [id, setOfferId] = useState<string | null>(null);
  const hasOffers = offers && offers.length > 0;

  const mainClassName = cn('page__main', 'page__main--index', {
    'page__main--index-empty': !hasOffers,
  });

  const location = {
    latitude: cities[0].lat,
    longitude: cities[0].lng,
    zoom: cities[0].zoom
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={mainClassName}>
        {hasOffers ? (
          <>
            <CitiesList cities={cities} />
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{rentalOffersCount} places to stay in Amsterdam</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <div className="cities__places-list places__list tabs__content">
                    {offers.map((offer) => (
                      <Card key={offer.id} offer={offer} onHover={setOfferId} />
                    ))}
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map"></section>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <CitiesList cities={cities} />
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in Dusseldorf
                    </p>
                  </div>
                </section>
                <Map offers={offers} specialOfferId={id} location={location} type="cities" />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Main;

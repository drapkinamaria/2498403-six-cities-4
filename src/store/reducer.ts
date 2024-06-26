import {Action, AuthorizationStatus, State} from '../types/types';
import {cities} from '../mocks/cities';
import {FETCH_OFFERS_FAIL, FETCH_OFFERS_START, FETCH_OFFERS_SUCCESS, SET_AUTHORIZATION_STATUS} from './action';

export const initialState: State = {
  offers: [],
  currentCity: cities[0],
  isLoading: false,
  error: null,
  authorizationStatus: {
    status: AuthorizationStatus.Unauthenticated,
    user: null
  },
};

export const rentalReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        currentCity: action.payload
      };
    case 'UPDATE_OFFERS':
      return {
        ...state,
        offers: action.payload
      };
    case FETCH_OFFERS_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload,
        isLoading: false
      };
    case FETCH_OFFERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload
      };
    default:
      return state;
  }
};

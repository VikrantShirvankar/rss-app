import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rss state domain
 */

const selectRssDomain = state => state.rss || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Rss
 */

const makeSelectRss = () =>
  createSelector(
    selectRssDomain,
    substate => substate,
  );

export default makeSelectRss;
export { selectRssDomain };

/**
 *
 * Asynchronously loads the component for Rss
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

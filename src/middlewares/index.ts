import { stackMiddlewares } from './common/lib';
import * as nextIntl from './next-intl';
import * as protectRoutes from './protect-routes';

export default stackMiddlewares(nextIntl, protectRoutes);

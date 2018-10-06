import userRoutes from './user';
import authRoutes from './auth';
import checkoutRoutes from './checkout';
import postRoutes from './posts';
import walletRoutes from './wallet';

module.exports = (app, db) => {
  userRoutes(app, db);
  authRoutes(app, db);
  postRoutes(app, db);
  checkoutRoutes(app, db);
  walletRoutes(app, db);
};

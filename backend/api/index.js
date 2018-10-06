import userRoutes from './user';
import authRoutes from './auth';
import checkoutRoutes from './checkout';
import postRoutes from './posts';

module.exports = (app, db) => {
  userRoutes(app, db);
  authRoutes(app, db);
  postRoutes(app, db);
  checkoutRoutes(app, db);
};

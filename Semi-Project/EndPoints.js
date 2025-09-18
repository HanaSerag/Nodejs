module.exports = (app) => {
  // ================== VIEWS ==================
  app.get('/auth/register', (req, res) => res.render('auth/register'));
  app.get('/auth/login', (req, res) => res.render('auth/login'));
  app.get('/auth/forgot-password', (req, res) => res.render('auth/forgot-password'));
  app.get('/auth/reset-password', (req, res) => res.render('auth/reset-password'));

  // ================== CONTROLLERS ==================
  const { Register } = require('./Controllers/Auth/Register');
  const { LoginStart, LoginVerify } = require('./Controllers/Auth/Login');
  const { ForgetPassword, ResetPassword } = require('./Controllers/Auth/Password');
  const { Logout } = require('./Controllers/Auth/Logout');
  const { GetAllCategories, CreateCategory, DeleteCategory } = require("./Controllers/Category");
  const isAuthenticated = require("./authMiddleware");

  // ================== AUTH APIs ==================
  app.post('/auth/register', Register);
  app.post('/auth/login/start', LoginStart);
  app.post('/auth/login/verify', LoginVerify);
  app.post('/auth/forgot-password', ForgetPassword);
  app.post('/auth/reset-password', ResetPassword);
  app.delete('/auth/logout', Logout);

  // ================== CATEGORIES APIs ==================
  app.get('/categories', isAuthenticated ,GetAllCategories);
  app.post('/categories',isAuthenticated, CreateCategory);
  app.delete('/categories/:id', isAuthenticated ,DeleteCategory);
};

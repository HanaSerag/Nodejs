const {app} = require('./index');
const {login} = require('./controllers/loginController')
const {register} = require('./controllers/registerController')
const {logout} = require('./controllers/logoutController')
const {sendOtp} = require('./controllers/sendOtpController')
const {newPassword} = require('./controllers/newPasswordController') 
const {getProducts,getProductById,addProduct, editProduct,deleteProduct} = require('./controllers/productsController');



app.post('/login', login)
app.post('/register', register)
app.post('/logout', logout)
app.post('/send-otp',sendOtp)
app.post('/new-password',newPassword)
app.get('/products', getProducts);
app.get('/product/:id', getProductById);
app.post('/add-product', addProduct);
app.put('/edit-product/:id', editProduct);
app.delete('/delete-product/:id', deleteProduct);

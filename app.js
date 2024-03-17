const express = require('express');
const path = require('path');
const shopRoutes = require('./routes/shopRouter.js');
const adminRoutes = require('./routes/adminRouter.js');


const app = express();

app.set("view engine", "ejs");
app.use( express.static(path.join(__dirname, 'public')) );

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.listen(4000);
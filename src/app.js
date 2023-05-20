const express = require('express');

const app = express();

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

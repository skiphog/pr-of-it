var auto = [
  {Id: 1, Name: 'Audi A4', Year: 2008, Price: 380000},
  {Id: 2, Name: 'Audi A6', Year: 2008, Price: 420000},
  {Id: 3, Name: 'Audi A8', Year: 2008, Price: 500000}
];

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

/**
 * Главная страница
 */
app.get('/', function (req, res) {
  res.render('pages/index', {
    title: 'Добро пожаловать на AutoScout',
    description: 'Сейчас в продаже ' + auto.length + ' автомобилей',
    auto: auto
  });
});

/**
 * Форма для добавления авто
 */
app.get('/auto', function (req, res) {
  res.render('pages/auto', {data: {}});
});

/**
 * Добавить авто
 */
app.post('/auto', function (req, res) {
  var newId = 0;
  auto.forEach(function (a) {
    if (a.Id > newId)
      newId = a.Id;
  });

  auto.push({
    Id: ++newId,
    Name: req.body.name,
    Year: req.body.year,
    Price: req.body.price
  });

  res.redirect('/');
});

/**
 * Форма редактирования авто
 */
app.get('/auto/:id/edit', function (req, res) {
  var item = auto.find(function (obj) {
    return obj.Id === +req.params.id;
  });

  if (item === undefined) {
    return res.status(404).send('Нет машинки для редактирования');
  }
  res.render('pages/auto', {data: item});
});

/**
 * Редактировать авто
 */
app.post('/auto/:id/edit', function (req, res) {

  auto = auto.map(function (item) {
    if (item.Id === +req.params.id) {
      return {
        Id: +req.params.id,
        Name: req.body.name,
        Year: req.body.year,
        Price: req.body.price
      };
    }
    return item;
  });

  res.redirect('/');
});

/**
 * Удлить авто
 */
app.get('/auto/:id/delete', function (req, res) {
  auto = auto.filter(function (obj) {
    return obj.Id !== +req.params.id;
  });

  res.redirect('/');
});

app.listen(8080);
console.log('8080 is the magic port');
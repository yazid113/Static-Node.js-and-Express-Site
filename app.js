const express = require('express');
const { projects } = require('./data.json');

const app = express();


app.set('view engine', 'pug');


app.use(express.static(`public`))



app.get('/', function (req, res) {
    res.render('index', { projects });
  });

app.get('/about', function (req, res) {
    res.render('about');
  });

//   app.get('/project', function (req, res) {
//     res.render('project');
//   });
  

  app.get('/project/:id', function(req, res) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
      res.render('project', { projects });
    }
  });

  
  app.listen(3000, ()=>{
    console.log('The app is running oon localhost:3000')
});
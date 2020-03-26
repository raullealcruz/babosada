var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var mongoose = require('mongoose');
var Alumnos= mongoose.model('Alumnos');       /*aqui va el alias del archivo alumno.js*/

var Celular = mongoose.model('Celulares');




//GET es para obtener informacion de la bd
//Listado de informacion "Alumnos"
router.get('/alumnos',function(req,res,next){
    Alumnos.find(function (err,alumnos) {
        if (err){return next(err)}
        res.json(alumnos);
    })
});
router.get('/alumno/:nombre', function (req,res) {
    Alumnos.findOne( {nombre: req.params.nombre},function(err,alumno) {
        if (err){res.send(err)}
        res.json(alumno)
    })
});
router.get('/alumno/b/:codigo', function (req,res) {
    Alumnos.findOneAndRemove( {codigo: req.params.codigo} || {nombre: req.params.nombre},function(err,alumno) {
        if (err){res.send(err)}
        res.json(alumno)
    })
});
/*Metodo GET del segundo Schema*/

router.get('/celulares',function (req,res,next) {
    Celular.find(function (err,celulares) {
        if (err){return next(err)}
        res.json(celulares);
    })
});

router.get('/celulares/:id',function (req,res) {
    Celular.findById(req.params.id,function (err,Celular) {
    if (err){res.send(err)}
    res.json(Celular);
    })
});
router.get('/celular/:nombre', function (req,res) {
    Celular.findOne( {nombre: req.params.nombre},function(err,celular) {
        if (err){res.send(err)}
        res.json(celular)
    })
});


/*POST este metodo es para agregar informacion na la bd*/

router.post('/alumnoss',function (req,res,next){
    var alumnos = new Alumnos(req.body);

    alumnos.save(function (err,alumno) {
        if (err){return next(err)}
        res.json(alumno);
    })
});

/*Metodo post del segundo schema*/
router.post('/celular',function (req,res,next) {
    var celulares = new Celular(req.body);

    celulares.save(function (err,celular) {
        if (err){return next(err)}
        res.json(celular);
    })
});

/*DELETE un documento en BD*/
/*router.delete('/alumno/:id',function (req,res) {
    Alumnos.findByIdAndRemove(req.params.id,function (err){
     if (err){res.send(err)}
     res.json({Mensaje:'Alumno eliminado'})
    })
});*/
router.delete('/alumno/b/:codigo',function (req,res) {
    Alumnos.findOneAndDelete(req.params.codigo,function (err){
        if (err){res.send(err)}
        res.json({Mensaje:'Alumno eliminado'})
    })
});
router.get('/celular/:nombre', function (req,res) {
    Celular.findOneAndDelete( {nombre: req.params.nombre},function(err,celular) {
        if (err){res.send(err)}
        res.json(celular)
    })
});

/*Delete del segundo Schema*/
router.delete('/celular/:id',function (req,res) {
    Celular.findByIdAndRemove(req.params.id,function (err) {
    if (err){res.send(err)}
    res.json({Mensaje:'Celular eliminado'})
    })
});

/*PUT sirve para actualizar informacion en la bd*/
/*router.put('/alumno/c/:id',function (req,res) {
    Alumnos.findByIdAndUpdate(req.params.id,function (err,alumno) {
        alumno.nombre=req.body.nombre;
        alumno.codigo=req.body.codigo;
        alumno.save(function (err) {
            if (err){res.send(err)}
            res.json(alumno);
        })
    })
});
*/
router.put('/alumno/c/:id',function (req,res) {
    Alumnos.findById(req.params.id,function (err, alumno) {
        alumno.nombre=req.body.nombre;
        alumno.codigo=req.body.codigo;
        alumno.save(function (err) {
            if (err){res.send(err)}
            res.json(alumno);
        })
    })
});


/*PUT del segundo Schema*/
router.put('/celular/:id',function (req,res) {
    Celular.findById(req.params.id,function (err,celular) {
    celular.nombre=req.body.nombre;
    celular.codigo=req.body.codigo;
    celular.anio=req.body.anio;
    celular.save(function (err) {
    if (err){res.send(err)}
    res.json(celular);
    })
    })
});


module.exports = router;

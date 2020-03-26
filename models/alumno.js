var mongoose = require ('mongoose');


var AlumnosSchema = new mongoose.Schema({
    nombre:String,
    codigo:Number,


});
mongoose.model('Alumnos',AlumnosSchema);

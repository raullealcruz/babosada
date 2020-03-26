var mongoose = require ('mongoose');


var celularSchema = new mongoose.Schema({
    nombre:String,
    codigo:Number,
    anio:Number,

});

mongoose.model('Celulares', celularSchema);

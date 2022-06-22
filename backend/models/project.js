'use strict'

const { default: mongoose } = require("mongoose")
const Schema = mongoose.Schema;

var ProjectSchema = Schema (
    {
        name: String,
        description: String,
        category: String,
        year: Number,
        langs: String,
        image: String,
    }
);


/**
 * Mogoose pluraliza los string que se le pasan como modelo
 * Es decir, que Project lo combierte en "proyects" que es
 * tal cual como se llama nuestra colección en la base de datos
 */

module.exports = mongoose.model('Project', ProjectSchema)


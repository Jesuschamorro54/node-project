'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require ('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "/home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: "/test"
        });
    },

    saveProjects: function(req, res){

        try {
            var project = new Project();

            var params = req.body

            // project = JSON.parse(JSON.stringify(params)) 

            project.name = params.name
            project.description = params.description
            project.category = params.category
            project.year = params.year
            project.langs = params.langs
            project.image = null
            
            project.save((err, projectStored) =>{
                if(err) return res.status(500).send({message: "Error al guardar", status: false});

                if(!projectStored) res.status(400).send({message: "No se ha podido guardar el proyecto", status: false});

                return res.status(200).send({data: projectStored, status: true})
            });
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: "Internal server error", status: false})
        }
        
    },

    getProject: function(req, res){
        var id = req.params.id ? req.params.id : null;

        if(!id) return res.status(404).send({message: "El proyecto no existe"});


        Project.findById(id, (err, project)=>{
            if(err) return res.status(500).send({message: "Error al devolver los datos"});

            if(!project) res.status(400).send({message: "No se ha podido encontrar el proyecto"});

            return res.status(200).send({project: project})
        });
    },

    getProjects: function(req, res){
        var id = req.params.id ? req.params.id : null;

        var update = req.body;

        Project.find({}).exec((err, project)=>{
            if(err) return res.status(500).send({message: "Error al encontrar los datos", status: false});

            if(!project) return res.status(400).send({message: "El proyecto no existe", status: false});

            return res.status(200).send({data: project, status: true})
        });
    },

    update: function(req, res){
        var id = req.params.id ? req.params.id : null;

        if(!id) return res.status(500).send({
            status: 500,
            error: "Parametros insuficientes"
        });

        var update = req.body

        /**
         * new:true permite devolver el objeto actualizado, de lo contrario devuelve el objeto
         * antes de haber sido actualizado
         */
        Project.findByIdAndUpdate(id, update, {new: true}, (err, projectUpdated)=>{
            if(err) return res.status(500).send({message: "Error al actualizar los datos"});

            if(!projectUpdated) res.status(400).send({message: "No se ha podido encontrar el proyecto"});

            return res.status(200).send({project: projectUpdated})
        });
    },

    deleteProject: function(req, res){
        var id = req.params.id ? req.params.id : null;

        if(!id) return res.status(500).send({
            status: 500,
            error: "Parametros insuficientes"
        });

        
        Project.findByIdAndDelete(id, (err, projectDeleted)=>{
            if(err) return res.status(500).send({message: "Error al actualizar los datos"});

            if(!projectDeleted) res.status(400).send({message: "No se ha podido encontrar el proyecto"});

            return res.status(200).send({project: projectDeleted})
        });
    },

    uploadImage: function(req, res){
        console.log("Subiendo imagen")
        var id = req.params.id;

        if(!id) return res.status(500).send({message: "El id no corresponde a ningún registro"});

        var fileName = 'null'

        if(req.files){
            var file_url = req.files.image.path
            var fileSplit = file_url.split('\\')

            fileName = fileSplit[1]

            Project.findByIdAndUpdate(id, {image:fileName}, {new: true}, (err, projectUpdated) =>{

                if(err) return res.status(500).send({message: "Error al guardar la imagen"});

                if(!projectUpdated) res.status(404).send({message: "No se ha podido encontrar el proyecto"});

                return res.status(200).send({data: projectUpdated})
            });

            
        }else{
            return res.status(500).send({message: "No se ha subido la imagen"})
        }
    },

    getImage: (req, res) => {
        var file = req.params.name;
        var path_file = './uploads/' + file

        if(fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file))
        }else{
            return res.status(404).send({message: "No existe la imagen"})
        }
    }
}

module.exports = controller
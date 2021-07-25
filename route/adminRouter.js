var express = require('express')
var dev = require('../model/deviceModel')
var route = express.Router()
var mongoose = require('mongoose')



route.post("/addnewdev", (req, res, next) => {
  
        const newDevice= new dev({
      
          devicename: req.body.devicename,
          version: req.body.version,
        keyword: req.body.keyword,
          image: req.body.image,
    
        })
        newDevice.save(function (err) {
            if (err) {
                res.send({status: "404" })
    
            } else {
                res.send({status: "200", message: "device d'intervention ajouter !!", data: newDevice})
               
            }
        })})
        module.exports = route
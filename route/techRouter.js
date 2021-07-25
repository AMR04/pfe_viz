var express = require('express')
var fs = require('fs')
var route = express.Router()
var dev= require('../model/deviceModel')
var tech= require('../model/techModel')


route.post("/login", function (req, res) {
    
    tech.findOne({techname: req.body.techname}).exec(function (err, userInfo) {
        if (err)
            next(err);
        else {
            if (userInfo != null) {
          
                if (req.body.password== userInfo.password) {
                    res.json({status: "200", msg: "techfound", data: {user: userInfo._id}});
                } else {
                    res.json({status: "203", msg: "invalid email/pswd", data: null});
                }

            } else {

                res.json({status: "404", msg: "tech not found", data: null});
            }


        }

    });
})
route.post("/addDev", (req, res, next) => {
    tech.findById(req.body._techid)
      .then(user => {
        if (!user ){
          return res.status(404).json({
            message: "error adding device"
          });
        }
        const newDevice= new dev({
          _id: mongoose.Types.ObjectId(),
          devicename: req.body.devicename,
          version: req.body.version,
          tech: req.body._techid,
          image: req.body.image,
          bluename: req.body.bluename,
          blueadress:req.body.blueadress
        });
        return newDevice.save();
      })
      .then(result => {
        //console.log(result);
        res.status(201).json({
          message: "Device stored",
          data: {
           devicename: result.devicename,
            version: result.version,
            tech: result.tech,
            id: result._id,
            image: result.image,
          },
       
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  
route.get("/listnumber", (req, res, next) => {

  tech.find()
     .exec()
     .then(docs => {
       res.status(200).json({
       lengt: docs.length })})
       .catch(err => {
         res.status(500).json({
           error: err
         });
       })})

module.exports = route















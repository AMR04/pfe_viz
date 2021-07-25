var express = require('express')
var dev = require('../model/deviceModel')
var route = express.Router()
var User= require('../model/userModel')
var mongoose = require('mongoose')

route.put('/updatedev/:id', function (req, res, next) {
    dev.findByIdAndUpdate(req.params.id,
        {
            devicename: req.body.devicename,
        }
        , function (err) {
            if (err)
                next(err)
            else {
                res.json({status: "OKK", message: "device updated"})
            }
        }
    )
})
route.delete('/deletedev/:id', function (req, res, next) {
    dev.findByIdAndDelete(req.params.id,
        function (err) {
            if (err)
                next(err)
            else {
                res.json({status: "200", message: "device deleted"})
            }
        }
    )
})

route.get('/devinfo/:id', function (req, res, next) {
    var listuser = [{}]
    dev.findById(req.params.id).exec(function (err,infos) {
      if (err)
          next(err)
      else{     listuser.push({
                devicename: infos.devicename ,
                state: infos.state , 
                current: infos.current , 
                voltage : infos.voltage ,
                speed : infos.speed ,
                 
      })
          res.json({status: "ok", message: "user information", data:listuser})}
  })
  })
  
route.put('/DCVC/:id', function (req, res, next) {
    dev.findByIdAndUpdate({_id: req.params.id}  ,
        {
            current: req.body.current,
            voltage: req.body.voltage  
        }
        , function (err, result) {
            if (err)
            res.json({status: "sorry"})
            else {
                res.json({status: "OKK", message: " c et v updated"})
            }
        }
    )
})

route.put('/on/:id', function (req, res, next) {
    dev.findByIdAndUpdate({_id: req.params.id}  ,
        {
           state : true
        }
        , function (err, result) {
            if (err)
                next(err)
            else {
                res.json({status: "OKK", message: "Power On"})
            }
        }
    )
})
route.put('/off/:id', function (req, res, next) {
    dev.findByIdAndUpdate({_id: req.params.id}  ,
        {
           state : false
        }
        , function (err, result) {
            if (err)
                next(err)
            else {
                res.json({status: "OKK", message: "Power Off"})
            }
        }
    )
})

route.put('/speed/:id', function (req, res, next) {
    dev.findByIdAndUpdate({_id: req.params.id}  ,
        {
            speed: req.body.speed,    
        }
        , function (err, result) {
            if (err)
                next(err)
            else {
                res.json({status: "OKK", message: "Speed Updated"})
            }
        }
    )
})

route.put('/changeblue/:id', function (req, res, next) {
  dev.findByIdAndUpdate({_id: req.params.id}  ,
      {
        bluename: req.body.bluename,
        blueadress:req.body.blueadress    
      }
      , function (err, result) {
          if (err)
              next(err)
          else {
              res.json({status: "OKK", message: "Speed Updated"})
          }
      }
  )
})



  route.get("/list", (req, res, next) => {
    dev.find()
       .populate('user')
       .exec()
       .then(docs => {
         res.status(200).json({
            lengt: docs.length,
           list: docs.map(doc => {
             return {
               
            devicename: doc.devicename ,
            version: doc.version ,
            keyword: doc.keyword,
            bluename: doc.bluename,
            blueadress: doc.blueadress,
            user: doc.user
               
           
             };
           })
         });
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
   });

   route.get("/userdev/:id", (req, res, next) => {
       console.log(req.body.user)
    dev.find({"user": req.params.id} )
       .populate('user')
       .exec()
       .then(docs => {
         res.status(200).json({
         lengt: docs.length,
           orders: docs.map(doc => {
             return {
             //  lkol:doc,
           id:   doc._id,
           version:   doc.version,    
           name: doc.devicename,
           image: doc.image,
           blueadress: doc.blueadress,
           bluename: doc.bluename

           
             };
           })
         });
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
   });

   route.post('/finddevice',   (req, res) => {
    // res.send(req.params)//
    
  
    dev.findById({_id:req.body._id})
      .then(profile => {
        if (!profile) {
          res.send({status: "404",message:"Device don't exist "});
        } else {
          if (profile.keyword == req.body.keyword){res.send({status: "200" , data : "Sucsessful Authentification "})}
         else {res.send({status: "303",message:"Mot de passe erroné"})}
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
  });

  route.put('/setusertodevice/:id', function (req,res,next) {
    dev.findByIdAndUpdate({_id: req.params.id} ,
        
        { $push: { user: req.body.user}  }
        , function (err) {
            if (err)
                res.json({status : "404"})
            else {
                res.json({status: "200", message: "done"})
            }
        }
    )
})

route.get("/listnumber", (req, res, next) => {

 dev.find()
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
'use strict';
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
var crypto = require("crypto");


// PRIVATE key
var privateKEY  = fs.readFileSync('./key.pem', 'utf8');

function seconds_since_epoch(d){ 
    return Math.floor( d / 1000 ); 
}

function createJWT()
{
   console.log("Creating JWT");
   var jti = crypto.randomBytes(10).toString('hex');

   console.log("JTI:"+jti);

  
   var today = new Date();
   today.setHours(today.getHours() + 6);

   var sec = seconds_since_epoch(today);


var payload ={
    "sub": "fxnaranjo",
    "realm": "cloudIdentityRealm",
    "iss": "http://169.59.188.65",
    "exp": sec,
    "aud": "https://fxn.verify.ibm.com/v1.0/endpoint/default/token",
    "jti": jti
  }
  

    var token = jwt.sign(payload, privateKEY,{ algorithm: 'RS256' });
    return token;
}

console.log("****************** JWT ******************");
console.log(createJWT());

console.log("****************** JWT ******************");
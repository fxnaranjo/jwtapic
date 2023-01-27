'use strict';
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
var crypto = require("crypto");



function seconds_since_epoch(d){ 
    return Math.floor( d / 1000 ); 
}


function hexToString(str)
{
    const buf = new Buffer(str, 'hex');
    return buf.toString('utf8');
}

async function createJWT()
{
  console.log("****************** JWT ******************");
  console.log("Creating JWT");

// SIGNING KEY
var privateKEY  = fs.readFileSync('./dpkeys/certificate.pem', 'utf8');


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
    "aud": "datapower",
    "jti": jti
  }

  var key='3FA2D4847B762C0BF0CC319F9AD363F8';
  var iv ='658000642691251EEC404502D5220060';

  //{"enc":"A128CBC-HS256","alg":"dir","cty":"JWT"}
 // {"alg":"HS256","enc":"A128CBC-HS256"}

const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(iv, 'hex'), Buffer.from(key, 'hex'));

let encrypted = cipher.update(JSON.stringify(payload), 'utf-8', 'hex');
encrypted += cipher.final('hex');




const header = {
  alg: 'HS256',
  enc: 'A128CBC-HS256',
  cty: 'JWT'
};

    var signedToken = jwt.sign(encrypted, privateKEY,{header});

    console.log(signedToken);

    console.log("*******************************************************************************");

    

  console.log("****************** JWT ******************");
}


createJWT();


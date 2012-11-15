/**
 * @author macmini
 */

var read = require('read');
var Seq = require('seq');

Seq()
  .seq(function () {
    read({ prompt : 'Username: ' }, this.into('user'));
  })
  .seq(function () {
    read({ prompt : 'Password: ', silent : true }, this.into('pass'));
  })
  .seq(function (pass) {
    console.log(this.vars.user, this.vars.pass);
    console.log(pass);
  });
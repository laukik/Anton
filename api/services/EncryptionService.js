/*

*/

const crypto = require('crypto');

var EncryptionService = {
  encrypt : function ( passwd) {
    var hash = crypto.createHmac('sha256', passwd)
                       .update('odsjhjnmn sakjdkjsajd asjdkjadak')
                       .digest('hex');
    return hash;
  },

  validate : function (passwd, input) {
    var hash1 = crypto.createHmac('sha256', input)
                       .update('odsjhjnmn sakjdkjsajd asjdkjadak')
                       .digest('hex');
    return hash1.valueOf() === passwd;
  }

};

module.exports = EncryptionService;

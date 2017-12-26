var bcrypt = require('bcrypt');
bcrypt.hash("amdocs", 20, function(err, hash) {
  console.log(hash);
  bcrypt.compare("amdocs", hash).then(function(res) {
    console.log(res);
  });
  bcrypt.compare("alpha", hash).then(function(res) {
    console.log(res);
  });
});

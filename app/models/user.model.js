var User = function (data) {
  this.data = data;
  this.place = function(){
    var postsRef = global.rootRef.child("users/"+this.data.username);
    postsRef.set({
      fname: this.data.fname,
      lname: this.data.lname,
      email: this.data.email,
      password: this.data.password,
      rating: 0
    });
  }
}

User.findByUsername = function (username, callback) {

  var onValueChange = function(snapshot) {
    var ret = snapshot.val();
    if(ret === null){
      callback(null);
    }else{
      ret.username = username;
      callback(ret);
    }
  }

  global.rootRef.child("users/"+username).once("value", onValueChange);
}

User.findByEmail = function (email, callback) {

  var onValueChange = function(snapshot) {
    var ret = snapshot;

    if(ret === null){
      callback(null);
    }else{

      var found = false;
      ret.forEach(function(value) {
        if(value.val().email == email){
          var u = value.val();
          u.username = value.key();
          callback(u);
          found = true;
          return;
        }
      });

      if(!found){
        callback(null);
      }
    }
  }

  global.rootRef.child("users").once("value", onValueChange);
}

module.exports = User;

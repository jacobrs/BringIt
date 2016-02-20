var User = function (data) {
  this.data = data;
  this.push = function(){
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
  global.rootRef.child("users/"+username).on("value", function(snapshot) {
    var ret = snapshot.val();
    if(ret === null){
      callback(null);
    }else{
      ret.username = username;
      callback(ret);
    }
  });
}

module.exports = User;

var Demand = function (data) {
  this.data = data;
  this.push = function(){
    var postsRef = global.rootRef.child("demmands/"+this.data.id);
    postsRef.set({
      fname: this.data.asker,
      item: this.data.comments,
      price: this.data.deliverer,
      destination: {
        long: this.data.destination.long,
        lat: this.data.destination.lat
      },
      item: this.data.item,
      price: this.data.price,
      shop: this.data.shop,
      tip: this.data.tip
    });
  }
}

User.findByUsername = function (id, callback) {
  global.rootRef.child("demmands/"+id).on("value", function(snapshot) {
    var ret = snapshot.val();
    if(ret === null){
      callback(null);
    }else{
      ret.id = id;
      callback(ret);
    }
  });
}

module.exports = Demand;

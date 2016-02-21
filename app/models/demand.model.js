var Demand = function (data) {
  this.data = data;
  this.place = function(){
    var postsRef = global.rootRef.child("demands");
    postsRef.push().set({
      fname: this.data.asker,
      comments: this.data.comments,
      deliverer: this.data.deliverer,
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

Demand.findById = function (id, callback) {
  global.rootRef.child("demands/"+id).on("value", function(snapshot) {
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

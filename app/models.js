// create a base model for us to extend
var Model = Backbone.Model.extend({ });


// Game is a singleton.
var Game = Model.extend({

    defaults: {
    },

    initialize: function() {

        this.set("mapState", new MapState());
    },
});

var MapState = Model.extend({
    initialize: function(levelDesign) {
        // call super
    },
});

var MapObject = Model.extend({
    defaults: {
        coordinates: null,
    },

    initialize: function() {
        // call super
        Model.apply( this, arguments );
    },
});

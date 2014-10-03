// create a base model for us to extend
var Model = Backbone.Model.extend({ });


// Game is a singleton.
var Game = Model.extend({

    defaults: {
    },

    constructor: function() {
        // call super
        Model.apply( this, arguments );

    },
});

// This represents the starting conditions / level design for a given level.
var LevelDesign = Model.extend({
    defaults: {
        playerStartLocation: [ 5, 0 ],
        goalLocation: [ 5, 10 ],
        objects: [],
    }
});

var MapState = Model.extend({
    defaults: {
        objects: [],
    },

    constructor: function() {
        // call super
        Model.apply( this, arguments );
    },

    loadLevel: function(levelDesign) {
        this.set("levelDesign", levelDesign);

        _.each(levelDesign.get("objects"), function(object) {
            var newObject = MapObject.build(object.type, object.position);
            this.addMapObject(newObject);
        }, this);
    },

    addMapObject: function(object) {
        this.get("objects").push(object);
    }
});

var MapObject = Model.extend({
    defaults: {
        position: null,
    },

    constructor: function() {
        // call super
        Model.apply( this, arguments );
    },


});

MapObject.build = function(objectTypeName, position) {
    if (objectTypeName == "Tower") {
        var newMapObject = new Tower({position: position});
        return newMapObject;
    }
};

var Tower = MapObject.extend({
});

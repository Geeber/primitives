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

    runPlan: function() {
        console.log("RUNNING PLAN");

        var planView = this.get("planView");
        var text = planView.$el.val();

        console.log(text);

        var plan = text.split("\n");


        function step(remainingPlan, game) {
            if (remainingPlan.length == 0) {
                return;
            }

            command = remainingPlan[0];

            if(command == "up") {
                game.get("mapState").get("player").moveUp();
            }
            else if(command == "down") {
                game.get("mapState").get("player").moveDown();
            }
            else if(command == "left") {
                game.get("mapState").get("player").moveLeft();
            }
            else if(command == "right") {
                game.get("mapState").get("player").moveRight();
            }

            setTimeout(function() {
                step(remainingPlan.slice(1), game);
            }, 500);
        }

        step(plan, this);
    }
});

// This represents the starting conditions / level design for a given level.
var LevelDesign = Model.extend({
    defaults: {
        playerStartLocation: [ 5, 0 ],
        goalStartLocation: [ 5, 10 ],
        objects: [],
    },
});

var MapState = Model.extend({
    defaults: {
        objects: [],
    },

    constructor: function() {
        // call super
        Model.apply( this, arguments );
    },

    resetMap: function() {
        this.set("objects", []);
        this.trigger("reset");
        this.loadLevel(level1);
    },

    loadLevel: function(levelDesign) {
        this.set("levelDesign", levelDesign);

        _.each(levelDesign.get("objects"), function(object) {
            var newObject = MapObject.build(object.type, object.position);
            this.addMapObject(newObject);
        }, this);


        var playerObject = MapObject.build(
            "Player",
            levelDesign.get("playerStartLocation"));
        this.addMapObject(playerObject);
        this.set("player", playerObject);

        var goalObject = MapObject.build(
            "Goal",
            levelDesign.get("goalStartLocation"));
        this.addMapObject(goalObject);
        this.set("goal", goalObject);

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

        new MapObjectView({
            model: newMapObject
        });

        return newMapObject;
    }
    else if (objectTypeName == "Player") {
        var newMapObject = new Player({position: position});

        new MapObjectView({
            model: newMapObject
        });

        return newMapObject;
    }
    else if (objectTypeName == "Goal") {
        var newMapObject = new Goal({position: position});

        new MapObjectView({
            model: newMapObject
        });

        return newMapObject;
    }
};

var Tower = MapObject.extend({
    defaults: {
        type: "Tower",
    }
});

var Player = MapObject.extend({
    defaults: {
        type: "Player",
    },

    moveDown: function() {
        var oldPosition = this.get("position");
        var newPosition = [oldPosition[0], oldPosition[1] - 1 ];
        this.set("position", newPosition);
    }, 

    moveUp: function() {
        var oldPosition = this.get("position");
        var newPosition = [oldPosition[0], oldPosition[1] + 1 ];
        this.set("position", newPosition);
    }, 

    moveLeft: function() {
        var oldPosition = this.get("position");
        var newPosition = [oldPosition[0] - 1, oldPosition[1] ];
        this.set("position", newPosition);
    }, 

    moveRight: function() {
        var oldPosition = this.get("position");
        var newPosition = [oldPosition[0] + 1, oldPosition[1] ];
        this.set("position", newPosition);
    }, 

});

var Goal = MapObject.extend({
    defaults: {
        type: "Goal",
    }
});

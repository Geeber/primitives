// create the game singleton
var game = new Game();

var mapState = new MapState();
var mapView = new MapView({
    id: "map",
    model: mapState
});
mapState.loadLevel(level1);



var planView = new PlanView({
    id: "plan",
    tagName: "textarea",
    model: {}
});

var runView = new RunView({
    id: "run",
    tagName: "button",
    model: game
});


var resetView = new ResetView({
    id: "reset",
    tagName: "button",
    model: mapState
});

game.set("mapState", mapState);
game.set("goal", mapState.get("goal"));
game.set("planView", planView);


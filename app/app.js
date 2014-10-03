// create the game singleton
var game = new Game();

var mapState = new MapState();
var mapView = new MapView({
    id: "map",
    model: mapState
});
mapState.loadLevel(level1);


game.set("mapState", mapState);


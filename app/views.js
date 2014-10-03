var View = Backbone.View.extend();

var MapObjectView = View.extend({

    defaults:  {
        lastKnownPosition: false,
    },

    constructor: function( options ) {
        // call super
        View.apply( this, arguments );

        // force the first render
        this.render();

        // set up future renders
        this.listenTo(this.model, "change:position", this.render);
    },

    render: function() {
        console.log("rendering a MapObjectView");

        var newPosition = this.model.get("position");

        var lastKnownPosition = this.model.get("lastKnownPosition");
        if(lastKnownPosition) {
            var cellId = "#" + lastKnownPosition[0] + "-" + lastKnownPosition[1];
            var cell = $(cellId);

            cell.removeClass("Player");
            cell.removeClass(this.model.get("type"));
        }
        

        var cellId = "#" + newPosition[0] + "-" + newPosition[1];
        var cell = $(cellId);
        cell.addClass(this.model.get("type"));

        this.model.set("lastKnownPosition", newPosition);
    }
});

var MapView = View.extend({
    defaults: {
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        console.log("mapView is rendering!");
        $("#main").html("");
        $("#main").append(this.$el);

        var table = $("<table></table>").addClass("gameTable");
        for(i=0; i < 11; i++) {
            var row = $("<tr></tr>");
            for(j=0; j < 11; j++) {
                var iCoord = 10-i;
                var td = $("<td id='" + j +"-" + iCoord + "'></td>");
                row.append(td);
            }
            table.append(row);
        }

        this.$el.append(table);
    },

});


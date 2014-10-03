var View = Backbone.View.extend();


var MapObjectView = View.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {

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
                var td = $("<td id='" + iCoord +"," + j + "'></td>");
                row.append(td);
            }
            table.append(row);
        }

        this.$el.append(table);
    },

});

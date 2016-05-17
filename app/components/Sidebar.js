var React = require('react');

var DataDisplay = require("./data-display/DataDisplay.js");
var SearchBox = require("./SearchBox.js")

var SideBar = React.createClass({


    getInitialState: function() {
    return { 
        tab: "Home"
    };
    },

    geocode: function() {
        var component = this;
        var city = this.state.city;

        $.get("/api/geocode?city=" + city, function(data) {
            console.log(data);
            component.setState({location: data})
        });
    },

    getSegments: function() {

    

    var data = this.state.location;
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'api/strava',                      
        success: function(data) {
            console.log('success');
            console.log(JSON.parse(data));
        }
    });

    },

    setCity: function(event) {
        this.setState({city: event.target.value})
    },

    changeTab: function(tabName) {
        var component = this;
      if (tabName !== "Logout") {
          this.setState({tab: tabName}, console.log(component.state.tab));
        }

    },

    render: function() {
            var component = this;
       return (

            <div> 
            <SearchBox />
            <DataDisplay />
            <input type="text" value={this.state.city} onChange={this.setCity} />
            <button className="btn btn-primary" onClick={this.geocode}>Geocode</button>
            <button className="btn btn-secondary" onClick={this.getSegments}>Get Segments</button>
            </div>
        );
  
  
      }
});

module.exports=SideBar
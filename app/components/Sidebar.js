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
            </div>
        );
  
  
      }
});

module.exports=SideBar
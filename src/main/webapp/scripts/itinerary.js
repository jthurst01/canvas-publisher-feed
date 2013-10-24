(function ($, $$) {

    "use strict";

    var action = "share", itinerary;

    var itineraries = {
            123:
            {id : 123, status : "Waiting",  description : "Release Planning at HQ",  date: "09/20/2013",
                flights : [
                    {airline : "United", flight : "UA702",
                        departs : {city : "Denver, CO", airport : "DEN", day : "09/20/2013", time : "08:15 AM"},
                        arrives : {city : "San Francisco, CA", airport : "SFO", day : "09/20/2013", time : "09:30 AM"}},
                    {airline : "United", flight : "UA123",
                        departs : {city : "San Francisco, CA",airport : "SFO", day : "09/23/2013", time : "07:53 PM"},
                        arrives : {city : "Denver, CO", airport : "DEN", day : "09/23/2013", time : "10:30 PM"}}
                ],
                hotel : {name : "Marriott Marquis", address : {street : "55 Fourth Street", city : "San Francisco", state : "CA", zip : "94103"},
                    checkin : "09/01/2013", days : "2", rooms : "1", rate : "$230 USD"},
                total : "$2300.00"
            },
            124:
            {id : 124, status : "Approved", description : "Sales Kickoff - Vegas",  date: "09/10/2013",
                flights : [
                    {airline : "Southwest", flight : "UA702",
                        departs : {city : "Denver, CO", airport : "DEN", day : "09/10/2013", time : "08:15 AM"},
                        arrives : {city : "Las Vegas, NV", airport : "SFO", day : "09/10/2013", time : "09:30 AM"}},
                    {airline : "Southwest", flight : "UA123",
                        departs : {city : "Las Vegas, NV", airport : "SFO", day : "09/14/2013", time : "07:53 PM"},
                        arrives : {city : "Denver, CO", airport : "DEN", day : "09/14/2013", time : "10:30 PM"}}
                ],
                hotel : {name : "Cosmopolitan", address : {street : "Strip", city : "Las Vegas", state : "NV", zip : "84103"},
                    checkin : "09/01/2013", days : "1", rooms : "1", rate : "$530 USD"},
                total : "$1500.00"
            },
            125:
            {id : 125, status : "Complete", description : "Trip to HQ Sprint Planning",  date: "06/18/2013",
                flights : [
                    {airline : "Delta", flight : "UA702",
                        departs : {city : "Denver, CO", airport : "DEN", day : "06/18/2013", time : "08:15 AM"},
                        arrives : {city : "San Francisco, CA", airport : "SFO", day : "06/18/2013", time : "09:30 AM"}},
                    {airline : "Delta", flight : "UA123",
                        departs : {city : "San Francisco, CA", airport : "SFO", day : "06/22/2013", time : "07:53 PM"},
                        arrives : {city : "Denver, CO", airport : "DEN", day : "06/22/2013", time : "10:30 PM"}}
                ],
                hotel : {name : "Marriott Marquis", address : {street : "55 Fourth Street", city : "San Francisco", state : "CA", zip : "94103"},
                    checkin : "09/01/2013", days : "2", rooms : "1", rate : "$420 USD"},
                total : "$1300.00"
            },
            126:
            {id : 126, status : "Complete", description : "Hawaii Vacation",  date: "04/02/2013",
                flights : [
                    {airline : "United", flight : "UA702",
                        departs : {city : "Denver, CO", airport : "DEN", day : "04/02/2013", time : "08:15 AM"},
                        arrives : {city : "Honolulu, HI", airport : "SFO", day : "04/02/2013", time : "09:30 AM"}},
                    {airline : "United", flight : "UA123",
                        departs : {city : "Honolulu, HI", airport : "SFO", day : "04/12/2013", time : "07:53 PM"},
                        arrives : {city : "Denver, CO", airport : "DEN", day : "04/12/2013", time : "10:30 PM"}}
                ],
                hotel : {name : "Waikiki Beach Marriott", address : {street : "2552 Kalakaua Avenue", city : "Oahu", state : "HI", zip : "96815"},
                    checkin : "09/01/2013", days : "3", rooms : "1", rate : "$660 USD"},
                total : "$3300.00"
            }
        };
    
    var module = {

        instance : function (sr) {
            var payload;

            function refresh(id) {
                var v, $tbody;
                if (!$$.isNil(id)) {
                    $tbody = $("#reservation tbody");
                    v = itineraries[id];
                    $tbody.append(
                        "<tr id='"+ id + "'><td id='status'>" + v.status  +
                            "</td><td>" + v.description + "</td><td>" + v.total + "</td><td>" + v.date + "</td></tr>");
                }
                else {
                    $tbody = $("#reservations tbody");
                    $.each(itineraries, function(i, v) {
                        $tbody.append(
                            "<tr id='"+ i + "'><td>" + v.status  +
                                "</td><td>" + v.description + "</td><td>" + v.date + "</td></tr>");
                    });
                }
            }

            function prettyPrint(id) {

                var it = itineraries[id];

                var text = "My Itinerary For: " + it.description + "\n";
                	text += "Status: " + it.status + "\n";
                	text += "Date: " + it.date + "\n\n";
                    for (var i = 0; i < it.flights.length; i++) {
                        var f = it.flights[i];
                        text += "Flight: " + f.airline + " " + f.flight + "- " + f.departs.city + " (" + f.departs.airport + ") to " +
                                f.arrives.city + " (" + f.arrives.airport +")\n";
                        text += "Departs: " + f.departs.city + ": " + f.departs.day + " " + f.departs.time + "\n";
                        text += "Arrives: " + f.arrives.city + ": " + f.departs.day + " " + f.arrives.time + "\n\n";
                    }
                    text += "Hotel: " + it.hotel.name + ", " + it.hotel.address.street + ", " + it.hotel.address.city + ", " + it.hotel.address.state + "\n";
                    text += "Room " + it.hotel.rooms + ", Days " + it.hotel.days + ", Guests 1\n";
                    text += "Daily Rate: " + it.hotel.rate + "\n";
                    text += "Check In: " + it.hotel.checkin;

                return text;
            }

            function approve(id) {

                $(function() {
                    $("button" )
                        .button()
                        .click(function( event ) {
                            event.preventDefault();
                            action = $(this).attr("id");
                            $("#status").empty().append(("approve" === action) ? "Approved" : "Denied");
                        });
                });

                console.log("Approve...." + id);
                refresh(id);
            }

            function draw() {

                $("#reservations").chromatable({
                    width: "100%",
                    height: "100%",
                    scrolling: "yes"
                });

                $("#reservations").selectable({
                    filter:'tr',
                    selected: function(event, ui){
                        var s = $(this).find('.ui-selected');
                        itinerary = s[0].id;
                        console.log("Itinerary: " + itinerary);

                        // @review - generate named methods instead (fireEnable())
                        console.log("Fire event from client");
                        $$.client.publish(sr.client, {name : 'publisher.setValidForSubmit', payload : true});
                    }
                });

                $( "#radio" ).buttonset();
                $("#radio :radio").click(function(e) {
                    var rawElement = this;
                    var $element = $(this);
                    action = $(this).attr("id");
                    console.log("Action: " + action);
                });
                
                $( "#switch" ).buttonset();
                $("#switch :radio").click(function(e) {
                    var rawElement = this;
                    var $element = $(this);
                    var tempAction = $(this).attr("id");
                  	action = "share";
                    $('#reservations .ui-selected').removeClass('ui-selected')
                    console.log("Action: " + action);
                });
                
                $( "#radio2" ).buttonset();
				$("#radio2 :radio").click(function(e) {
                    var rawElement = this;
                    var $element = $(this);
                    action = $(this).attr("id");
                    console.log("Action: " + action);
                });
                
                refresh();
            }
            
            var handlers = {
                onSetupPanel : function(payload) {
                	console.log("EH Module setupPanel..", payload);
                },
                onShowPanel : function(payload) {
                    console.log("EH Module showPanel", payload);
                },
                onClearPanelState : function(payload) {
                    console.log("EH Module clearPanelState");
                    // Clear the selected reservation
                    $('#reservations .ui-selected').removeClass('ui-selected')
                    
                    // Clear the selected radio buttons
                    $('input[name="radio"]').prop('checked', false);
                    
                    // Re enable the default selection
                    action = "share";
                    $('#share').prop('checked', true);
                    $("#radio :radio").button( "refresh");
                    $('#itin').prop('checked', true);
                },
                onSuccess : function() {
                    console.log("EH Module onSuccess");
                },
                onFailure : function () {
                    console.log("EH Module onFailure");
                },
                onGetPayload : function () {
                    var p = {};
                    console.log("EH Module getPayload");
                    if ("share" === action) {
                        p.feedItemType = "TextPost";
                        p.auxText = prettyPrint(itinerary);
                    }
                    else if ("link" === action) {
                        p.feedItemType = "LinkPost";
                        p.auxText = "Please Approve my trip: " + itineraries[itinerary].description;
                        p.url = "https://canvas-publisher-feed.herokuapp.com/feed.jsp?itinerary=" + itinerary;
                        p.urlName = itineraries[itinerary].description;
                    }
                    else if ("approval" === action) {
                         p.feedItemType = "CanvasPost";
                         p.auxText = "Please Approve my trip: " + itineraries[itinerary].description;
                         p.namespace =  sr.context.application.namespace;
                         p.developerName =  sr.context.application.developerName;
                         p.thumbnailUrl = "https://canvas-publisher-feed.herokuapp.com/images/plane.png";
                         p.parameters =  "{\"itinerary\":\"" + itinerary + "\"}";
                         p.title =  "Itinerary - " +itineraries[itinerary].description;
                         p.description = "This is a travel itinerary for Itinerary - " + itineraries[itinerary].description + ".  Click the link to open the Canvas App.";
                    }
                    
                    // Note: we can extend the payload here to include more then just value.
                    $$.client.publish(sr.client, {name : 'publisher.setPayload', payload : p});
                }
            };

            var that = {

                draw : draw,
                refresh : refresh,
                approve : approve,

                // Subscriptions to callbacks from publisher...
                subscriptions : [
                    {name : 'publisher.setupPanel', onData : handlers.onSetupPanel},
                    {name : 'publisher.showPanel', onData : handlers.onShowPanel},
                    {name : 'publisher.clearPanelState',  onData : handlers.onClearPanelState},
                    {name : 'publisher.failure', onData : handlers.onFailure},
                    {name : 'publisher.success', onData : handlers.onSuccess},
                    {name : 'publisher.getPayload', onData : handlers.onGetPayload}
                ]
            };
            return that;
        }
    };

    // Replace with module pattern
    window.itinerary = module;

}(jQuery, Sfdc.canvas));
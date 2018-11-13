var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var cd_pattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;
// ____________________________________________________

/**
 * Build and execute request to look up voter info for provided address.
 * @param {string} address Address for which to fetch voter info.
 * @param {function(Object)} callback Function which takes the
 *     response object as a parameter.
 */
function lookup(address, callback) {
/**
     * Election ID for which to fetch voter info.
     * @type {number}
     */
    var electionId = 2000;

    /**
     * Request object for given parameters.
     * @type {gapi.client.HttpRequest}
     */
    var req = gapi.client.request({
        'path' : '/civicinfo/v2/representatives',
        'params' : {'electionId' : electionId, 'address' : address}
    });
req.execute(callback);
}

/**
* Render results in the DOM.
* @param {Object} response Response object returned by the API.
* @param {Object} rawResponse Raw response from the API.
*/
function renderResults(response, rawResponse) {
    var check_local;

    let show_local   = document.getElementById("show_local_results").checked;
    check_local = show_local;
    var check_county;
    let show_county   = document.getElementById("show_county_results").checked;
    check_county = show_county;
    var check_state;
    var show_state   = document.getElementById("show_state_results").checked;
    check_state = show_state;
    var check_federal;
    var show_federal   = document.getElementById("show_federal_results").checked;
    check_federal = show_federal;

    let oll = document.querySelector('#head');
    while (oll.firstChild)
    {
        oll.removeChild(oll.firstChild);
    }

    $("#head").append(
        "<tr><th>Official</th><th>Photo</th><th>Office</th><th>Party</th><th class='b' >Website</th></tr>"
    );

    let ol = document.querySelector('#body');
    while (ol.firstChild)
    {
        ol.removeChild(ol.firstChild);
    }

    if(check_federal)
    {
        for_loop(response, federal_pattern);
    }
    if(check_state)
    {
        for_loop(response, state_pattern);
        for_loop(response, cd_pattern);
    }
    if(check_county)
    {
        for_loop(response, county_pattern);
    }
    if(check_local)
    {
        // console.log("entered");
        for_loop(response, local_pattern);
    }
    if(!check_federal && !check_county && !check_local && !check_state)
    {
        loop_whole(response);
    }

    let tab = document.getElementById('local-results');
    let rows = tab.rows;

    for(let i = 0; i < rows.length; i++)
    {
        if(rows[i].cells[3].innerHTML == "Republican")
        {
            rows[i].style.backgroundColor = "#f5a095";
        }
        else if(rows[i].cells[3].innerHTML == "Democratic")
        {
            rows[i].style.backgroundColor = "#75bdf5";
        }
        else if(rows[i].cells[3].innerHTML == "Nonpartisan")
        { 
            rows[i].style.backgroundColor = "#f5e395";
        }
    }
   
}

function loop_whole(response)
{
    let contest = response["officials"];
    let offices = response["offices"];
    for(let i = 0; i < offices.length; i++)
    {
        let dic = contest[i];
        let dic_off = offices[i];
        let can = dic['name'];
        if(typeof offices == "undefined")
        {
            break;
        }
        let pic = dic['photoUrl'];
        let urls = dic['urls'];
        if(typeof dic['photoUrl'] == "undefined")
        {
            pic = "img/blank-person.jpg";
        }
        let undef;
        if('urls' in dic)
        {
            if(typeof urls[0] != "undefined")
            {
                undef = "Independent";
                
            }
            if(urls[0] == "unknown")
            {
                undef= "Independent";
            }
            undef = urls[0];
        }
        let def_name = "unknown";
        if(typeof dic_off != "undefined")
        {
            if(typeof dic_off['name'] != "undefined")
            {
                def_name = "Independent";
                
            }
            if(dic_off['name'] == "unknown")
            {
                def_name= "unknown";
            }
            def_name = dic_off['name'];
        }
        $('#body').append(
            '<tr><th>' + can + '</th><th><img src="' + pic 
        + '" </th><th>'
            + def_name + '</th><th>' + dic["party"] + '</th><th class="b"><a href="' +
         undef + '" style="color:white">' + undef +  '</a></th>' + 
         + '</tr>');
    }
}

function for_loop(response, pattern)
{
    let contest = response["officials"];
    let offices = response["offices"];
    for(let i = 0; i < offices.length; i++)
    {
        let dic = contest[i];
        let dic_off = offices[i];
        let can = dic['name'];
        if(typeof offices == "undefined")
        {
            break;
        }

        if(!offices[i]["divisionId"].match(pattern))
        {
            continue;
        }
        let pic = dic['photoUrl'];
        let urls = dic['urls'];
        if(typeof dic['photoUrl'] == "undefined")
        {
            pic = "img/blank-person.jpg";
        }
        let undef;
        if('urls' in dic)
        {
            if(typeof urls[0] != "undefined")
            {
                undef = "Independent";
                
            }
            if(urls[0] == "unknown")
            {
                undef= "Independent";
            }
            undef = urls[0];
        }
        let def_name = "unknown";
        if(typeof dic_off != "undefined")
        {
            if(typeof dic_off['name'] != "undefined")
            {
                def_name = "Independent";
                
            }
            if(dic_off['name'] == "unknown")
            {
                def_name= "unknown";
            }
            def_name = dic_off['name'];
        }
        $('#body').append(
            '<tr><th>' + can + '</th><th><img src="' + pic 
        + '" </th><th>'
         + def_name + '</th><th>' + dic["party"] + '</th><th class="b" ><a href="' +
         undef + '" style="color:white">' + undef +  '</a></th>' + 
         + '</tr>');
    }
}
/**
* Auto-complete for search bar
*/
$(function () {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {types: ['address']});
})
   
var clickk = false;
$('button').click(function (event) {
    gapi.client.setApiKey('AIzaSyBsP_HExLE7-6QINDS-5gGHNFyno8FW9F8');
    event.preventDefault();
    // console.log("'"+$('#address').val()+"'");
    clickk = true;
    lookup("'"+$('#address').val()+"'", renderResults);
    // lookup('500 Westlake Avenue North, Seattle, WA, USA', renderResults);
});

var addy = document.getElementById('address');
addy.addEventListener('keypress', function(event) {
    if (event.keyCode == 13 && !clickk) 
    {
        gapi.client.setApiKey('AIzaSyBsP_HExLE7-6QINDS-5gGHNFyno8FW9F8');
        event.preventDefault();
        console.log("'"+$('#address').val()+"'");
        lookup("'"+$('#address').val()+"'", renderResults);
    }
});
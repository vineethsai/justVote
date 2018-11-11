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

    var social_icon_lookup = {
        'YouTube': 'youtube',
        'Facebook': 'facebook',
        'Twitter': 'twitter',
        'GooglePlus': 'google-plus'
    };
    
    var social_link_lookup = {
        'YouTube': 'https://www.youtube.com/user/',
        'Facebook': 'https://www.facebook.com/',
        'Twitter': 'https://twitter.com/',
        'GooglePlus': 'https://plus.google.com/'
    };


    // console.log(rawResponse);
    console.log(response);
    let ol = document.querySelector('#body');
    while (ol.firstChild)
    {
        ol.removeChild(ol.firstChild);
    }
    let contest = response["officials"];
    let offices = response["offices"];


    

    // console.log(contest);
    for(let i = 0; i < contest.length; i++)
    {
        let dic = contest[i];
        let dic_off = offices[i];
        let can = dic['name'];
        // var img = $('<img />', {src : '' + });
        let pic = dic['photoUrl'];
        let urls = dic['urls'];
        // let emails = dic['emails'];

        if (typeof dic.channels !== 'undefined'){
            var channels = [];
            $.each(dic.channels, function(i, channel){
                if (channel.type != 'GooglePlus' && channel.type != 'YouTube') {
                    channel['icon'] = social_icon_lookup[channel.type];
                    channel['link'] = social_link_lookup[channel.type] + channel['id'];
                    channels.push(channel);
                }
            });

        }
        // console.log(channels);
        if(typeof dic['photoUrl'] == "undefined")
        {
            // console.log(pic);
            pic = "img/blank-person.jpg";
            // console.log(pic);
        }
        // let final_url = url(urls);
        // console.log(can);
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
         + def_name + '</th><th>' + dic["party"] + '</th><th><a href="' +
         undef + '" style="color:white">' + undef +  '</a></th>' + 
         + '</tr>');
    }
    // console.log("hi");
    let tab = document.getElementById('local-results');
    let rows = tab.rows;
    console.log(rows);
    for(let i = 0; i < rows.length; i++)
    {
        if(rows[i].cells[3].innerHTML == "Republican")
        {
            // console.log(rows[i].cells[3].innerHTML);  
            rows[i].style.backgroundColor = "#f16060";
        }
        else if(rows[i].cells[3].innerHTML == "Democratic")
        {
            // console.log(rows[i].cells[4].innerHTML);  
            rows[i].style.backgroundColor = "rgb(75, 157, 250)  ";
        }
        else if(rows[i].cells[3].innerHTML == "Nonpartisan")
        {
            // console.log(rows[i].cells[4].innerHTML);  
            rows[i].style.backgroundColor = "rgb(251, 236, 137)";
        }
    }
   
}



    
// function url(urls)
// {
//     let ret = '';
//     urls.forEach(element => {
//         ret = ret + element;
//     });
//     return ret;
// }

// function links(link)
// {
//     if(link.length == 0)
//     {
//         return;
//     }
//     let ret = '';
//     for(let i = 0; i < link.size; i++)
//     {
//         console.log(link[i]);
//         ret = ret + link[i];
//     }
//     console.log(ret);
//     console.log("hi");
//     return ret;
// }

/**
* Auto-complete for search bar
*/
$(function () {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {types: ['address']});
})
   
    
    $('button').click(function (event) {
        gapi.client.setApiKey('AIzaSyD7zJVtw_WpAd6gEV2rlPpjFhEykWV8zkw');
        event.preventDefault();
        console.log("'"+$('#address').val()+"'");
        lookup("'"+$('#address').val()+"'", renderResults);
        // lookup('500 Westlake Avenue North, Seattle, WA, USA', renderResults);
    });


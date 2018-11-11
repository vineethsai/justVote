// function renderTrack(song)
// {
//   $('#records').append('<img src="' + song.artworkUrl100 + '" alt = "' + song.trackName + '" title = "' + song.trackName + '">');
// }

// function renderSearchResults(song)
// {
//   let ol = document.querySelector('#records');
//   while (ol.firstChild)
//   {
//     ol.removeChild(ol.firstChild);
//   }
//   if (song.results.length == 0) {
//     renderError(new Error("No results found"));
//   }
//   for (let i = 0; i < song.results.length; i++)
//   {
//     ol.append(renderTrack(song.results[i]));
//   }
// }

// const api = "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyD7zJVtw_WpAd6gEV2rlPpjFhEykWV8zkw";

// function fetchTrackList(item) {
//   let url = URL_TEMPLATE.replace("{searchTerm}", item);
//   togglerSpinner();
//   let promise = fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderSearchResults(data);
//     })
//     .catch(function (err) {
//       renderError(err);
//     })
//     .then(function () {
//       togglerSpinner();
//     });
//   return promise;
// }



// $('button').click(function (event) {
//   event.preventDefault();
//   fetchTrackList($('#searchQuery').val());
// });


// function renderError(error) {
//   $('#records').append('<p class="alert alert-danger">' + error.message + '</p>');
// }


// function togglerSpinner() {
//   $('.fa-spinner').toggleClass('d-none');
// }
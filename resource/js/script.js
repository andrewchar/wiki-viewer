$(document).ready(function() {

    var wikiUrl = "https://en.wikipedia.org/w/api.php?callback=?";
    var searchValue = "";

    // records data entree for search
    $("#wikiSearchField").on("input", function(event) {
        searchValue = event.target.value;
    });

    // calls json on submit
    $("#formSearch").on("submit", function(event) {
        event.preventDefault()
        $("#wikiSearchResult").empty();
        wikiSearch(searchValue);
    });

    // api call
    function wikiSearch(theQuery) {
        $.ajax({
            url: wikiUrl,
            data: {
                action: "opensearch",
                list: 'search',
                format: "json",
                search: theQuery,
                limit: 10
            },
            dataType: 'jsonp',
            type: 'GET',
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },
            success: function(data) {
                // if no content found, construct content block with nothing found
                if (data[1] == "") {
                    $("#wikiSearchResult").append("<li><span class='title'>The page '" + searchValue + "' does not exist. You can</span> " + "<a href='https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation' target='_blank'><span class='description'>ask for it to be created.</span></a>" + "</li>")
                }

                // convert json to separate information
                $.each(data[1], function(i) {
                    var page = {};

                    page.name = data[1][i];
                    page.url = data[3][i];

                    if (data[2][i] !== "") {
                        page.brief = data[2][i];
                    } else {
                        page.brief = "Summary Unavailable..";
                    };

                    // construct main content block
                    $("#wikiSearchResult").append("<li class='leftLine'><a href='" + page.url + "' target='_blank'>" + "<span class='title'>" + page.name + "</span>" + "<span class='description'> - " + page.brief + "</span>" + "</a></li><hr class='style1'>");
                });
            }
        })
    };
});
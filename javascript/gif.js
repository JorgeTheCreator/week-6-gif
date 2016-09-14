var animateUrl = "";
    var staticUrl = ""; 
    var btnnSearch = ["Finding Dory", "Zootopia", "The jungle book", "Sleeping Beauty"];
    
    //function to replace the space in any strings with a plus sign
    function replaceSpace(string){        
       alteredString = string.replace(/ /g, "+");
       //console.log(alteredString);
       return alteredString; 
    }   
    
    function btnnGroup() {
        for(var i =0; i < btnnSearch.length; i++){
            var fixedItem = replaceSpace(btnnSearch[i]); //replacing the space in the existing button names
            $("#btnnArea").append("<button class='buttonGiphy btn btn-danger' data-gip="+fixedItem+">"+btnnSearch[i]+"</button>");
        }
    } //function btnnGroup

    btnnGroup(); //make the buttons

    $('#addButton').on('click', function(){
        var newItem = $('#addItemText').val();
        if(jQuery.trim(newItem).length > 0){ //checking for empty input
            var fixedItem = replaceSpace(newItem); //need to make sure space is replaced with a +
            //console.log("fixedItem " + fixedItem);
            $("#btnnArea").append("<button class='buttonGiphy btn btn-primary' data-gip="+fixedItem+">"+newItem+"</button>"); 
            $('#addItemText').val(""); 
        }//if      
    });//addButton

    
        $('body').on('click','.buttonGiphy', function(){
            $(this).addClass('active');
            
            var p = $(this).data('gip'); 

            //do the giphy search
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&random&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {
               var results = response.data;         

               for(var i=0; i < results.length; i++){

                var rating = results[i].rating;
                var p = $('<p>').text( "Rating: " + rating);

                var gipImage = $('<img>');

                animateUrl = results[i].images.fixed_height.url;
                staticUrl = results[i].images.fixed_height_still.url; 
                gipImage.attr('src', animateUrl);
                gipImage.attr('data-state', "animate");
                gipImage.attr('data-animate', animateUrl);  
                gipImage.attr('data-still', staticUrl); 
                gipImage.attr('class', "giphyItem");
                gifDiv = $('<div class="item">');          
                gifDiv.append(p);
                gifDiv.append(gipImage);
                $('#giphyArea').prepend(gifDiv); //add the giphy   
                }

            }); 
    });//button onclick
    
    $('body').on('click','.giphyItem',function(){ // need body elem to get dom to recognize this event
        var state = $(this).attr('data-state');
        
        if ( state === 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
        }
        else {       
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');                
        }
    }); //still or animiate the pictures
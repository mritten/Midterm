"use strict"

$(() => {
    let h1 = document.getElementsByTagName('h1')[1];
    const start = document.getElementById('start');
    let seconds = 0;
    let minutes = 0;
    let t;
    const booze = ['images/jack.jpg', 'images/hennessey.jpg', 'images/makers.jpg', 'images/grey-goose.jpg','images/jack.jpg', 'images/hennessey.jpg', 'images/makers.jpg', 'images/grey-goose.jpg'];

    Array.prototype.shuffle = function() {
        const input = this;
         
        for (let i = input.length-1; i >=0; i--) {
         
            const randomIndex = Math.floor(Math.random()*(i+1)); 
            const itemAtIndex = input[randomIndex]; 
             
            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }
        return input;
    }
    booze.shuffle();

    function add() {
        seconds++;
        if (seconds >= 60) {
        seconds = 0;
        minutes++;
        };
        
        h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    };

    /* Start button */
    $('#start').on('click', add);
    $('#start').on('click', cardGame);

    function timer() {
    t = setTimeout(add, 1000);
    };
 
    /* Reset button */
    $('#reset').on('click', () => {
        h1.textContent = "00:00";
        seconds = 0; minutes = 0;
        clearTimeout(t);
        const cardSet = $('.deck img');
        cardSet.attr('src', 'images/card1.png').addClass('card');
        $('.deck').off('click');
        booze.shuffle();
        $("#takeashot").hide();
        $("#winner").hide();
        $(".deck").show();
    });

    function cardGame() {
        let selectedCards = [];
        let matchedCards = [];

        $('#takeashot').on('click', () => {
            $("#takeashot").hide();
            $(".deck").show();
        });

        $('.deck').on('click', '.card', function() {
            const index = $(this).index();
            

            if (selectedCards.length < 2) {
                $(this).attr("src", booze[index]).removeClass('card');
                selectedCards.push({el: this, src:booze[index]});

            }
            else {
                return;
            }
            if (selectedCards[0].src === selectedCards[1].src) {
                setTimeout(() => {
                    for(const card of selectedCards) {
                        $(card.el).attr('src', 'images/white.jpg').css('box-shadow', 'none');
                        matchedCards.push({el: this, src:booze[index]});
                    }
                    if (matchedCards.length === 8) {
                        setTimeout(() => {
                            $("#winner").show();
                            $(".deck").hide();
                        }, 1000);
                        clearTimeout(t);
                    };
                    selectedCards = [];
                    }, 500);
                
                } 
                else {
                setTimeout(() => {
                    for(const card of selectedCards) {
                        $(card.el).attr('src', 'images/card1.png').addClass('card');
                    }
                    selectedCards = [];
                    $("#takeashot").show();
                    $(".deck").hide();
                }, 1000);
            };
        });
    };
    
});
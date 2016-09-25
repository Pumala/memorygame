var score = 0;
var pair = false;
var cardNum = 0;
var imagesArray = [

                    "images/pokemon1.png",
                    "images/pokemon2.png",
                    "images/pokemon3.png",
                    "images/pokemon4.png",
                    "images/pokemon5.png",
                    "images/pokemon6.png",
                    "images/pokemon7.png",
                    "images/pokemon8.png",
                    "images/pokemon9.png",
                    "images/pokemon10.png"
                  ];

function makeCards() {
     var newArr = [];
     var count = 0;
     while (count < 2) {
          $.each(imagesArray, function(index, value) {
               newArr.push(value);
          });
          count += 1;
     }
     shuffle(newArr);
}

function shuffle(arr) {
     var length = arr.length;
     for(var i = 0; i < length; i++) {
          // random num between 0 - 19
          var randomNum = Math.floor(Math.random() * arr.length);
          $("#images").append("<div id='img" + i + "'><img src='" + arr[randomNum] +"'></div>");
          arr.splice(randomNum, 1);
     }
}

function resetGame() {
     score = 0;
     pair = false;
     cardNum = 0;
     $("#moves").html(score);
     $("#images").children().remove();
     makeCards();
     $("#images div").on("click", play);
}

function play() {
     var currCardId = "#" + $(this).attr("id");
     var currCard = $(currCardId + " img");
     if (currCard.is(":hidden")) {
          $(currCard).show("slow");
          isMatch(currCard);
     }
}

function isMatch(card) {
     if (!(pair)) {
          card1 = card;
          pair = true;
     } else {
          card2 = card;
          if (card1.attr("src") !== card2.attr("src")) {
               setTimeout(function() {
                    $(card1).hide("slow");
                    $(card2).hide("slow");
               }, 600);
          } else {
               cardNum++;
          }
          score++;
          $("#moves").html(score);
          pair = false;
          if (cardNum === 10) {
               setTimeout(function() {
                    $("#message").html("Congratulations! You completed the game in " + score + " moves!");
               }, 800);
          }
     }
}

$(document).ready(function() {
     makeCards();
     $("#images div").on("click", play);
     $("#reset").on("click", resetGame);
});

var theSrc = "";
var theId = "";
var theSrc2 = "";
var theId2 = "";
var divId = "";
var clickCount = 0;
var score = 0;
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

function shuffle() {
    newImgsArr = [];
    newImgsArr = $.merge($.merge([], imagesArray), imagesArray);
    var length = newImgsArr.length;
    var currentImg = $("#images div:first-child");
    for (var i = 0; i < length; i++) {
        var randomNum = Math.round(Math.random() * (newImgsArr.length - 1));
        $("#" + currentImg.attr("id") + " img").attr("src", newImgsArr[randomNum]);
        newImgsArr.splice(randomNum, 1);
        currentImg = currentImg.next();
    }
}

var one = "";
var two = "";
var cardNum = 0;
function play() {
if (cardNum === 10) {
    setTimeout(function(){
        $("#message").html("You completed the game in " + score + " moves!");
    }, 600);
    // setTimeout(function(){
    //     alert("AMAZING!! You completed the game in " + score + " moves!");
    // }, 600);
} else if (clickCount === 0) {
    divId = $(this).attr("id");
        if ($("#" + divId + " img").is(":hidden")) {
            $("#" + divId + " img").show("slow");
            one = $("#" + divId + " img");
            theSrc = $("#" + divId + " img").attr("src");
            clickCount++;
        }
    } else if (clickCount === 1) {
        divId2 = $(this).attr("id");
        if ($("#" + divId2 + " img").is(":hidden")) {
            $("#" + divId2 + " img").show("slow");
            two = $("#" + divId2 + " img");
            theSrc2 = $("#" + divId2 + " img").attr("src");
            clickCount++;
            score++;
            $("#moves").html(score);
            if (theSrc !== theSrc2) {
                setTimeout(function(){
                    one.hide("slow");
                    two.hide("slow");
                    divId = "";
                    divId2 = "";
                }, 600);
            } else {
                cardNum++;
            }
            clickCount = 0;
            play();
        }
    }
}

function resetGame() {
    cardNum = 0;
    clickCount = 0;
    score = 0;
    $("#message").html("");
    $("#moves").html(score);
    shuffle();
    $("img").hide();
}

$(document).ready(function(){
    for (var i = 0; i < 2; i++) {
        $.each(imagesArray, function(index, value){
            $("#images").append("<div id=img" + i + index + "><img src=" + value + "></div>");
        });
    }
    shuffle();
    $("#images div").click(play);
    $("#reset").click(resetGame);
});
$(document).ready(function () {

    //Global variables
    //variable for question list. Include properties for actual questions, choice/options, and correct answer.
    var quizQuestions = [
        {
            question: "A vehicle's torque converter transfers energy from the ______ to the ______.",
            options: ["transmission,engine", "transmission,differential", "engine,transmission", "differential,wheels"],
            answer: 2,
        },

        {
            question: "A vehicle's alternator provides current to the vehicle's ________.",
            options: ["battery", "electrical accessories", "neither(battery or electrical accessories)", "both(battery and electrical accessories)"],
            answer: 3,
        },

        {
            question: "Steering wheel shimmy when braking at high speeds can be caused by _______.",
            options: ["warped rotors", "worn struts", "faulty spark plugs", "a worn johnson rod"],
            answer: 0,
        },

        {
            question: "Driving with slightly low tire pressure will cause your tires to _______.",
            options: ["explode", "make a high piched squeal", "wear faster on outside edges", "wear faster in the center"],
            answer: 2,
        },

        {
            question: "Poor gas mileage can be due to _______.",
            options: ["improper wheel alignment", "brake drag", "a bad O2 sensor", "all of the above"],
            answer: 3,
        },

        {
            question: "A vehicle's ability to accelerate from a stop is refered to as _______.",
            options: ["torque", "Horsepower", "go time", "pre-mature acceleration"],
            answer: 0,
        },

        {
            question: "TPS stands for _______.",
            options: ["Tire pressure sensor", "Timing parameter sensor", "Throttle position sensor", "Tesla plan of success"],
            answer: 2,
        },

        {
            question: "Which of these is not a real car part?",
            options: ["muffler bearing", "camshaft position sensor", "crankshaft bearing", "wheel cylinder"],
            answer: 0,
        }];

    //variable for # of answers correct.
    var answersCorrect = 0;
    //variable for # answers wrong
    var answersWrong = 0;
    //varable for # of unanswered questions
    var unansweredCount = 0;
    //Variable for what the player guesses
    var playerGuess = {}
    //variable for interval id
    var intervalId;
    //variable for clock running (boolean)
    var clockRunning = false;
    //variable for timer
    var clock = 120;
    //variable to hold questions
    //var questionHolder = [];
   // var questionTally = [];not needed



    //Game play

    //hide reset button
    $("#reset").hide();
    $("#submit").hide();
    //click a button to start timer(call on function) and make questions appear
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestions();
        startClock();
        countDown();
        $("#submit").show();
        //for (var i = 0; i < quizQuestions.length; i++) {
        //questionHolder.push(quizQuestions[i])
        //}

    })
    //create timer start function 
    function startClock() {
        if (clockRunning === false) {
            intervalId = setInterval(countDown, 1000);
            clockRunning = true;
            console.log(clockRunning)
        }
    }
    //create function for countdown 
    function countDown() {
        $("#timeRemaining").html("<h3>Time Remaining: " + clock + "</h3>")
        clock--;

        //stop timer function if countdown reaaches 0 and clear questions
        //tally up score and display result
        if (clock === -1) {
            //((answersWrong + answersCorrect + unansweredCount) === questionTally)
            stopClock()
            $("#questionWindow").empty();
            $("#questionWindow").html("<h3>Times Up!!! Here are your results: </h3>");
            $("#newAnswerWindow").append("<h4> Correct: " + answersCorrect + "</h4>");
            $("#newAnswerWindow").append("<h4> Incorrect: " + answersWrong + "</h4>");
            $("#newAnswerWindow").append("<h4> Unanswered: " + unansweredCount + "</h4>");
            $("#reset").show();
            $("#submit").hide();
            console.log(answersCorrect);
            console.log(answersWrong);
            console.log(unansweredCount);

        }
    }

    //create timer stop function
    function stopClock() {
        clockRunning = false;
        clearInterval(intervalId);
        clock = 120;
    }


    //create function to display questions
    function displayQuestions() {


        for (var i = 0; i < quizQuestions.length; i++) {
            var playerOptions = $("<div>");
            console.log(quizQuestions[i])
            $("#questionWindow").append("<h3>" + quizQuestions[i].question + "</h3>");
            for (var j = 0; j < quizQuestions[i].options.length; j++) {
                playerOptions.addClass("answerOptions");
                playerOptions.attr("data-guessvalue", i);
                $("#questionWindow").append("<input type= 'radio' value= " + quizQuestions[i].options[j] + ">" + quizQuestions[i].options[j])
            }
            //array index to check answer
            // playerOptions.attr("data-guessValue", i); did not work
            //$("#answerWindow").append(playerOptions);did not work
            console.log(quizQuestions[i])


        }
        //click to choose answer
        $(".answerOptions").on("click", function () {
            //array position of player's choice.
            playerGuess = parseInt($(this).attr("data-guessvalue"));

            //if statement for answer correct
            if (playerGuess === quizQuestions.answer) {
                answersCorrect++;
                playerGuess = {};
                //$("#answerWindow").append("<h4>Correct!</h4>")
            }

            //if statement for answer wrong    
            else if (playerGuess !== quizQuestions.answer) {
                answersWrong++;
                playerGuess = {};
                // $("#answerWindow").append("<h4>Wrong!!! The right answer is: " + quizQuestions.options[quizQuestions.answer] + "</p>");
            }

            //if question is unanswered
            else {
                unansweredCount++;
                playerGuess = {};
            }


        })
    }
    $("#submit").on("click", function () {
        clock= 0;
    })

    //restart game
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerWindow").empty();
        $("#questionWindow").empty();
        $("#newAnswerWindow").empty();
        $("#submit").show();
        startClock();
        displayQuestions();
        //location.reload(); decided not to use since I don't fully understand. I think this one causes problems if any information is being saved.



    })


})


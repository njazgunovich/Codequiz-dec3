var pos = 0,
    test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
var tim;
var questions = [
    ["Which of the following is an interface ?", "Thread", "Date", "Calender", "A"],
    ["Which of the following a is not a keyword in Java ?", "class", "interface", "extends", "C"],
    ["What is the length of Java datatype int ?", "32 bit", "16 bit", "None", "C"],
    ["Which company released Java Version 8 ?", "Sun", "Oracle", "Adobe", "A"],
    ["What is the default value of Java datatype boolean?", "true", "false", "0", "A"]
];

var showscore = Math.round(correct / questions.length * 100);
var min = 1;
var sec = 60;
var f = new Date();

function _(x) {
    return document.getElementById(x);
}

function StartExam() {
    document.getElementById("Content").style.display = "block";
    document.getElementById("startbtncontent").style.display = "none";
    starttime();
}

function renderQuestion() {
    test = _("test");

    var showscore = Math.round(correct / questions.length * 100);


    if (pos >= questions.length) {

        test.innerHTML = "<h3>You got " + correct + " correct of " + questions.length + " questions</h3>";
        test.innerHTML += "<h3> Your Grade : " + showscore + "% </h3>";
        test.innerHTML += "<h4>Exam Finished in Time:" + sec + " Seconds</h4>";
        test.innerHTML += "<button onclick='EndExam()'>End the Exam</button>";
        _("test_status").innerHTML = "<h3>Test Completed</h3>";
        pos = 0;
        correct = 0;

        clearTimeout(tim);
        document.getElementById("starttime").style.display += 'none';
        document.getElementById("showtime").style.display += 'none';

        return false;
    }
    _("test_status").innerHTML = "<h3>Question " + (pos + 1) + " of " + questions.length + "</h3>";
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<input class='form-check-input' type='radio' name='choices' value='A'> " + chA + "<br>";
    test.innerHTML += "<input class='form-check-input' type='radio' name='choices' value='B'> " + chB + "<br>";
    test.innerHTML += "<input class='form-check-input' type='radio' name='choices' value='C'> " + chC + "<br><br>";
    test.innerHTML += "<button type='button' class='btn btn-primary' onclick='checkAnswer()'>Next</button><br><br>";


}

function checkAnswer() {
    choices = document.getElementsByName("choices");
    choice = -1;
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    if (choice == questions[pos][4]) {
        correct++;
    } else {
        if (sec > 10)
            sec -= 10;
        else {
            min -= 1;
            sec += 50;
        }
    }
    pos++;
    renderQuestion();
}

window.addEventListener("load", renderQuestion, false);


function EndExam() {
    document.getElementById("Content").style.display = "none";
    document.getElementById("startbtncontent").style.display = "block";
}


function starttime() {
    showtime();
    document.getElementById("starttime").innerHTML = "<h4>You started your Exam at " + f.getHours() + ":" + f.getMinutes() + "</h4>";
}

function showtime() {
    if (parseInt(sec) > 0) {
        sec = parseInt(sec) - 1;
        document.getElementById("showtime").innerHTML = "Your Left Time is :" + min + " Minutes :" + sec + " Seconds";
        tim = setTimeout("showtime()", 1000);
    } else {
        if (parseInt(sec) == 0) {
            min = parseInt(min) - 1;
            document.getElementById("showtime").innerHTML = "Your Left Time is :" + min + " Minutes :" + sec + " Seconds";
            if (parseInt(min) == 0) {
                clearTimeout(tim);
                alert("Time Up");
                EndExam();
            } else {
                sec = 60;
                document.getElementById("showtime").innerHTML = "Your Left Time is :" + min + " Minutes :" + sec + " Seconds";
                tim = setTimeout("showtime()", 1000);
            }
        }

    }
}
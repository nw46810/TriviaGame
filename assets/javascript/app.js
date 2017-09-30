
var questions = [{
  question: "Which of these actors played Joker?",
  answers: ["Keanu Reeves", "Chistian Bale", "Heath Ledger", "Russell Crowe"],
  correctAnswer: "Heath Ledger",
  image:"assets/images/joker.gif"

  }, {
  question: "Who is Mr. Freeze?",
  answers: ["Dr. Jonathan Crane", "Dr. Victor Fries", "Jason Peter Todd", "Dr. Robert Kirkland"],
  correctAnswer: "Dr. Victor Fries",
  image:"assets/images/chill.gif"
}, {
  question: "Which Batman villian is Oswald Cobblepot?",
  answers: ["Bane", "The Penguin", "Scarecrow", "The Riddler"],
  correctAnswer: "The Penguin",
  image:"assets/images/penguin.gif"
}, {
  question: "Which character's Symbol is a question mark?",
  answers: ["The Joker", "Poison Ivy", "The Riddler", "Harley Quinn"],
  correctAnswer: "The Riddler",
  image:"assets/images/riddler.gif"
}, {
  question: 'Who has NOT played Batman?',
  answers: ["Val Kilmer", "Ben Affleck", "Micheal Keaton", "Nicolas Cage"],
  correctAnswer: "Nicolas Cage",
  image:"assets/images/cage.gif"
}, {
  question: 'Who said "You either die a hero or live long enough to see yourself become the villian."?',
  answers: ["Bruce Wayne", "Harvey Dent", "Jim Gordan", "Alfred Pennyworth"],
  correctAnswer: "Harvey Dent",
  image:"assets/images/dent.gif"
}, {
  question: 'Who will "BREAK YOU"?',
  answers: ["Bane", "Two-Face", "Harley Quinn", "Killer Croc"],
  correctAnswer: "Bane",
  image:"assets/images/bane.gif"
}, {
  question: "Who is in love with the Joker?",
  answers: ["Catwoman", "Poison Ivy", "Madame Zodiac", "Harley Quinn"],
  correctAnswer: "Harley Quinn",
  image:"assets/images/quinn.gif"
}];


var panel = $('#questionContainer');
var countStart = 20;




$(document).on('click', '#startOver', function(e) {
  game.reset();
});

$(document).on('click', '.answerButton', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#innerContainer').prepend('<h2 id="timeLine">Time Remaining: <span id="counterDisplay">20</span> Seconds</h2>');
  game.loadQuestion();
});







var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStart,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counterDisplay').html(game.counter);

    if (game.counter === 0){
      game.outOfTime();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answerButton" id="button"' + 'data-name="' + 
        questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStart;
    $('#counterDisplay').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  outOfTime: function (){
    clearInterval(timer);
    $('#counterDisplay').html(game.counter);

    panel.html("<h2>You are out of time, sorry!</h2>");
    panel.append('<h3>The answer you were looking for was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html("<h2>Holy smoke, we're done here!</h2>");
    $('#counterDisplay').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<img src="assets/images/batman.gif" />');
    panel.append('<br><button id="startOver">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Not so fast!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Good Job!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 4 * 1000);
    } else {
      setTimeout(game.nextQuestion, 4 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
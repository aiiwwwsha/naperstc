var round = 1;
    var speedIncrement = 100;
    var roundStartTime;
    var maxRounds = 5; // Новая переменная для максимального количества раундов
    var currentRound = 1;
    var animationDuration = 1;
    var transitionDelay = 500;

    function random() {
      return Math.floor(Math.random() * 3) + 1;
    }

    function showBall() {
      var n = random();
      if (n == 1) {
        ball.style.left = "125px";
      } else if (n == 2) {
        ball.style.left = "325px";
      } else {
        ball.style.left = "525px";
      }
      ball.style.display = "block";
      setTimeout(hideBall, animationDuration * 1000);
    }

    function hideBall() {
      ball.style.display = "none";
      setTimeout(shuffle, transitionDelay);
    }

    function shuffle() {
      roundStartTime = new Date();
      var order = [1, 3, 2, 1];
      var currentIndex = 0;

      function performTransition() {
        var n = order[currentIndex];
        if (n == 1) {
          cup1.style.left = "500px";
          cup3.style.left = "100px";
          cup2.style.left = "300px";
        } else if (n == 2) {
          cup1.style.left = "300px";
          cup2.style.left = "100px";
          cup3.style.left = "500px";
        } else {
          cup2.style.left = "500px";
          cup3.style.left = "300px";
          cup1.style.left = "100px";
        }

        currentIndex++;
        if (currentIndex < order.length) {
          setTimeout(function () {
            cup1.style.transition = "left " + animationDuration + "s ease";
            cup2.style.transition = "left " + animationDuration + "s ease";
            cup3.style.transition = "left " + animationDuration + "s ease";

            setTimeout(function () {
              cup1.style.transition = "";
              cup2.style.transition = "";
              cup3.style.transition = "";
              performTransition();
            }, animationDuration * 1000);
          }, 0);
        } else {
          // Здесь раньше был вызов showBall, но мы убрали его
          reset(); // Плавное возвращение к исходным позициям
        }
      }

      performTransition();
    }

    function reset() {
      cup1.style.transition = "left 0.5s ease";
      cup2.style.transition = "left 0.5s ease";
      cup3.style.transition = "left 0.5s ease";
      cup1.style.left = "100px";
      cup2.style.left = "300px";
      cup3.style.left = "500px";

      // Добавлено для плавного возвращения к исходным позициям
      setTimeout(function () {
        cup1.style.transition = "";
        cup2.style.transition = "";
        cup3.style.transition = "";
      }, 500);
    }

    function check(n) {
      if (n == 1 && ball.style.left == "125px") {
        return true;
      } else if (n == 2 && ball.style.left == "325px") {
        return true;
      } else if (n == 3 && ball.style.left == "525px") {
        return true;
      } else {
        return false;
      }
    }

    function start() {
      play.disabled = true;
      showBall();
    }


    function nextRound() {
      if (currentRound < maxRounds) {
        currentRound++;
        reset();
        setTimeout(function () {
          hideBall();
          setTimeout(showBall, 500);
        }, 1000);
      } else {
        // Остановка игры после достижения максимального количества раундов
        play.disabled = true;
        message.innerHTML = "Игра завершена! 🏆 Вы выиграли все раунды!";
        message.style.display = "block";
      }
    }

    function end(n) {
      play.disabled = false;
      reset();
      if (check(n)) {
        speedIncrement += 100;
        animationDuration = Math.max(0.1, animationDuration - 0.1);
        var currentTime = new Date();
        var elapsedTime = (currentTime - roundStartTime) / 1000;
        var delay = Math.max(0, 4 - elapsedTime) * 1000;
        setTimeout(function () {
          showBall();
        }, delay);
        message.innerHTML = "Вы выиграли! 🎉 Раунд: " + currentRound;
        setTimeout(nextRound, 2000);
      } else {
        message.innerHTML = "Вы проиграли! 😢";
        currentRound = 1;
        speedIncrement = 100;
        animationDuration = 1;
      }
      message.style.display = "block";
      setTimeout(function () {
        message.style.display = "none";
      }, 1000);
    }

    play.addEventListener("click", start);
    cup1.addEventListener("click", function () {
      end(1);
    });
    cup2.addEventListener("click", function () {
      end(2);
    });
    cup3.addEventListener("click", function () {
      end(3);
    });

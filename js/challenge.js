document.addEventListener("DOMContentLoaded", (event) => {
  let counter = document.getElementById("counter");
  let minusButton = document.getElementById("minus");
  let plusButton = document.getElementById("plus");
  let heartButton = document.getElementById("heart");
  let pauseButton = document.getElementById("pause");
  let submitButton = document.getElementById("submit");
  let likesList = document.querySelector(".likes");
  let commentForm = document.getElementById("comment-form");
  let commentInput = document.getElementById("comment-input");
  let commentList = document.getElementById("list");

  let likes = {};
  let paused = false;
  let timer;

  // Function to disable/enable buttons using the disabled property

  function toggleButtons(disabled) {
    minusButton.disabled = disabled;
    plusButton.disabled = disabled;
    heartButton.disabled = disabled;
    submitButton.disabled = disabled;
  }

  // Start the timer initially
  timer = setInterval(() => {
    if (!paused) {
      let currentCount = parseInt(counter.innerText);
      counter.innerText = currentCount + 1;
    }
  }, 1000);

  minusButton.addEventListener("click", () => {
    let currentCount = parseInt(counter.innerText);
    counter.innerText = currentCount - 1;
  });

  plusButton.addEventListener("click", () => {
    let currentCount = parseInt(counter.innerText);
    counter.innerText = currentCount + 1;
  });

  heartButton.addEventListener("click", () => {
    let currentCount = parseInt(counter.innerText);
    if (!likes[currentCount]) {
      likes[currentCount] = 0;
    }
    likes[currentCount]++;
    likesList.innerHTML = "";
    for (let count in likes) {
      let listItem = document.createElement("li");
      listItem.textContent = `${count} has been liked ${likes[count]} time${
        likes[count] > 1 ? "s" : ""
      }`;
      likesList.appendChild(listItem);
    }
  });

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.innerText = paused ? "resume" : "pause";
    toggleButtons(paused);
    if (paused) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        let currentCount = parseInt(counter.innerText);
        counter.innerText = currentCount + 1;
      }, 1000);
    }
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newComment = document.createElement("p");
    newComment.textContent = commentInput.value;
    commentList.appendChild(newComment);
    commentInput.value = "";
  });
});

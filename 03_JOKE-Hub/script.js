const jokesArr = [
  {
    error: false,
    amount: 10,
    jokes: [
      { joke: "Today I learned that changing random stuff until your program works is \"hacky\" and a \"bad coding practice\" but if you do it fast enough it's \"Machine Learning\" and pays 4x your current salary.",},
      { joke: "Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says \"Do you get the reference?\" But Java didn't.",},
      { joke: "A SQL statement walks into a bar and sees two tables.\nIt approaches, and asks \"may I join you?\" "},
      { joke: "Java is like Alzheimer's, it starts off slow, but eventually, your memory is gone." },
      { joke: "There are only 10 kinds of people in this world: those who know binary and those who don't." },
      { joke: "If you're here for the yodeling lesson, please form an orderly orderly orderly queue." },
      { joke: "\"Honey, go to the store and buy some eggs.\"\n\"OK.\"\n\"Oh and while you're there, get some milk.\"\nHe never returned." },
      { joke: "The six stages of debugging:\n1. That can't happen.\n2. That doesn't happen on my machine.\n3. That shouldn't happen.\n4. Why does that happen?\n5. Oh, I see.\n6. How did that ever work?" },
      { joke: "Knock knock.\nWho's there?\nRecursion.\nRecursion who?\nKnock knock." },
      { joke: "\"Can I tell you a TCP joke?\"\n\"Please tell me a TCP joke.\"\n\"OK, I'll tell you a TCP joke.\"" },
      { joke: "Debugging: Removing the needles from the haystack.",},
      { joke: "Four engineers get into a car. The car won't start.\nThe Mechanical engineer says \"It's a broken starter\".\nThe Electrical engineer says \"Dead battery\".\nThe Chemical engineer says \"Impurities in the gasoline\".\nThe IT engineer says \"Hey guys, I have an idea: How about we all get out of the car and get back in\"."}
    ],
  },
];

// Grab elements
const textjoke = document.querySelector(".textjoke");
const text = document.querySelector(".text");

// Function to show loading dots
function showLoadingDots(element) {
    text.textContent = "Wait a second";
  element.innerHTML = `<div class="dots">
    <span>.</span><span>.</span><span>.</span>
  </div>`;
}

// Add click event
textjoke.addEventListener("click", () => {
  const jokesList = jokesArr[0].jokes;

  // Show dots first
  showLoadingDots(textjoke);

  // After 2 seconds, show joke
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * jokesList.length);
    textjoke.textContent = jokesList[randomIndex].joke;
    text.textContent = "Click again for another one";
  }, 1000);
});

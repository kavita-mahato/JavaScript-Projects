const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const btnfunction = document
  .getElementById("btn")
  .addEventListener("click", function () {
    if (inputBox.value === "") {
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
  });

const taskRemove = listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

const saveData = function () {
  localStorage.setItem("data", listContainer.innerHTML);
};

const showTask = function(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
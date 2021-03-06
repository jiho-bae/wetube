import { Redshift } from "aws-sdk";
import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtn = document.getElementById("jsDelBtn");
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addFakeComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const smallSpan = document.createElement("span");
  span.innerHTML = comment;
  smallSpan.innerHTML = "Registered now";
  li.appendChild(span);
  li.appendChild(smallSpan);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(comment);
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addFakeComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  console.log(commentInput);
  if (commentInput.value === "") {
    commentInput.value = "";
  } else {
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
  }
};

const handleDelBtn = () => {};
function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}

if (delBtn) {
  delBtn.addEventListener("click", handleDelBtn);
}

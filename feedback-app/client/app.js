const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

const loadFeedbacks = async () => {
  const res = await fetch("http://localhost:5000/feedbacks");
  const feedbacks = await res.json();
  feedbackList.innerHTML = feedbacks
    .map(
      (f) => `
    <div class="feedback">
      <strong>${f.name}</strong> (Rating: ${f.rating})<br>
      ${f.message}
    </div>
  `
    )
    .join("");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const rating = document.getElementById("rating").value;

  await fetch("http://localhost:5000/feedbacks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message, rating }),
  });

  form.reset();
  loadFeedbacks();
});

loadFeedbacks();

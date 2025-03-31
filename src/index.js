// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: document.querySelector('#new-name')?.value || '',
      restaurant: document.querySelector('#new-restaurant')?.value || '',
      image: document.querySelector('#new-image')?.value || '',
      rating: document.querySelector('#new-rating')?.value || '',
      comment: document.querySelector('#new-comment')?.value || '',
    };

    const menu = document.querySelector('#ramen-menu');
    if (!menu) return;

    const img = document.createElement('img');
    img.src = newRamen.image;
    img.addEventListener('click', () => handleClick(newRamen));
    menu.appendChild(img);

    form.reset();
  });
};

const displayRamens = () => {
  console.log("displayRamens called"); // Check if the function is invoked

  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
      console.log("Fetched ramen data:", data); // Confirm data was received

      const menu = document.querySelector('#ramen-menu');
      if (!menu) return; // Prevent errors if the element is not found

      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen)); // Add click to show details
        menu.appendChild(img); // Add the image to the menu
      });
    })
    .catch(error => {
      console.error("Fetch error:", error); // Show fetch error in console
    });
};

const displayFirstRamen = () => {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        handleClick(data[0]);
      }
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
  displayFirstRamen();
};

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
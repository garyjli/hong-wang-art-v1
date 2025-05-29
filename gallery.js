// 3 columns on PC, 1 column on mobile.
// Calculated on page load, not dynamic.
let numColumns = window.matchMedia("(min-width: 769px)").matches ? 3 : 1;
const box = document.querySelector(".box");

// Array that will be used to contain references to the gallery's DOM elements.
// Any change to a DOM element in this array WILL BE REFLECTED in the actual HTML.
const columns = [];

// "columnHeights" is an array of size 3 or 1 (depending on the number of columns of the gallery).
// It keeps track of each column's pixel height at any instance in time as the gallery loads.
// This allows it to determine which column the next image should be loaded / placed in.
const columnHeights = new Array(numColumns).fill(0); // [0, 0, 0] or [0]

// Disables the right-click menu on the page
document.addEventListener("contextmenu", (event) => event.preventDefault());

// For each column, this writes (in gallery.html):
// 		<div class="dream">
//
// 		</div>
// And also appends it to the "columns" array as a reference.
// Modifying "col" in "columns" will reflect in the actual HTML.
for (let i = 0; i < numColumns; i++) {
	const col = document.createElement("div");
	col.classList.add("dream");
	columns.push(col);
	box.appendChild(col);
}

// Used by the function below, loadNextImage()
let currentIndex = 0;

// Recursive function that takes an array of artwork objects, 
// and loads each image sequentially in the gallery.
function loadNextImage(artworks) {
	// Base case (unconventional)
	if (currentIndex >= artworks.length) return;

	const artwork = artworks[currentIndex];
	const title = artwork.title;
	const price = artwork.price;
	const dimensions = artwork.dimensions;
	const type = artwork.type;
	const date = artwork.date;
	const url = artwork.url;

	// For each image, we create: <div class="images-div"> </div>
	// This div element will be used to contain img and hover-text
	const imagesDiv = document.createElement("div");
	imagesDiv.classList.add("images-div");

	const img = document.createElement("img");
	img.style.objectFit = "contain";
	img.onclick = () => openModal(`${url}`);
	imagesDiv.appendChild(img);

	// At this point we have:
	// <div class="images-div">
	// 		<img style="object-fit: contain">
	// </div>
	// And the "onclick" handler is solely in JS and not the HTML.

	// Append imagesDiv to the shortest column
	const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
	// This appends each image to the "dream" div, as shown in the HTML.
	columns[minIndex].appendChild(imagesDiv);

	// This creates the text that appears on PC when you 
	// hover your mouse over an image in the gallery.
	const textOverlay = document.createElement("div");
	textOverlay.classList.add("hover-text");
	textOverlay.innerHTML = `Title: ${title}<br> Price: $${price.toFixed(2)}`;
	imagesDiv.appendChild(textOverlay);

	// At this point we have:
	// <div class="images-div">
	// 		<img style="object-fit: contain">
	// 		<div class="hover-text">Title: (title)<br> Price: (price)</div>
	// </div>

	// ----------------------------------------------------------------------------

	// imagesDiv.addEventListener("touchstart", () => {
	// 	img.style.filter = "brightness(50%)";
	// 	textOverlay.style.opacity = "1";
	// });

	// imagesDiv.addEventListener("touchend", () => {
	// 	img.style.filter = "brightness(100%)";
	// 	textOverlay.style.opacity = "0";
	// });

	// ----------------------------------------------------------------------------

	// This creates the text that appears on mobile underneath each gallery image.
	const artworkInfo = document.createElement("div");
	artworkInfo.classList.add("artwork-info");
	artworkInfo.innerHTML = `<strong>Title: ${title}</strong>
							 <br>
							 <strong>Price: $${price.toFixed(2)}</strong>
							 <br>
							 ${dimensions}, ${type}, ${date}`;
	imagesDiv.appendChild(artworkInfo);

	// At this point we have:
	// <div class="images-div">
	// 		<img data-src="images/xxx.jpeg" style="object-fit: contain">
	// 		<div class="hover-text">Title: ?<br> Price: ?</div>
	// 		<div class="artwork-info">(the innerHTML stuff above)</div>
	// </div>

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Load image when it enters viewport
					const image = entry.target;
					image.src = `${url}`;
					image.onload = () => {
						// // Add animation after image is loaded
						// image.classList.add("fade-in");

						// Get height of image and update column heights
						requestAnimationFrame(() => {
							const renderedHeight = image.offsetHeight;
							columnHeights[minIndex] += renderedHeight;
							console.log(`Image: ${url}, Height: ${renderedHeight}px`);
							currentIndex++;
							setTimeout(() => loadNextImage(artworks), 20);
						});
					};

					// Stop observing after loading image
					observer.unobserve(image);
				}
			});
		},
		{
			rootMargin: "100px",
		}
	);

	// Start observing image
	observer.observe(img);
}

async function parseArtworks() {
	const res = await fetch("artworks.json");
	const data = await res.json();

	loadNextImage(data.artworks);
}

// START
parseArtworks();

function openModal(imgSrc) {
	const modal = document.querySelector(".modal");
	const modalImage = document.getElementById("modalImage");
	
	// modal.classList.remove("closing");
	modal.style.display = "block";
	modalImage.src = imgSrc;
}

function closeModal() {
	const modal = document.querySelector(".modal");
	const modalImage = document.getElementById("modalImage");

	modal.classList.add("closing");
	
	setTimeout(() => {
		modal.classList.remove("closing");
		modal.style.display = "none";
	}, 250); // Needs to be slightly faster than the modalClose animation time
}

const box = document.querySelector(".box");
// 3 columns for computer, 2 columns for mobile
let numColumns = window.matchMedia("(min-width: 769px)").matches ? 3 : 2;
const columns = [];
const columnHeights = new Array(numColumns).fill(0);
let currentIndex = 0;

// array of strings which represents the images' filenames
const imgFilenames = [];
for (let i = 1; i <= 43; i++) {
	imgFilenames.push(`a${i}.jpeg`);
}
for (let i = 1; i <= 41; i++) {
	imgFilenames.push(`b${i}.jpeg`);
}

// write the HTML to make columns
for (let i = 0; i < numColumns; i++) {
	const col = document.createElement("div");
	col.classList.add("dream");
	columns.push(col);
	box.appendChild(col);
}

// recursive function that loads each image sequentially in the gallery
function loadNextImage() {
	// base case
	if (currentIndex >= imgFilenames.length) return;

	const imgName = imgFilenames[currentIndex];

	// images-div contains the img and hover-text
	const imagesDiv = document.createElement("div");
	imagesDiv.classList.add("images-div");

	const img = document.createElement("img");
	// data-src to store the image URL until it needs to be loaded
	img.setAttribute("data-src", `images/${imgName}`);
	img.style.objectFit = "contain";
	img.onclick = () => openModal(`images/${imgName}`);

	imagesDiv.appendChild(img);

	// add imagesDiv to shortest column
	const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
	columns[minIndex].appendChild(imagesDiv);

	// create hover-text
	const textOverlay = document.createElement("div");
	textOverlay.classList.add("hover-text");
	textOverlay.textContent = `Image ${currentIndex + 1}`;

	imagesDiv.appendChild(textOverlay);

	imagesDiv.addEventListener("touchstart", () => {
		img.style.filter = "brightness(50%)";
		textOverlay.style.opacity = "1";
	});

	imagesDiv.addEventListener("touchend", () => {
		img.style.filter = "brightness(100%)";
		textOverlay.style.opacity = "0";
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// load image when it enters viewport
					const image = entry.target;
					image.src = image.getAttribute("data-src");
					image.onload = () => {
						// add animation after image is loaded
						image.classList.add("fade-in");

						// get height of image and update column heights
						requestAnimationFrame(() => {
							const renderedHeight = image.offsetHeight;
							columnHeights[minIndex] += renderedHeight;
							console.log(`Image: ${imgName}, Height: ${renderedHeight}px`);
							currentIndex++;
							setTimeout(loadNextImage, 20);
						});
					};

					// stop observing after loading image
					observer.unobserve(image);
				}
			});
		},
		{
			rootMargin: "100px",
		}
	);

	// start observing image
	observer.observe(img);
}

loadNextImage();

function openModal(imgSrc) {
	const modal = document.getElementById("imageModal");
	const modalImage = document.getElementById("modalImage");

	modal.style.display = "block";
	modalImage.src = imgSrc;
}

function closeModal() {
	const modal = document.getElementById("imageModal");
	modal.style.display = "none";
}

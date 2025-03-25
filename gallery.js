const imgFilenames = [];
for (let i = 1; i <= 86; i++) {
	imgFilenames.push(`a${i}.jpeg`);
}

const box = document.querySelector(".box");
const columns = [];
const columnHeights = [0, 0, 0]; // running height per column

// make 3 columns
for (let i = 0; i < 3; i++) {
	const col = document.createElement("div");
	col.classList.add("dream");
	columns.push(col);
	box.appendChild(col);
}

// used to load images sequentially
let currentIndex = 0;

function loadNextImage() {
	// base case
	if (currentIndex >= imgFilenames.length) return;

	const imgName = imgFilenames[currentIndex];
	// create the images-div wrapper
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
	textOverlay.textContent = `Image ${currentIndex + 1}`; // Customize as needed

	imagesDiv.appendChild(textOverlay);

	imagesDiv.addEventListener("touchstart", () => {
		img.style.filter = "brightness(50%)";
		textOverlay.style.opacity = "1";
	});

	imagesDiv.addEventListener("touchend", () => {
		img.style.filter = "";
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

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
	const img = document.createElement("img");

	// data-src to store the image URL until it needs to be loaded
	img.setAttribute("data-src", `images/${imgName}`);
	img.style.objectFit = "contain";
	img.onclick = () => openModal(`images/${imgName}`);

	// add image to shortest column without loading it yet
	const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
	columns[minIndex].appendChild(img);

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

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
	if (currentIndex >= imgFilenames.length) return;

	const imgName = imgFilenames[currentIndex];
	const img = document.createElement("img");
	img.src = `images/${imgName}`;
	img.style.objectFit = "contain";
	img.onclick = () => openModal(`images/${imgName}`);

	img.onload = () => {
		// find shortest column
		const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
		columns[minIndex].appendChild(img);

		// measure after render
		requestAnimationFrame(() => {
			const renderedHeight = img.offsetHeight;
			columnHeights[minIndex] += renderedHeight;
			console.log(`Image: ${imgName}, Height: ${renderedHeight}px`);

			currentIndex++;
			loadNextImage();
		});
	};
}

loadNextImage();
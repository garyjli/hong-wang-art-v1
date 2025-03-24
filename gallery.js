// const imgFilenames = [];
// for (let i = 1; i <= 86; i++) {
// 	imgFilenames.push(`a${i}.jpeg`);
// }

// function createGallery(imgFilenames) {
// 	const box = document.querySelector(".box");
//     const filenames = Array.from({ length: 3 }, () => []);
//     let height1 = 0, height2 = 0, height3 = 0;

// 	imgFilenames.forEach((img, idx) => {
//         const columnNum = idx % 3;
        
//         const imgElement = new Image();
//         imgElement.src = `images/${img}`;
    
//         imgElement.onload = () => {
//             const imgHeight = imgElement.height;
//             console.log(`Image: ${img}, Height: ${imgHeight}px`);
//         }

// 		filenames[columnNum].push(img);
// 	});

// 	filenames.forEach((column) => {
// 		const columnDiv = document.createElement("div");
// 		columnDiv.classList.add("dream");

// 		column.forEach((image) => {
// 			const img = document.createElement("img");
//             img.src = `images/${image}`;
//             img.loading = "lazy";
// 			img.onclick = () => openModal(`images/${image}`);
// 			columnDiv.appendChild(img);
// 		});

// 		box.appendChild(columnDiv);
// 	});
// }

// createGallery(imgFilenames);

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

// load images one by one
imgFilenames.forEach((imgName) => {
	const img = document.createElement("img");
	img.src = `images/${imgName}`;
	// img.loading = "lazy";
	img.style.objectFit = "contain";
	img.onclick = () => openModal(`images/${imgName}`);

	// wait until image loads and renders
	img.onload = () => {
		// temporarily append to shortest column to get rendered height
		const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
		columns[minIndex].appendChild(img);

		// after render, get the new height of this image
		const renderedHeight = img.offsetHeight;
		columnHeights[minIndex] += renderedHeight;
	};
});

// randomness is due to image loading at different times
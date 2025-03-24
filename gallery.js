const imgFilenames = [];
for (let i = 1; i <= 86; i++) {
	imgFilenames.push(`a${i}.jpeg`);
}

function createGallery(imgFilenames) {
	const box = document.querySelector(".box");
	const filenames = Array.from({ length: 3 }, () => []);

	imgFilenames.forEach((img, idx) => {
		const columnNum = idx % 3;
		filenames[columnNum].push(img);
	});

	filenames.forEach((column) => {
		const columnDiv = document.createElement("div");
		columnDiv.classList.add("dream");

		column.forEach((image) => {
			const img = document.createElement("img");
            img.src = `images/${image}`;
            img.loading = "lazy";
			img.onclick = () => openModal(`images/${image}`);
			columnDiv.appendChild(img);
		});

		box.appendChild(columnDiv);
	});
}

createGallery(imgFilenames);
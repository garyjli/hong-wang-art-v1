const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const titles = [
	'"  "',
	'" Journey of Courage "',
	'"  "',
	'"  "',
	'"  "',
	'"  "',
	'" Whispers of Change "',
	'"  "',
	'"  "',
];

let isScrolling = false; // flag to check if scrolling is happening
let timeout; // for debouncing

// calculate the image width dynamically
const getImageWidth = () => {
	const firstImage = images[0];
	return firstImage ? firstImage.clientWidth : 0;
};

slider.addEventListener("scroll", () => {
	if (!isScrolling) {
		isScrolling = true;
		// debounce: only update once the user stops scrolling
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const scrollPosition = slider.scrollLeft;
			const imageWidth = getImageWidth(); // get the image width dynamically

			const currentIndex = Math.round(scrollPosition / imageWidth);

			const currentImage = images[currentIndex];
			const currentImageId = currentImage ? currentImage.id : null;

			if (currentImageId) {
				document.getElementById("title").innerHTML = titles[currentImageId];
				console.log(`${currentImageId}`); // debugging
			}

			isScrolling = false; // reset flag
		}, 200); // wait after scroll to update
	}
});

window.addEventListener("resize", () => {
	console.log("Window resized, imageWidth recalculated");
});

const autoScroll = () => {
	const imageWidth = images[0].clientWidth; // get the width of an image
	const currScrollPosition = slider.scrollLeft; // get current scroll position
	const totalWidth = imageWidth * images.length;

	if (currScrollPosition >= totalWidth - imageWidth - 1) {
		slider.scrollTo({
			left: 0,
			behavior: "smooth",
		});
	} else {
		const nextScrollPosition = currScrollPosition + imageWidth;
		slider.scrollTo({
			left: nextScrollPosition,
			behavior: "smooth",
		});
	}
};

setInterval(autoScroll, 2500);

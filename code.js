// const slider = document.querySelector('.slider');
// const images = document.querySelectorAll('.slider img');
// const imageWidth = images[0].clientWidth; // Get the width of the first image

// slider.addEventListener('scroll', () => {
//     // Calculate the current image index based on the scroll position
//     const scrollPosition = slider.scrollLeft;
//     const currentIndex = Math.round(scrollPosition / imageWidth);

//     const currentImage = images[currentIndex];
//     const currentImageId = currentImage ? currentImage.id : null;

//     if (currentImageId) {
//         console.log(`Current image in view: ${currentImageId}`);
//         // You can use the currentImageId here to perform other actions
//     }
// });

// const slider = document.querySelector('.slider');
// const images = document.querySelectorAll('.slider img');
// const imageWidth = images[0].clientWidth; // all .slider img's have the same width
// const titles = [
//     "\" A Fishing House \"", 
//     "\" After Raining... \"", 
//     "\" Echoes of Bliss \"", 
//     "\" Ginger Pot \"",
//     "\" Journey of Courage \"",
//     "\" Paddling in Reflection \"",
//     "\" Spring Field \"",
//     "\" Whispers of Change \"",
//     "\" 向阳 \""
// ]

// let isScrolling = false; // flag to check if scrolling is happening

// slider.addEventListener('scroll', () => {
//     if (!isScrolling) {
//         isScrolling = true;
//         requestAnimationFrame(() => {
//             const scrollPosition = slider.scrollLeft;
//             const currentIndex = Math.round(scrollPosition / imageWidth);

//             const currentImage = images[currentIndex];
//             const currentImageId = currentImage ? currentImage.id : null;

//             if (currentImageId) {
//                 document.getElementById("title").innerHTML = titles[currentImageId];
//             }

//             isScrolling = false; // reset flag
//         });
//     }
// });

// const slider = document.querySelector('.slider');
// const images = document.querySelectorAll('.slider img');
// const imageWidth = images[0].clientWidth; // all .slider img's have the same width
// const titles = [
//     "\" A Fishing House \"", 
//     "\" After Raining... \"", 
//     "\" Echoes of Bliss \"", 
//     "\" Ginger Pot \"",
//     "\" Journey of Courage \"",
//     "\" Paddling in Reflection \"",
//     "\" Spring Field \"",
//     "\" Whispers of Change \"",
//     "\" 向阳 \""
// ];

// let isScrolling = false; // flag to check if scrolling is happening
// let timeout; // for debouncing

// slider.addEventListener('scroll', () => {
//     if (!isScrolling) {
//         isScrolling = true;
//         // debounce: only update once the user stops scrolling
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             const scrollPosition = slider.scrollLeft;
//             const currentIndex = Math.round(scrollPosition / imageWidth);

//             const currentImage = images[currentIndex];
//             const currentImageId = currentImage ? currentImage.id : null;

//             if (currentImageId) {
//                 document.getElementById("title").innerHTML = titles[currentImageId];
//                 console.log(`${currentImageId}`)
//             }

//             isScrolling = false; // reset flag
//         }, 500); // wait after scroll stops before updating
//     }
// });

const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');
const titles = [
    "\" A Fishing House \"", 
    "\" After Raining... \"", 
    "\" Echoes of Bliss \"", 
    "\" Ginger Pot \"",
    "\" Journey of Courage \"",
    "\" Paddling in Reflection \"",
    "\" Spring Field \"",
    "\" Whispers of Change \"",
    "\" 向阳 \""
];

let isScrolling = false; // flag to check if scrolling is happening
let timeout; // for debouncing

// calculate the image width dynamically
const getImageWidth = () => {
    const firstImage = images[0];
    return firstImage ? firstImage.clientWidth : 0;
};

slider.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        // debounce: only update once the user stops scrolling
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const scrollPosition = slider.scrollLeft;
            const imageWidth = getImageWidth();  // get the image width dynamically

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

window.addEventListener('resize', () => {
    console.log('Window resized, imageWidth recalculated');
});

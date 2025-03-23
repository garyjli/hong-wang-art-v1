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

// -------------------------------------------------------------

let autoscrollPaused = false;  // track if autoscroll is paused
let timeoutID;  // variable to store timeout ID

const autoScroll = () => {
    const imageWidth = images[0].clientWidth;  // get the width of an image
    const currScrollPosition = slider.scrollLeft; // get current scroll position
    const totalWidth = imageWidth * images.length;

    if (currScrollPosition >= totalWidth - imageWidth - 1) {
        slider.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        const nextScrollPosition = currScrollPosition + imageWidth;
        slider.scrollTo({
            left: nextScrollPosition,
            behavior: 'smooth'
        });
    }
};

let intervalID = setInterval(autoScroll, 2500);

function toggleAutoScroll() {
    if (autoscrollPaused) {
        intervalID = setInterval(autoScroll, 2500); // resume autoscroll
        document.getElementById('autoscrollStatus').innerText = "▶";
    } else {
        clearInterval(intervalID); // pause autoscroll
        document.getElementById('autoscrollStatus').innerText = "⏸";
    }
    
    // clear previous timeout if it exists
    if (timeoutID) {
        clearTimeout(timeoutID);
    }

    // show pop up with fade-in effect
    const statusMessage = document.getElementById('autoscrollStatus');
    statusMessage.classList.add('show');
    
    // hide popup after 1 sec
    timeoutID = setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 500);

    autoscrollPaused = !autoscrollPaused;
}

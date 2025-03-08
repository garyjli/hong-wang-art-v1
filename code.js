"use strict";

const artworks = [
	{ filename: "a1.jpeg", name: "\"A Fishing House\"" },
	{ filename: "a2.jpeg", name: "\"After Raining...\"" },
	{ filename: "a3.jpeg", name: "\"Echoes of Bliss\"" },
	{ filename: "a4.jpeg", name: "\"Ginger Pot\"" },
	{ filename: "a5.jpeg", name: "\"Journey of Courage\"" },
	{ filename: "a6.jpeg", name: "\"Paddling in Reflection\"" },
	{ filename: "a7.jpeg", name: "\"Spring Field\"" },
	{ filename: "a8.jpeg", name: "\"Whispers of Change\"" },
	{ filename: "a9.jpeg", name: "\"向阳\"" },
];
const curr = document.getElementById("imageProperties");
let idx = 0;

function main() {
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const image = document.getElementById("imageProperties");

    left.onclick = displayPrev;
    right.onclick = displayNext;
    image.onclick = displayNext;
}

function displayNext() {
    if (idx == artworks.length - 1) {
        idx = 0;
    } else {
        idx++;
    }

    curr.setAttribute("src", "artwork/" + artworks[idx].filename);
    document.getElementById("artworkName").textContent = artworks[idx].name;
}

function displayPrev() {
    if (idx == 0) {
        idx = artworks.length - 1;
    } else {
        idx--;
    }

    curr.setAttribute("src", "artwork/" + artworks[idx].filename);
    document.getElementById("artworkName").textContent = artworks[idx].name;
}

window.onload = main;
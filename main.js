// create a dom element that has the type colorpicker
// get the value of the colorpicker
// pass the value to the GradientColor class
// display the gradient color in the background of the page
import GradientColor from "./GradientColor/GradientColor";

const container = document.getElementById('app');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const options = document.getElementById('colors');
const downloadButton = document.querySelector('.download');

// window.addEventListener('change', () =>{
//   console.log(options.value);
// }
// )

const gradientColor = new GradientColor(container, color1, color2, options, downloadButton);
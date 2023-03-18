export default class GradientColor {
    constructor(container, color1, color2, options, downloadButton) {
      this.container = container;
      this.color1 = color1;
      this.color2 = color2;
      this.option = options;
      this.selected = null;
      this.downloadButton = downloadButton;
  
      this.init();
    }
  
    init() {
      this.loadColors();
      this.setColors();
      this.setOption();
      this.addDownloadListener();
    }
  
    addDownloadListener() {
      this.downloadButton.addEventListener("click", () => {
        // create a canvas element and set its dimensions to match the container
        const canvas = document.createElement("canvas");
        canvas.width = 1920;
        canvas.height = 1080;
    
        // get the 2D context of the canvas
        const context = canvas.getContext("2d");
    
        // get the direction from localStorage
        const direction = localStorage.getItem("option") || "to right";
    
        // create the gradient with the specified direction and draw it on the canvas
        const gradient = context.createLinearGradient(
          ...this.getGradientDirection(direction)
        );
        gradient.addColorStop(0, this.color1.value);
        gradient.addColorStop(1, this.color2.value);
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        // create a new <a> element with the download link and trigger a click event on it to initiate the download
        const downloadLink = document.createElement("a");
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.download = "gradient.png";
        downloadLink.click();
      });
    }
    
    getGradientDirection(direction) {
      switch (direction) {
        case "to left":
          return [1920, 0, 0, 0];
        case "to right":
          return [0, 0, 1920, 0];
        case "to top":
          return [0, 1080, 0, 0];
        case "to bottom":
          return [0, 0, 0, 1080];
        case "to left top":
          return [1920, 1080, 0, 0];
        case "to right top":
          return [0, 1080, 1920, 0];
        case "to left bottom":
          return [1920, 0, 0, 1080];
        case "to right bottom":
          return [
            0,
            0,
            this.container.clientWidth,
            this.container.clientHeight,
          ];
        default:
          return [0, 0, this.container.clientWidth, 0];
      }
    }
    
      
    loadColors() {
      this.color1.value = localStorage.getItem('color1');
      this.color2.value = localStorage.getItem('color2');
      this.container.style.background = `linear-gradient(${localStorage.getItem('option')}, ${localStorage.getItem('color1')}, ${localStorage.getItem('color2')})`;
    }
  
    setColors() {
      window.addEventListener('change', () => {
        localStorage.setItem('color1', this.color1.value);
        localStorage.setItem('color2', this.color2.value);
        this.container.style.background = `linear-gradient(${localStorage.getItem('option')}, ${localStorage.getItem('color1')}, ${localStorage.getItem('color2')})`;
      });
    }
  
    setOption() {
      window.addEventListener('change', () => {
        localStorage.setItem('option', this.option.value);
        this.container.style.background = `linear-gradient(${localStorage.getItem('option')}, ${localStorage.getItem('color1')}, ${localStorage.getItem('color2')})`;
      });
    }
  }
  
import React from "react";
import styles from "./NavGuess.module.css";

class NavGuess extends React.Component {
  state = {width: 0, xOffset: 0, yOffset: 0};

  SPEED_LINES = [];
  SPEED_LINES_LENGTH = 300;
  IMG_SIZE = 150;
  RUN_ANIMATION = false;

  canvasRef = React.createRef();

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.initGuessCanvas();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.hasWon === null && this.props.pokeGuess === null && this.RUN_ANIMATION) {
      this.RUN_ANIMATION = false;
      this.setState({xOffset: 0, yOffset: 0});
      this.initGuessCanvas();
    }
    if(prevState.width !== this.state.width) {
      const canvas = this.canvasRef.current;
      let oldWidth = canvas.width;
      let oldHeight = canvas.height;
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.parentNode.offsetHeight;
      this.setState((state) => {
        return {
          xOffset: state.xOffset + ((canvas.width - oldWidth) / 2),
          yOffset: state.yOffset + ((canvas.height - oldHeight) /2)
        }
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.RUN_ANIMATION = false;
  }
  handleResize = (e) => {
    this.setState({
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    });
  }
  handleLoadedImage = (img, loaded, canvas, originalCanvas, ctx) => {
    if(loaded) {
      if(!this.canvasRef.current) {
        return;
      }
      for(let i = 0; i < this.SPEED_LINES_LENGTH; i++) {
        this.SPEED_LINES[i] = this.speedLine(canvas.width, canvas.height);
      }
      this.RUN_ANIMATION = true;
      this.canvasDraw(img, originalCanvas);
      return;
    }
    img.width = this.IMG_SIZE;
    img.height = this.IMG_SIZE;
    ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2, img.width, img.height);

    originalCanvas = document.createElement("canvas");
    originalCanvas.width = canvas.width;
    originalCanvas.height = canvas.height;
    let origCtx = originalCanvas.getContext("2d");
    origCtx.drawImage(canvas, 0, 0);

    let imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    let data = imgData.data;
    for(let i = 0; i < data.length; i+=4) {
      data[i] = 0;
      data[i+1] = 0;
      data[i+2] = 0;
      data[i+3] = data[i+3];
    }
    ctx.putImageData(imgData, 0, 0);
    img.src = canvas.toDataURL();
    return {img: img, origCanvas: originalCanvas};
  }
  initGuessCanvas = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = this.canvasRef.current.getContext("2d");
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.parentNode.offsetHeight;

    let originalCanvas = null;
    let randomPokeId = Math.floor(Math.random() * this.props.pokeList.length) + 1;
    this.props.setPokeGuess(this.props.pokeList[randomPokeId - 1].name);
    let img = new Image();
    let loaded = false;

    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokeId}.png`
    img.crossOrigin = "anonymous";

    let newImg = null;
    if(img.complete) {
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokeId}.png?` + new Date().getTime();
    }
    img.onload = (e) => {
      if(loaded) {
        this.handleLoadedImage(newImg.img, loaded, canvas, newImg.origCanvas, ctx);
        return;
      }
      newImg = this.handleLoadedImage(img, loaded, canvas, originalCanvas, ctx);
      loaded = true;
    }
  }
  getRandomNum = (min,max) => {
    return (Math.random() * (max - min)) + min;
  }
  speedLine = (width, height) => {
    return {
      x: width / 2,
      y: height / 2,
      speed: this.getRandomNum(2,4),
      size: this.getRandomNum(15, 25),
      angle: Math.PI * this.getRandomNum(0, 2),
      offset: this.getRandomNum(0, 100),
      edge: width,
      age: this.getRandomNum(400,700),
      alpha: this.getRandomNum(0.3, 1)
    };
  }
  updateCanvas = () => {
    const canvas = this.canvasRef.current;

    this.SPEED_LINES.forEach((line, i) => {
      if(line.age <= 0) {
        this.SPEED_LINES[i] = this.speedLine(canvas.width, canvas.height);
      }
      let speedLine = this.SPEED_LINES[i];
      speedLine.age -= speedLine.speed;
      speedLine.alpha *= (speedLine.age / 700);
      speedLine.size *= (speedLine.age / 700);

      this.renderCanvas(speedLine);
    });
  }
  renderCanvas = (speedLine) => {
    const ctx = this.canvasRef.current.getContext("2d");

    ctx.save();
    ctx.translate(speedLine.x, speedLine.y);
    ctx.rotate(speedLine.angle);
    
    ctx.beginPath();
    ctx.moveTo(0, speedLine.offset);
    ctx.lineTo(speedLine.size, speedLine.edge);
    ctx.lineTo(-speedLine.size, speedLine.edge);
    ctx.closePath();

    ctx.fillStyle = `rgba(255,255,255, ${speedLine.alpha})`;
    ctx.fill();
    ctx.restore();
  }
  canvasDraw = (img, orig) => {
    if(!this.RUN_ANIMATION) {
      return;
    }
    const canvas = this.canvasRef.current;
    const ctx = this.canvasRef.current.getContext("2d");
    
    requestAnimationFrame(() => this.canvasDraw(img, orig));
    ctx.clearRect(0,0,canvas.width,canvas.height);
    this.updateCanvas();
    if(this.props.hasWon !== null) {
      ctx.drawImage(orig, this.state.xOffset, this.state.yOffset);
    }
    else {
      ctx.drawImage(img, this.state.xOffset, this.state.yOffset);
    }
  }

  render() {
    return(
      <div className={styles.guess__container}>
        <div className={styles.guess__header__container}>
          <h2 className={styles.guess__header}>GUESS THAT</h2>
        </div>
        <div className={styles.guess__image__container}>
          <canvas className={styles.guess__image__canvas} ref={this.canvasRef}></canvas>
        </div>
        <div className={styles.guess__header__container}>
          <h2 className={styles.guess__header}>POKEMON!</h2>
        </div>
      </div>
    )
  }
}

export default NavGuess;
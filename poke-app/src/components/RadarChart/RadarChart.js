import React from "react";
import styles from "./RadarChart.module.css";
import Chart from "chart.js";
let currentChart;

class RadarChart extends React.PureComponent {
  state = {width: 0};
  hasAspectRatio = Chart.defaults.global.maintainAspectRatio;
  chartRef = React.createRef();

  componentDidMount() {
    if((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 700) {
      Chart.defaults.global.maintainAspectRatio = false;
      this.hasAspectRatio = Chart.defaults.global.maintainAspectRatio;
    }
    this.initChart();
    this.setState({width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth});
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.width !== this.state.width && this.state.width <= 700 && this.hasAspectRatio) {
      Chart.defaults.global.maintainAspectRatio = false;
      this.hasAspectRatio = Chart.defaults.global.maintainAspectRatio;
    }
    if(prevState.width !== this.state.width && this.state.width > 700 && !this.hasAspectRatio) {
      Chart.defaults.global.maintainAspectRatio = true;
      this.hasAspectRatio = Chart.defaults.global.maintainAspectRatio;
    }
    this.initChart();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = (e) => {
    if(
      (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) >= 700 &&
      !this.hasAspectRatio
      ) {
      this.setState({width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth});
      return;
    }
    if(
      (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 700 &&
      this.hasAspectRatio
      ) {
      this.setState({width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth});
    }
  }
  initChart = () => {
    const chart = this.chartRef.current.getContext("2d");
    let barColors = ["rgba(244, 67, 54, 0.1)", "rgba(183, 28, 28, 0.1)", "rgba(13, 71, 161, 0.1)", "rgba(49, 27, 146, 0.1)", "rgba(1, 87, 155, 0.1)", "rgba(136, 14, 79, 0.1)"];
    let hoverBarColors = ["rgba(244, 67, 54, 0.4)", "rgba(183, 28, 28, 0.4)", "rgba(13, 71, 161, 0.4)", "rgba(49, 27, 146, 0.4)", "rgba(1, 87, 155, 0.4)", "rgba(136, 14, 79, 0.4)"];

    if(typeof currentChart !== "undefined") {
      currentChart.destroy();
    }
    let chartData = null;
    let chartOptions = null;
    if(this.props.chartType === "radar") {
      chartData = {
        labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. Atk"],
        datasets: [{
          label: this.nameCapitalized(this.props.pokemonStats.name),
          backgroundColor: "rgb(54, 162, 235, 0.1)",
          borderColor: "#36a2eb",
          pointBackgroundColor: "#36a2eb",
          pointBorderColor: "#36a2eb",
          pointBorderWidth: 2,
          // pointHoverRadius: 4,
          pointHitRadius: 5,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: "#36a2eb",
          lineTension: 0.1,
          data: this.filterStats(this.props.pokemonStats.stats),
        }]
      };
      chartOptions = {
        legend: {
          // onHover: {
          //   ////CHANGE OPACITY TO FULL
          // },
          labels: {
            fontFamily: "Oxanium",
            fontSize: 14
          }
        },
        scale: {
          angleLines: {
            color: "rgba(0,0,0,0.2)"
          },
          gridLines: {
            color: "rgba(0,0,0,0.2)"
          },
          pointLabels: {
            fontColor: ["#F44336", "#B71C1C", "#0D47A1", "#311B92", "#01579B", "#880E4F"],
            fontSize: 14,
            fontStyle: "bold",
            fontFamily: "Oxanium"
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 20,
            fontFamily: "Oxanium"
          }
        },
        tooltips: {
          titleFontFamily: "Oxanium", ////CHANGE
          titleFontSize: 14,
          titleFontStyle: "normal",
          bodyFontFamily: "Oxanium",
          callbacks: {
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
          }
          // displayColors: false
        },
      };
    }
    if(this.props.chartType === "horizontalBar") {
      chartData = {
        labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. Atk"],
        datasets: [{
          label: this.nameCapitalized(this.props.pokemonStats.name),
          backgroundColor: barColors,
          borderColor: ["#F44336", "#B71C1C", "#0D47A1", "#311B92", "#01579B", "#880E4F"],
          data: this.filterStats(this.props.pokemonStats.stats),
          borderWidth: 1,
          hoverBackgroundColor: hoverBarColors
        }]
      };
      chartOptions = {
        hover: {
          animationDuration: 0
        },
        legend: {
          labels: {
            fontFamily: "Oxanium",
            fontSize: 14,
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 120,
              fontFamily: "Oxanium"
            }
          }],
          yAxes: [{
            ticks: {
              fontFamily: "Oxanium",
            }
          }]
        },
        tooltips: {
          titleFontFamily: "Oxanium", ////CHANGE
          titleFontSize: 14,
          titleFontStyle: "normal",
          bodyFontFamily: "Oxanium",
          callbacks: {
            title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
          }
        },
      };
    }
    currentChart = new Chart(chart, {
      type: this.props.chartType,
      data: chartData, 
      options: chartOptions
    });
  }
  nameCapitalized = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  filterStats = (stats) => {
    let temp = [null, null, null, null, null, null];
    for(let i = 0; i < temp.length; i++) {
      switch(stats[i].stat.name) {
        case "hp":
          temp[0] = stats[i].base_stat;
          break;
        case "attack":
          temp[1] = stats[i].base_stat;
          break;
        case "defense":
          temp[2] = stats[i].base_stat;
          break;
        case "speed":
          temp[3] = stats[i].base_stat;
          break;
        case "special-defense":
          temp[4] = stats[i].base_stat;
          break;
        case "special-attack":
          temp[5] = stats[i].base_stat;
          break;
        default:
          temp[i] = null;
      }
    }
    return temp;
  }
  render() {
    return(
      <div className={styles.chartContainer}>
        <h2 className={styles.stats__header__heading}>Stats</h2>
        <canvas ref={this.chartRef}></canvas>
      </div>
    );
  }
}

export default RadarChart;
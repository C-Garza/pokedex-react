import React from "react";
import styles from "./RadarChart.module.css";
import Chart from "chart.js";
let radarChart;

class RadarChart extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.initChart();
  }
  componentDidUpdate() {
    this.initChart();
  }
  initChart = () => {
    const chart = this.chartRef.current.getContext("2d");
    console.log("I RAN");

    if(typeof radarChart !== "undefined") {
      radarChart.destroy();
    }

    radarChart = new Chart(chart, {
      type: "radar",
      data: {
        labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. Atk"],
        datasets: [{
          label: this.nameCapitalized(this.props.pokemonStats.name),
          backgroundColor: "rgb(54, 162, 235, 0.1)",
          borderColor: "#36a2eb",
          pointBackgroundColor: "#36a2eb",
          pointBorderColor: "#36a2eb",
          pointBorderWidth: 2,
          // pointHoverRadius: 4,
          pointHitRadius: 3,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: "#36a2eb",
          lineTension: 0.1,
          data: this.filterStats(this.props.pokemonStats.stats)
        }]
      },
      options: {
        hover: {
          // animationDuration: 0
        },
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
          bodyFontFamily: "Oxanium"
          // displayColors: false
        }
      }
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
        <canvas ref={this.chartRef}></canvas>
      </div>
    );
  }
}

export default RadarChart;
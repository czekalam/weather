import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import '../style/Graph.css';

class Graph extends React.Component {
    chart = null;
    componentDidMount() {
      this.configureChart();
    }
    configureChart = () => {
      const chartCanvas = ReactDOM.findDOMNode(this.chart);
      var days =this.props.days.map((day)=>new Date(day.dt_txt));
      var temp = this.props.days.map((day=>Math.round(day.main.temp-273.15)));
      var rain = this.props.days.map(day=>day.rain?day.rain['3h']:'');
      // const mixedChart = 
      new Chart(chartCanvas, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Rain",
              yAxisID: 'Rain',
              data: rain,
              type: "bar",
              backgroundColor: "#ff4"
            },
            {
              label: "Temperature",
              yAxisID: 'Temperature',
              data: temp,
              type: "line",
              backgroundColor: "#9f9",
              pointBackgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(0, 0, 0, 0)"
            }
          ],
          labels: days
        },
        options: {
          legend: {
            display: true,
            position: "bottom"
          },
          scales: {
            yAxes: [
              {
                id: 'Temperature',
                display: true,
                ticks: {
                  beginAtZero: true
                }
              },
              {
                id: 'Rain',
                display: true,
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            ]
          }
        }
      });
    };
  
    render() {
      return (
        <div className='graph' style={{width:500+'px'}}>
          <canvas 
            ref={chart => {
              this.chart = chart;
            }}
          />
        </div>
      );
    }
  }
export default Graph;
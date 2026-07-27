import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend
} from "chart.js";


Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend
);


let cpuChart: Chart | null = null;


export function renderCPUChart(values: number[]) {

  const canvas =
    document.getElementById("cpuChart") as HTMLCanvasElement;


  if (!canvas) return;


  if (cpuChart) {

    cpuChart.destroy();

  }


  cpuChart = new Chart(canvas, {

    type: "bar",

    data: {

      labels: values.map(
        (_, i) => `Server ${i + 1}`
      ),

      datasets: [

        {

          label: "CPU Utilization (%)",

          data: values,

          backgroundColor: "#38bdf8",

          borderColor: "#7dd3fc",

          borderWidth: 1,

          borderRadius: 6

        }

      ]

    },


    options: {

      responsive: true,

      maintainAspectRatio: false,

      plugins: {

        legend: {

          labels: {

            color: "#ffffff"

          }

        }

      },


      scales: {

        x: {

          ticks: {

            color: "#cbd5e1"

          },

          grid: {

            color: "rgba(255,255,255,0.08)"

          }

        },


        y: {

          beginAtZero: true,

          max: 100,

          ticks: {

            color: "#cbd5e1",

            callback: function(value) {

              return value + "%";

            }

          },

          grid: {

            color: "rgba(255,255,255,0.08)"

          }

        }

      }

    }

  });

}
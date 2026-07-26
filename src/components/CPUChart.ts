import {
    Chart,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";


Chart.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Tooltip,
    Legend
);


let chart: Chart | null = null;


export function renderCPUChart(history:number[]) {


    const canvas = document.getElementById(
        "cpuChart"
    ) as HTMLCanvasElement;


    if(!canvas) return;



    if(chart){

        chart.destroy();

    }



    chart = new Chart(canvas, {


        type:"bar",


        data:{


            labels:[
                "1",
                "2",
                "3",
                "4",
                "5"
            ],


            datasets:[

                {

                    label:"CPU %",

                    data:history,

                    borderWidth:1,

                    barThickness:25

                }

            ]

        },


        options:{


            responsive:true,

            maintainAspectRatio:false,


            plugins:{


                legend:{

                    display:true

                }

            },


            scales:{


                y:{


                    beginAtZero:true,

                    max:100

                }


            }


        }


    });


}
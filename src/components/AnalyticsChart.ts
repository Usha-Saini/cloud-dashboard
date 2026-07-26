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


let apiChart: Chart | null = null;
let costChart: Chart | null = null;



export function renderAnalyticsCharts(){


    const apiCanvas =
    document.getElementById("apiChart") as HTMLCanvasElement;


    const costCanvas =
    document.getElementById("costChart") as HTMLCanvasElement;



    if(apiCanvas){


        if(apiChart){
            apiChart.destroy();
        }


        apiChart = new Chart(apiCanvas,{

            type:"bar",

            data:{

                labels:[
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ],

                datasets:[

                    {

                        label:"API Requests",

                        data:[
                            120,
                            200,
                            150,
                            300,
                            250
                        ]

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });


    }





    if(costCanvas){


        if(costChart){
            costChart.destroy();
        }


        costChart = new Chart(costCanvas,{

            type:"bar",

            data:{

                labels:[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May"
                ],


                datasets:[

                    {

                        label:"AWS Cost ($)",

                        data:[
                            12,
                            18,
                            25,
                            20,
                            30
                        ]

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });


    }


}
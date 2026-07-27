import {
    Chart,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";


Chart.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend
);


let apiChart: Chart | null = null;
let costChart: Chart | null = null;
let severityChart: Chart | null = null;


export function renderAnalyticsCharts(
    severityData?: {
        Critical: number;
        High: number;
        Medium: number;
        Low: number;
    }
) {
    const apiCanvas =
        document.getElementById("apiChart") as HTMLCanvasElement;

    const costCanvas =
        document.getElementById("costChart") as HTMLCanvasElement;

    const severityCanvas =
        document.getElementById("severityChart") as HTMLCanvasElement;


    // =========================
    // API REQUESTS CHART
    // =========================

    if (apiCanvas) {

        if (apiChart) {
            apiChart.destroy();
        }

        apiChart = new Chart(apiCanvas, {

            type: "bar",

            data: {

                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ],

                datasets: [

                    {

                        label: "API Requests",

                        data: [
                            120,
                            200,
                            150,
                            300,
                            250
                        ],

                        backgroundColor: "#3b82f6",

                        borderColor: "#60a5fa",

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

                        ticks: {

                            color: "#cbd5e1"

                        },

                        grid: {

                            color: "rgba(255,255,255,0.08)"

                        }

                    }

                }

            }

        });

    }


    // =========================
    // AWS COST CHART
    // =========================

    if (costCanvas) {

        if (costChart) {
            costChart.destroy();
        }

        costChart = new Chart(costCanvas, {

            type: "bar",

            data: {

                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May"
                ],

                datasets: [

                    {

                        label: "AWS Cost ($)",

                        data: [
                            12,
                            18,
                            25,
                            20,
                            30
                        ],

                        backgroundColor: "#22c55e",

                        borderColor: "#4ade80",

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

                        ticks: {

                            color: "#cbd5e1"

                        },

                        grid: {

                            color: "rgba(255,255,255,0.08)"

                        }

                    }

                }

            }

        });

    }


    // =========================
    // INCIDENT SEVERITY CHART
    // =========================

    if (severityCanvas) {

        if (severityChart) {
            severityChart.destroy();
        }

        severityChart = new Chart(severityCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Critical",
                    "High",
                    "Medium",
                    "Low"
                ],

                datasets: [

                    {

                        label: "Incidents",

                     data: [
    severityData?.Critical ?? 0,
    severityData?.High ?? 0,
    severityData?.Medium ?? 0,
    severityData?.Low ?? 0
],

                        backgroundColor: [

                            "#ef4444",

                            "#f97316",

                            "#eab308",

                            "#22c55e"

                        ],

                        borderColor: "#1e293b",

                        borderWidth: 3

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom",

                        labels: {

                            color: "#ffffff",

                            padding: 15

                        }

                    }

                }

            }

        });

    }

}
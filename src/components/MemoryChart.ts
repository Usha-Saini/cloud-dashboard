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

let memoryChart: Chart | null = null;

export function renderMemoryChart(values:number[]){

const canvas=document.getElementById("memoryChart") as HTMLCanvasElement;

if(!canvas) return;

if(memoryChart){

memoryChart.destroy();

}

memoryChart=new Chart(canvas,{

type:"bar",

data:{

labels:values.map((_,i)=>`Server ${i+1}`),

datasets:[{

label:"Memory %",

data:values

}]

},

options:{

responsive:true,

scales:{

y:{

beginAtZero:true,

max:100

}

}

}

});

}
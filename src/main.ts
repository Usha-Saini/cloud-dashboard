import './style.css'

import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { CloudCard } from './components/CloudCard'
import { Monitoring } from './components/Monitoring'
import { Charts } from './components/Charts'
import { Summary } from './components/Summary'

import { renderCPUChart } from './components/CPUChart'
import { renderAnalyticsCharts } from "./components/AnalyticsChart"

import { getCloudData } from './services/api'


async function loadDashboard() {


    const cloud = await getCloudData()



    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `


<div class="layout">


    ${Sidebar()}


    <main class="content">


        ${Navbar()}



        <section class="cards">


            ${CloudCard(
                "EC2 Instances",
                String(cloud.ec2),
                cloud.status,
                "🖥️"
            )}



            ${CloudCard(
                "S3 Buckets",
                String(cloud.s3),
                "Available",
                "🪣"
            )}



            ${CloudCard(
                "Lambda Functions",
                String(cloud.lambda),
                "Healthy",
                "⚡"
            )}



            ${CloudCard(
                "Instance ID",
                cloud.instanceId,
                "Connected",
                "🆔"
            )}



            ${CloudCard(
                "Monthly Cost",
                "$" + cloud.cost,
                "AWS Billing",
                "💰"
            )}


        </section>



        ${Monitoring()}



        ${Charts()}



        <div id="summary"></div>



    </main>


</div>


`;



    try {


        const response = await fetch(
            "http://localhost:5000/api/cloud/metrics"
        );


        const data = await response.json();




        // CPU Progress Bar

        const cpuBar =
        document.querySelector<HTMLDivElement>("#cpu-bar");


        const cpuValue =
        document.querySelector<HTMLDivElement>("#cpu-value");



        if(cpuBar && cpuValue){

            cpuBar.style.width = data.cpu + "%";

            cpuValue.innerHTML = data.cpu + "%";

        }




        // CPU Chart

        renderCPUChart(
            data.history || [data.cpu]
        );



        // API + Cost Charts

        renderAnalyticsCharts();





        // Summary

        const summary =
        document.querySelector<HTMLDivElement>("#summary");



        if(summary){


            summary.innerHTML = Summary(

                cloud.ec2,

                cloud.s3,

                cloud.lambda,

                data.cpu,

                cloud.status,

                cloud.instanceId

            );


        }




    }

    catch(error){

        console.log(error);

    }



}



loadDashboard();



setInterval(()=>{

    loadDashboard();

},30000);
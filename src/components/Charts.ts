export function Charts() {

return `

<section class="charts">

<h2>Cloud Analytics</h2>

<div class="chart-container">


<div class="chart-card">

<h3>CPU Utilization</h3>

<div class="cpu-chart-box">
<canvas id="cpuChart"></canvas>
</div>

</div>



<div class="chart-card">

<h3>API Requests</h3>

<div class="cpu-chart-box">
<canvas id="apiChart"></canvas>
</div>

</div>



<div class="chart-card">

<h3>Monthly Cost</h3>

<div class="cpu-chart-box">
<canvas id="costChart"></canvas>
</div>

</div>


</div>

</section>

`;

}
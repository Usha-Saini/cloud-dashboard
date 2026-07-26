export function Monitoring(){

return `

<section class="monitor">

<h2>Cloud Monitoring</h2>


<div class="metric">

<span>CPU Usage</span>

<div class="progress">
<div id="cpu-bar" class="fill cpu"></div>
</div>

<b id="cpu-value">Loading...</b>

</div>


<div class="metric">

<span>Memory Usage</span>

<div class="progress">
<div class="fill memory"></div>
</div>

<b>48%</b>

</div>


<div class="metric">

<span>Network Traffic</span>

<div class="progress">
<div class="fill network"></div>
</div>

<b>72%</b>

</div>


</section>

`

}
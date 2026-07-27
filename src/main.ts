import "./style.css";
import { getCloudData } from "./services/api";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Charts } from "./components/Charts";
import { renderAnalyticsCharts } from "./components/AnalyticsChart";


async function loadDashboard() {

  try {

    const cloud = await getCloudData();

    const incidents = cloud.incidents;


    // =========================
    // INCIDENT SEVERITY COUNTS
    // =========================

    const severityData = {

      Critical: incidents.filter(
        (i: any) => i.severity === "Critical"
      ).length,

      High: incidents.filter(
        (i: any) => i.severity === "High"
      ).length,

      Medium: incidents.filter(
        (i: any) => i.severity === "Medium"
      ).length,

      Low: incidents.filter(
        (i: any) => i.severity === "Low"
      ).length

    };


    // =========================
    // INCIDENT SUMMARY
    // =========================

    const total = incidents.length;

    const critical = severityData.Critical;

    const high = severityData.High;

    const medium = severityData.Medium;

    const low = severityData.Low;


    // =========================
    // INCIDENT CARDS
    // =========================

    const cards = incidents
      .map(
        (i: any) => `

<div class="card">

<h2>${i.server}</h2>

<p>
<b>🌍 Region:</b> ${i.region}
</p>

<p>
<b>🟢 Status:</b> ${i.status}
</p>

<p>

<b>Severity:</b>

<span class="${i.severity.toLowerCase()}">

${i.severity}

</span>

</p>


<p>
<b>CPU:</b> ${i.cpu}%
</p>

<div class="progress">

<div
class="fill"
style="width:${i.cpu}%"
></div>

</div>


<p>
<b>Memory:</b> ${i.memory}%
</p>

<div class="progress">

<div
class="fill memory"
style="width:${i.memory}%"
></div>

</div>


<p>
<b>Disk:</b> ${i.disk}%
</p>

<div class="progress">

<div
class="fill network"
style="width:${i.disk}%"
></div>

</div>


<div class="recommendation">

<b>💡 Recommendation</b>

<br><br>

${i.recommendation}

</div>


<small>

Processed :

${new Date(i.processedTime).toLocaleString()}

</small>

</div>

`
      )
      .join("");


    // =========================
    // INCIDENT MONITORING TABLE
    // =========================

    const incidentTable = incidents
      .map(
        (i: any) => {

          const statusClass =
            i.status?.toLowerCase() === "active"
              ? "status-active"
              : i.status?.toLowerCase() === "healthy"
              ? "status-healthy"
              : "status-warning";


          const severityClass =
            `severity-${i.severity.toLowerCase()}`;


          return `

<tr>

<td>
<strong>${i.server}</strong>
</td>

<td>
${i.region}
</td>

<td>

<span class="status-badge ${statusClass}">

${i.status}

</span>

</td>

<td>

<span class="severity-badge ${severityClass}">

${i.severity}

</span>

</td>

<td>
${i.cpu}%
</td>

<td>
${i.memory}%
</td>

<td>
${i.disk}%
</td>

<td>

${new Date(i.processedTime).toLocaleString()}

</td>

</tr>

`;

        }
      )
      .join("");


    // =========================
    // DASHBOARD HTML
    // =========================

    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

<div class="layout">

${Sidebar()}


<div class="content">

${Navbar()}


<div class="dashboard">


<!-- AWS CARDS -->

<div class="aws-cards">


<div class="aws-card">

<h3>🖥 EC2 Instances</h3>

<h2>${cloud.ec2}</h2>

<p>${cloud.status}</p>

</div>


<div class="aws-card">

<h3>🪣 S3 Buckets</h3>

<h2>${cloud.s3}</h2>

<p>Available</p>

</div>


<div class="aws-card">

<h3>⚡ Lambda Functions</h3>

<h2>${cloud.lambda}</h2>

<p>Healthy</p>

</div>


<div class="aws-card">

<h3>💰 Monthly Cost</h3>

<h2>$${cloud.cost}</h2>

<p>AWS Billing</p>

</div>


<div class="aws-card">

<h3>🖥 CPU Usage</h3>

<h2>${cloud.cpu}%</h2>

<p>Live</p>

</div>


</div>


<!-- INCIDENT SUMMARY -->

<div class="summary">


<div class="box">

<h2>${total}</h2>

<p>Total Incidents</p>

</div>


<div class="box">

<h2>${critical}</h2>

<p>Critical</p>

</div>


<div class="box">

<h2>${high}</h2>

<p>High</p>

</div>


<div class="box">

<h2>${medium}</h2>

<p>Medium</p>

</div>


<div class="box">

<h2>${low}</h2>

<p>Low</p>

</div>


</div>


<!-- CLOUD ANALYTICS -->

${Charts()}


<!-- INCIDENT MONITORING TABLE -->

<section class="incident-table-section">

<h2>
📋 Incident Monitoring
</h2>


<div class="table-wrapper">

<table class="incident-table">

<thead>

<tr>

<th>Server</th>

<th>Region</th>

<th>Status</th>

<th>Severity</th>

<th>CPU</th>

<th>Memory</th>

<th>Disk</th>

<th>Processed</th>

</tr>

</thead>


<tbody>

${incidentTable}

</tbody>

</table>

</div>

</section>


<!-- RECENT INCIDENTS -->

<h2 style="margin:30px 0 20px 0;">

🚨 Recent Cloud Incidents

</h2>


<div class="grid">

${cards}

</div>


</div>

</div>

</div>

`;


    // =========================
    // RENDER CHARTS
    // =========================

    renderAnalyticsCharts(severityData);
    const refreshBtn =
  document.getElementById("refreshBtn");

if (refreshBtn) {

  refreshBtn.addEventListener(
    "click",
    () => {

      loadDashboard();

    }
  );

}


    // =========================
    // CPU CHART
    // =========================

 

  } catch (err) {

    console.error(err);


    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `

<div style="padding:40px;text-align:center;">

<h1>
⚠ Unable to load AWS Incident Data
</h1>

<p>

Please check your API Gateway or internet connection.

</p>

</div>

`;

  }

}


// =========================
// INITIAL DASHBOARD LOAD
// =========================

loadDashboard();


// =========================
// AUTO REFRESH
// =========================

setInterval(() => {

  loadDashboard();

}, 30000);
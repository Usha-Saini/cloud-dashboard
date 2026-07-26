export function CloudCard(
  title: string,
  value: string,
  status: string,
  icon: string
) {

let statusClass = "status";

if(status.toLowerCase() === "running"){

statusClass = "status running";

}
else if(status.toLowerCase() === "stopped"){

statusClass = "status stopped";

}
else if(status.toLowerCase() === "terminated"){

statusClass = "status terminated";

}

return `

<div class="card">

<div class="card-icon">

${icon}

</div>

<h3>

${title}

</h3>

<p class="number">

${value}

</p>

<span class="${statusClass}">

${status}

</span>

</div>

`;

}
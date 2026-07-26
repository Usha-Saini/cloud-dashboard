export function Summary(
    ec2: number,
    s3: number,
    lambda: number,
    cpu: number,
    status: string,
    instanceId: string
){

return `

<section class="summary">

<h2>AWS Summary</h2>

<div class="summary-grid">

<div class="summary-item">
<strong>EC2 Running</strong>
<p>${ec2}</p>
</div>

<div class="summary-item">
<strong>S3 Buckets</strong>
<p>${s3}</p>
</div>

<div class="summary-item">
<strong>Lambda Functions</strong>
<p>${lambda}</p>
</div>

<div class="summary-item">
<strong>CPU Usage</strong>
<p>${cpu}%</p>
</div>

<div class="summary-item">
<strong>Status</strong>
<p>${status}</p>
</div>

<div class="summary-item">
<strong>Instance ID</strong>
<p>${instanceId}</p>
</div>

</div>

</section>

`;

}
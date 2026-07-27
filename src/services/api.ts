const API_URL =
"https://184pg89kq1.execute-api.ap-south-1.amazonaws.com/incidents";

export async function getCloudData(){

    const response = await fetch(API_URL);

    const incidents = await response.json();

    const first = incidents[0] || {};

    return {

        ec2: incidents.length,

        s3: 1,

        lambda: incidents.length,

        instanceId: first.server || "N/A",

        cost: 12,

        status: first.status || "Running",

        cpu: first.cpu || 0,

        memory: first.memory || 0,

        disk: first.disk || 0,

        history: incidents.map((i:any)=>i.cpu),

        incidents

    };

}
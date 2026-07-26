export async function getCloudData(){

const response = await fetch(
"http://localhost:5000/api/cloud"
);


const data = await response.json();


return data;

}
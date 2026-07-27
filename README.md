# ☁️ Cloud Incident Dashboard

A real-time cloud incident monitoring dashboard designed to monitor cloud infrastructure, track incidents, visualize system metrics, and provide actionable recommendations.

## 🚀 Project Overview

The Cloud Incident Dashboard provides a centralized view of cloud infrastructure health and incident activity.

The dashboard displays:

- EC2 Instances
- S3 Buckets
- Lambda Functions
- Monthly AWS Cost
- CPU Usage
- Incident Severity Summary
- API Request Analytics
- Monthly Cost Analytics
- Incident Severity Visualization
- Recent Cloud Incidents
- Server Health Metrics
- Incident Recommendations

## ✨ Features

### ☁️ Cloud Infrastructure Overview

The dashboard provides quick insights into:

- EC2 Instances
- S3 Buckets
- Lambda Functions
- Monthly AWS Cost
- CPU Usage

### 🚨 Incident Monitoring

Each incident displays:

- Server Name
- AWS Region
- Server Status
- Incident Severity
- CPU Utilization
- Memory Utilization
- Disk Utilization
- Recommended Action
- Processed Timestamp

### 📊 Cloud Analytics

The dashboard includes visual analytics for:

- API Requests
- Monthly AWS Cost
- Incident Severity Distribution

### 🔄 Real-Time Monitoring

The dashboard automatically refreshes cloud incident data every 30 seconds.

A manual **Refresh Now** button is also available to fetch the latest data.

## 🛠️ Technologies Used

- TypeScript
- Vite
- Chart.js
- HTML
- CSS
- AWS Services
- API Gateway
- AWS Lambda
- Amazon S3
- Amazon DynamoDB

## 📁 Project Structure

```text
cloud-dashboard
│
├── public
│
├── screenshots
│
├── src
│   ├── components
│   │   ├── AnalyticsChart.ts
│   │   ├── Charts.ts
│   │   ├── CloudCard.ts
│   │   ├── CPUChart.ts
│   │   ├── MemoryChart.ts
│   │   ├── Monitoring.ts
│   │   ├── Navbar.ts
│   │   ├── Sidebar.ts
│   │   └── Summary.ts
│   │
│   ├── services
│   │   ├── api.ts
│   │   └── cloudData.ts
│   │
│   ├── main.ts
│   └── style.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
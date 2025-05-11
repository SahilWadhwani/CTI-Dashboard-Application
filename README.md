##  Cyber Threat Intelligence (CTI) Dashboard

###  Project Overview

The CTI Dashboard is a web application that pulls data from public Cyber Threat Intelligence (CTI) sources and displays it in a visually meaningful way.

###  Tech Stack

* **Backend**: Node.js, Express
* **Frontend**: React.js, React Leaflet
* **Visualization**: Leaflet (for maps)
* **Data Fetching**: Axios
* **Styling**: CSS
* **CTI API Source**: Open Threat Exchange (OTX)

###  Features

#### Data Retrieval:

* Fetches real-time CTI data from the OTX API.

#### Interactive Map:

* Displays the geographic location of IP addresses using Leaflet.

#### Data Filtering:

* Filter by Indicator Type (IPv4, Domain)
* Filter by Reputation (High, Medium, Low)

#### Automatic Refresh:

* Refresh button to update the data manually without reloading the entire page.

#### Responsive UI:

* Clean and intuitive dashboard layout.

###  Installation and Setup

#### Prerequisites:

* Node.js and npm installed
* React installed globally

#### Step 1: Clone the Repository:

```bash
git clone https://github.com/SahilWadhwani/CTI-Dashboard-Application.git
cd CTI-Dashboard-Application
```

#### Step 2: Backend Setup:

```bash
cd backend
npm install
```

#### Step 3: Set Up Environment Variables:

Create a `.env` file in the backend folder with the following content:

```ini
PORT=5000
OTX_API_KEY=YOUR_API_KEY
```
Visit https://otx.alienvault.com/ for API key.

#### Step 4: Start the Backend Server:

```bash
npm run dev
```

#### Step 5: Frontend Setup:

```bash
cd ../frontend
npm install
npm start
```

#### Step 6: Open the Application:

Visit [http://localhost:3000](http://localhost:3000) in your browser.

###  Usage Instructions

1. Open the dashboard.
2. Use the filter dropdowns to filter data by Indicator Type or Reputation.
3. Click the Refresh Data button to fetch the latest data.
4. The map will display the location based on the IP's latitude and longitude.

###  Example Output

![image](https://github.com/user-attachments/assets/a7e81e77-ffd9-4bb9-9c55-6196b69dc0f7)


###  Troubleshooting

* **Backend not running**: Ensure that the backend server is running on port 5000.
* **Map not displayed**: Make sure the Leaflet library is installed correctly.
* **CORS Issues**: Double-check the proxy settings in the frontend.

###  Project Structure

```
cti-dashboard/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── app.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── App.css
└── README.md
```

###  Future Enhancements

* **Integrating More CTI Sources**: Add data from AbuseIPDB, MISP, etc.
* **Advanced Filtering**: Allow users to filter based on country or ASN.


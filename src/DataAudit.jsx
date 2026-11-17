import React, { useState } from "react";

const DATASETS = {
  cpcb: {
    name: "CPCB Continuous Ambient Air Quality (CAAQMS - Delhi)",
    source: "Central Pollution Control Board (CPCB) India & Automated Monitoring Stations",
    info: "Hourly telemetry tracking criteria pollutants (PM2.5, PM10, NO2, CO, Ozone, SO2) across Delhi monitoring stations from 2017 to 2026. Essential for tracking acute exposure windows and winter pollution spikes.",
    rows: 87600,
    columns: ["Timestamp", "Station_ID", "PM2_5", "PM10", "NO2", "CO", "Ozone", "SO2", "Temp", "Humidity"],
    stats: [
      { column: "Timestamp", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-01-01 00:00", status: "🟢 High Consistency" },
      { column: "Station_ID", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-01-01 00:00", status: "🟢 High Consistency" },
      { column: "PM2_5", missingCount: 4380, missingPct: 5.0, firstValidTimestamp: "2017-01-03 14:00", status: "🟢 High Consistency" },
      { column: "PM10", missingCount: 3504, missingPct: 4.0, firstValidTimestamp: "2017-01-01 08:00", status: "🟢 High Consistency" },
      { column: "NO2", missingCount: 13140, missingPct: 15.0, firstValidTimestamp: "2017-02-10 10:00", status: "🟡 Moderate Gaps" },
      { column: "CO", missingCount: 17520, missingPct: 20.0, firstValidTimestamp: "2017-03-15 12:00", status: "🟡 Moderate Gaps" },
      { column: "Ozone", missingCount: 21900, missingPct: 25.0, firstValidTimestamp: "2017-05-01 00:00", status: "🟡 Moderate Gaps" },
      { column: "SO2", missingCount: 30660, missingPct: 35.0, firstValidTimestamp: "2017-08-20 06:00", status: "🔴 Sparse / Unreliable" },
      { column: "Temp", missingCount: 876, missingPct: 1.0, firstValidTimestamp: "2017-01-01 00:00", status: "🟢 High Consistency" },
      { column: "Humidity", missingCount: 876, missingPct: 1.0, firstValidTimestamp: "2017-01-01 00:00", status: "🟢 High Consistency" }
    ],
    downloadUrl: "https://github.com/Shwetankjais/AirScope_Delhi/raw/main/data/cpcb_delhi_telemetry.csv"
  },
  firms: {
    name: "NASA FIRMS (Active Fire / Stubble Burning)",
    source: "NASA Land, Atmosphere Near real-time Capability for EOS (LANCE) / MODIS & VIIRS",
    info: "Satellite detection of thermal anomalies and agricultural residue burning across Punjab, Haryana, and neighboring northwestern states contributing to Delhi's post-monsoon smog episodes.",
    rows: 45200,
    columns: ["Latitude", "Longitude", "Brightness", "Scan", "Track", "Acquisition_Date", "Confidence", "Version", "Bright_T31", "FRRP"],
    stats: [
      { column: "Latitude", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Longitude", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Brightness", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Scan", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Track", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Acquisition_Date", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Confidence", missingCount: 452, missingPct: 1.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Version", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017-10-01", status: "🟢 High Consistency" },
      { column: "Bright_T31", missingCount: 1356, missingPct: 3.0, firstValidTimestamp: "2017-10-02", status: "🟢 High Consistency" },
      { column: "FRRP", missingCount: 9040, missingPct: 20.0, firstValidTimestamp: "2017-10-15", status: "🟡 Moderate Gaps" }
    ],
    downloadUrl: "https://github.com/Shwetankjais/AirScope_Delhi/raw/main/data/nasa_firms_fire_data.csv"
  },
  edgar: {
    name: "EDGAR Sector Emissions Inventory",
    source: "Emissions Database for Global Atmospheric Research (European Commission)",
    info: "Gridded sector-wise emissions data tracking annual contributions from power generation, industry, residential combustion, and transport infrastructure.",
    rows: 1250,
    columns: ["Grid_ID", "Sector", "Year", "CO2_Emissions", "PM25_Emissions", "NOx_Emissions", "SO2_Emissions", "VOC_Emissions"],
    stats: [
      { column: "Grid_ID", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Sector", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Year", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "CO2_Emissions", missingCount: 12, missingPct: 0.96, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "PM25_Emissions", missingCount: 25, missingPct: 2.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "NOx_Emissions", missingCount: 18, missingPct: 1.44, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "SO2_Emissions", missingCount: 50, missingPct: 4.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "VOC_Emissions", missingCount: 125, missingPct: 10.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" }
    ],
    downloadUrl: "https://github.com/Shwetankjais/AirScope_Delhi/raw/main/data/edgar_emissions.csv"
  },
  ghsl: {
    name: "Copernicus GHSL Population Grids",
    source: "European Commission, Joint Research Centre (JRC) / Global Human Settlement Layer",
    info: "Spatial distribution of population density and built-up areas mapped across urban wards to model exposure risk and demographic vulnerability to heat and air pollution.",
    rows: 3400,
    columns: ["Ward_ID", "Epoch_Year", "Total_Population", "Built_Up_Area_Sqm", "Population_Density_SqKm"],
    stats: [
      { column: "Ward_ID", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Epoch_Year", missingCount: 0, missingPct: 0.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Total_Population", missingCount: 34, missingPct: 1.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Built_Up_Area_Sqm", missingCount: 68, missingPct: 2.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" },
      { column: "Population_Density_SqKm", missingCount: 34, missingPct: 1.0, firstValidTimestamp: "2017", status: "🟢 High Consistency" }
    ],
    downloadUrl: "https://github.com/Shwetankjais/AirScope_Delhi/raw/main/data/copernicus_ghsl.csv"
  }
};

export function DataAudit() {
  const [selectedKey, setSelectedKey] = useState("cpcb");
  const dataset = DATASETS[selectedKey];

  return (
    <div className="section-block reveal visible" style={{ padding: "2rem" }}>
      <div className="section-heading">
        <div>
          <div className="eyebrow"><span></span> AIRSCOPE INDIA / DATA TELEMETRY AUDIT</div>
          <h2>Dataset Quality & Consistency Audit</h2>
          <p>Select a project parameter dataset below to analyze source metadata, missing values, and consistent telemetry intervals instantly.</p>
        </div>
      </div>

      {/* Dataset Selection Dropdown */}
      <div style={{ margin: "2rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>Select Project Dataset / Parameter:</label>
        <select 
          value={selectedKey} 
          onChange={(e) => setSelectedKey(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border, #444)",
            color: "inherit",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer"
          }}
        >
          {Object.entries(DATASETS).map(([key, val]) => (
            <option key={key} value={key} style={{ background: "#111", color: "#fff" }}>
              {val.name}
            </option>
          ))}
        </select>
      </div>

      {/* Source Info Card */}
      <div style={{ 
        background: "rgba(59, 130, 246, 0.05)", 
        border: "1px solid rgba(59, 130, 246, 0.2)", 
        borderRadius: "12px", 
        padding: "1.5rem", 
        marginBottom: "2rem" 
      }}>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--accent, #3b82f6)" }}>{dataset.name}</h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "0.75rem" }}><strong>Source Authority:</strong> {dataset.source}</p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, lineHeight: "1.5" }}>{dataset.info}</p>
      </div>

      {/* Quick Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="stat-card"><b>{dataset.rows.toLocaleString()}</b><small>Total Simulated Records</small></div>
        <div className="stat-card"><b>{dataset.columns.length}</b><small>Parameters / Features</small></div>
        <div className="stat-card"><b>2017 – 2026</b><small>Decadal Span Coverage</small></div>
      </div>

      {/* Audit Table */}
      <div style={{ overflowX: "auto", marginBottom: "2.5rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border, #444)", opacity: 0.8 }}>
              <th style={{ padding: "12px" }}>Parameter / Column</th>
              <th style={{ padding: "12px" }}>Missing Count</th>
              <th style={{ padding: "12px" }}>Missing (%)</th>
              <th style={{ padding: "12px" }}>Consistent From (First Valid Record)</th>
              <th style={{ padding: "12px" }}>Data Quality Status</th>
            </tr>
          </thead>
          <tbody>
            {dataset.stats.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: 600 }}>{row.column}</td>
                <td style={{ padding: "12px" }}>{row.missingCount.toLocaleString()}</td>
                <td style={{ padding: "12px", color: row.missingPct > 20 ? "#ef4444" : row.missingPct > 5 ? "#f59e0b" : "#10b981" }}>
                  {row.missingPct}%
                </td>
                <td style={{ padding: "12px" }}>{row.firstValidTimestamp}</td>
                <td style={{ padding: "12px" }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Data Section at the End */}
      <div style={{ 
        background: "rgba(16, 185, 129, 0.05)", 
        border: "1px solid rgba(16, 185, 129, 0.2)", 
        borderRadius: "12px", 
        padding: "1.5rem", 
        display: "flex", 
        flexDirection: "column", 
        gap: "1rem",
        alignItems: "flex-start"
      }}>
        <div>
          <h4 style={{ marginBottom: "0.25srem", color: "#10b981" }}>📥 Raw Dataset Access</h4>
          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Download the raw CSV source files for this parameter directly from your GitHub repository.</p>
        </div>
        <a 
          href={dataset.downloadUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="primary" 
          style={{ 
            textDecoration: "none", 
            padding: "10px 20px", 
            background: "#10b981", 
            color: "#fff", 
            borderRadius: "6px", 
            fontWeight: 600,
            display: "inline-flex",
            alignGap: "8px",
            fontSize: "0.9rem"
          }}
        >
          Download Raw CSV File ↗
        </a>
      </div>
    </div>
  );
}

Klimashift Dashboard: Information Architecture and Screen Flow Document

1. Document Overview and System Purpose

The Klimashift Dashboard is an enterprise-grade energy management and operational ecosystem designed specifically for multi-site food retailers. Architecturally, the system is engineered to serve as a Single Source of Truth (SSoT) for both financial stakeholders (Savings/ROI) and operational personnel (Maintenance/Technical).

A core UX objective of the platform is the mitigation of "alarm fatigue." This is achieved through a deliberate hierarchy of data, transitioning users from high-level portfolio health indicators down to granular, asset-level diagnostics. By structuring data states into Connected vs. Disconnected and Online vs. Offline, the system allows technical analysts to identify systemic inefficiencies before they escalate into critical hardware failures.

2. Onboarding and Initial Configuration Flow

The system utilizes a linear, four-stage wizard to ensure a standardized data baseline for new sites. The workflow captures essential building parameters and user permissions before the site enters the monitoring loop.

The Four-Stage Setup Workflow:

1. Add Building: Entry of foundational site metadata, including floor area (Sq. Ft.), brand, and geographic coordinates.
2. Add Assets: Identification and categorization of specific appliances (e.g., Deep Fryers, HVAC units, Ovens).
3. Add User: A multi-user assignment screen. Administrators can add several users simultaneously via the "Add more user" button [SOURCE_IMAGE_1]. A "Select User Type" dropdown enables custom role definitions (Manager, Building Manager, Technician, or Admin) to enforce strict access control.
4. Add Utility: Upload of historical utility bills for baseline usage analysis and the creation of energy consumption profiles.

Navigation is controlled via "Skip" and "Next" buttons, allowing for asynchronous data entry while maintaining the logical progression of the system setup.

3. Home: The Portfolio Command Center

The Home screen is the primary intelligence entry point, providing an aggregated view of multi-site operations.

Key Portfolio Metrics

The dashboard header displays four high-value metric cards for rapid health assessment:

Metric	Description
Total Buildings	Aggregate count of all sites under management.
Total Assets	Cumulative inventory of all connected energy-consuming hardware.
Total Users	Total personnel accounts within the enterprise hierarchy.
Total Unresolved Tickets	Current backlog of open maintenance issues requiring intervention.

Performance Ranking and Triage

* Portfolio Details Table: This view ranks sites using primary performance variables: EUI (kWh/sq.m/year) and Power Factor [SOURCE_IMAGE_35]. These metrics are the lead indicators for identifying underperforming buildings.
* Top Alerts Sidebar: To immediately address critical failures, this widget categorizes urgent issues (e.g., "Deep Fridge Overvoltage") to ensure high-priority faults are visible before navigating deeper into the building lists.
* Distribution by Category: A donut chart segments the portfolio’s energy footprint into categories: HVAC, Cooking, Refrigeration, Kitchen, Beverage, and Others.

4. Buildings: Geographic and Site Hierarchy

The Buildings module manages the transition from geographic clusters to specific hardware nodes.

Navigation and Site Management

Users interact with a Map View for geographic distribution and a Buildings List for tabular data (e.g., Utility account status: Connected/Disconnected). The "View/Edit" flow reveals a multi-faceted site page:

* Building Info & Utility Connection: Details the status of accounts (e.g., BSES), meter locations (e.g., Basement, 1st Floor), and billing recency.
* Controller & Sensors Connection: Monitors technical health by tracking "Device Status" (Online/Offline) and "Power Status" (ON/OFF) for specific asset controllers [SOURCE_IMAGE_51].
* Scheduling Flow: A technical wizard allows users to set complex "ON/OFF Schedules" for specific controllers [SOURCE_IMAGE_18]. This includes day-specific selection and time interval blocks (e.g., Schedule-1: 01:30 - 02:00 hrs) to automate energy reduction during non-operational periods.
* Technical Documents: A localized repository for site-specific Warranties, Invoices, and User Manuals.

5. Assets: Appliance-Level Intelligence

This section focuses on identifying the "Total Cost of Ownership" (TCO) for individual kitchen and HVAC assets.

Asset Performance Analysis

The Asset Subcategory view features a scatter plot for "Maintenance Cost & Power Consumption Analysis." To provide architectural context, the plot includes "Ideal Power Rating Index" and "Industry Average" baselines [SOURCE_IMAGE_5], allowing analysts to identify assets that are outliers in both energy draw and repair frequency.

Asset Details and Lifecycle

The Detail screen captures real-time and historical data vital for asset management:

* Technical Identifiers: Brand, Model Number, Serial Number, and Installation Date.
* Operational Health: Active Alerts count, Current Temperature (e.g., -2°C), and Last Adjustment (e.g., -4°C).
* Maintenance Metadata: Specific fields include "Business Priority" (High/Medium/Low), "Age of Working" (e.g., 8 years 5 months), and "Warranty Status" [SOURCE_IMAGE_34].
* Tickets History Summary: A chronological log linking energy anomalies directly to maintenance actions (Resolution dates and ticket codes).

6. Avrio Advisor: AI-Driven Diagnostics

Avrio Advisor utilizes machine learning to synthesize raw data into actionable insights through Hardware Analysis and Bill Analysis tabs.

AI Insights: Building-Wise Summary

Sites are ranked by the severity of their energy anomalies:

Rank	Issue Type	Logic/Metric	Recommended Action
01	Highest Energy & Peak Demand	High EUI / Max Demand Indicator	Trigger "Meter Analysis" using High EUI filter.
02	Highest Energy Consumption	Total kWh vs. Floor Area	Review HVAC/Operational systems.
03	Lower Power Factor	PF < 0.95	Investigate reactive loads for correction.
04	Anomalous Consumption	Z-Score / Est. kWh Loss	Investigate metering or operational leaks.
05	Efficiency Benchmark	Optimal Energy Correlation	Replicate site settings across portfolio.

7. Avrio Tools: Operational Optimization

Avrio Tools provides the interface for physical system rebalancing and load shifting.

1. Balance Phase Distribution: Assets are reallocated across Phase A, B, and C based on real-time power ratings (kW) to prevent phase imbalance and neutral current issues.
2. Peak Load Optimization: A scheduling strategy where assets are divided into staggered groups (Group-1 to Group-3) shifted by 30-minute intervals. The UX supports a "Drag Asset" and "Sync Changes" interaction model [SOURCE_IMAGE_14]. Critically, an "Always ON" category exists for assets (e.g., primary refrigeration) that are excluded from staggered optimization.
3. Comparative Analysis: Normalizes data for building size using the "Relative Efficiency Gap (%)". It includes "Seasonal Comparison" (Summer vs. Winter) to account for external weather impacts on HVAC load.

8. Savings: Financial and Environmental ROI

The Savings module justifies system investment by differentiating between Potential and Actual realized gains.

* Financial Metrics: Tracking of APFC (Automatic Power Factor Correction) Savings, Sanctioned Load Savings, and Total Cost Savings.
* Energy Charge Stack: A granular breakdown including Energy, Fixed, and Time of the Day (ToD) charges. ToD visualization is essential for validating the success of the Peak Load Optimization tool.
* Drill-Down Logic: Actual Savings are summarized at the portfolio level but can be drilled down to site-specific "Units Saved (in kWh)" and "Total Actual Savings" in currency [SOURCE_IMAGE_42].

9. Maintenance & Tickets: The Operational Loop

The system closes the diagnostic loop by converting alerts into manageable maintenance tasks.

UX Componentry and Ticketing

The ticketing interface is designed for high-speed triage:

* Visual Status Badging: High-priority items are color-coded (Red=High, Yellow=Medium, Green=Low). Status badges include "On-Hold Ticket" (Purple) and "Overdue" (Red).
* Ticket Card Data: Contains Title, Building Code, Due Date, Assigned To, and "Completed By" fields.
* Financial Reconciliation: An "Expense Details" section allows for cost tracking per ticket, with a "Download CSV" option for reconciliation with accounting systems [SOURCE_IMAGE_50].

10. Settings and Administrative Configuration

The Configuration section manages enterprise preferences and the external procurement loop.

Customization and Preferences

* SLA & Budget: Admins define Default Priority Days (High=1, Medium=3, Low=4) and set "Budget Approver" limits (e.g., Min 1000, Max 2500 Rupees) [SOURCE_IMAGE_22].
* Mobile App Streamlining: To optimize the technician experience, admins choose exactly 6 out of 14 available filters (e.g., "Waiting for approval", "In-progress") in the Selection Preview to customize the mobile summary view [SOURCE_IMAGE_23].

The Marketplace Loop

A specialized "Market Place" sidebar allows managers to bridge the gap between diagnostics and hardware. If the "Advisor" identifies a failing Power Factor, users can select "Get Quote" for hardware like "Automatic Power Factor Control Panel Boxes" directly from the dashboard [SOURCE_IMAGE_40], completing the operational optimization loop.

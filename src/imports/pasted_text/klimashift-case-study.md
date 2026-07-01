Case Study: Klimashift — Transforming Energy Management with AI-Driven Visibility

Project Overview

The Klimashift Dashboard is a comprehensive Enterprise SaaS solution designed to modernize energy infrastructure management for multi-site organizations. As a Senior Product Designer, the primary objective was to architect a system that transitions facility operations from a reactive, opaque state to a proactive, data-driven optimization model. By synthesizing real-time telemetry with AI-driven analysis, the platform provides deep oversight into complex building portfolios.

The system architecture is engineered to support three distinct user mental models identified during the onboarding and configuration phases [SOURCE_IMAGE_1, SOURCE_IMAGE_48]:

* Managers: Focused on high-level portfolio performance, carbon footprint reduction, and macro-level ROI.
* Building Managers: Responsible for site-specific health, utility bill auditing, and operational efficiency.
* Technicians: Tasked with tactical execution, maintenance workflows, and responding to technical alerts.

The Problem Statement: The Visibility Gap

Facility managers traditionally operate within a "visibility gap," characterized by a lack of asset-level data granularity and a total reliance on reactive maintenance. This absence of system transparency leads to operational drift, where inefficiencies are only discovered through high utility bills or catastrophic equipment failure.

Key Pain Points

* Anomalous Consumption Patterns: Portfolio-wide opacity hides energy leaks and peak demand spikes. Sites like Hauz Khas often exhibit the highest energy consumption and peak demand without a clear diagnostic path for the user [SOURCE_IMAGE_6].
* Reactive Maintenance: Critical failures—such as "Deep Freezer is not working"—are typically identified only after stock is compromised, rather than through predictive telemetry [SOURCE_IMAGE_7, SOURCE_IMAGE_34].
* Operational Inefficiencies: Mismanaged electrical loads, including phase imbalances and "Lower power factor" issues, trigger financial penalties and increase the total cost of ownership [SOURCE_IMAGE_12, SOURCE_IMAGE_16].

The Solution: The Avrio Advisor & Integrated Telemetry

To bridge this gap, we developed the Avrio Advisor, an AI-driven engine that converts raw telemetry into actionable affordances.

AI-Driven Insights (Avrio Advisor)

The "Building Wise Summary" reduces cognitive load by ranking locations based on issue severity and providing automated optimization paths. Rather than presenting raw data tables, the UI offers specific suggestions [SOURCE_IMAGE_6]:

* Hauz Khas: "Prioritize an energy audit to investigate high consumption and peak load drivers."
* Saket: "Review operational systems (e.g., HVAC, lighting) for energy optimization."
* Ghitorni: "Investigate reactive loads and consider power factor correction measures."
* Janakpuri: "Review data accuracy and investigate any potential metering or operational anomalies."

Asset-Level Deep Dives & Interconnectivity

The interface provides high-fidelity asset views, tracking technical specifications (Power Rating, Serial Numbers) alongside real-time environmental data. For refrigeration assets, the UI distinguishes between Current Temperature (-2°C) and Last Action/Adjusted Temp (-4°C), a vital distinction for technical diagnostics [SOURCE_IMAGE_34].

Crucially, the system maintains interconnectivity by embedding a Ticket History Summary directly within the asset view [SOURCE_IMAGE_7, SOURCE_IMAGE_34]. This allows a technician to see that a specific unit has a recurring issue (e.g., Ticket T001) while simultaneously viewing its live performance metrics.

Proactive Maintenance System

The centralized ticketing workflow enables users to raise, assign, and track issues with priority-based urgency (High/Medium/Low). The system enhances accountability by tracking Total Expenses (e.g., ₹200.00) and maintenance activity logs directly against asset profiles, ensuring a clean audit trail [SOURCE_IMAGE_25, SOURCE_IMAGE_50].

Operational Optimization Tools

We introduced "Avrio Tools" to provide users with direct control over their energy footprint through intelligent automation.

* Peak Load Optimization: Using a "Staggered Approach," users can flatten energy peaks by dragging assets into specific timing groups (30, 60, or 90-minute shifts). The UI provides immediate visual validation through an "Original Load" vs. "Optimized Load" comparison graph, supported by a Sync Changes affordance to commit optimization strategies [SOURCE_IMAGE_14].
* Automated Scheduling: The Controller interface allows for granular ON/OFF scheduling. Users can eliminate energy waste during non-operational hours by setting precise windows across different days of the week [SOURCE_IMAGE_18, SOURCE_IMAGE_30].
* Intelligent Phase Balancing: To prevent overloads, the tool provides a "Before and After" distribution visualization. The system might suggest moving a Microwave from Phase B to Phase C to achieve a balanced distribution (e.g., 32.98% / 29.5% / 37.5%), optimizing the power rating index [SOURCE_IMAGE_16].

User Experience & Interface Design

The design prioritizes "time-to-insight" by utilizing a high-contrast visual hierarchy and a structured navigation model.

* Information Architecture: The persistent sidebar facilitates a logical progression from "Monitoring" (Home, Buildings) to "Action" (Avrio Advisor, Avrio Tools, Maintenance). This structure aligns with the user’s workflow from high-level oversight to granular execution [SOURCE_IMAGE_5].
* Multi-Tonal Visual Communication: To provide immediate status awareness, the system utilizes a specialized color palette for alerts: Red for Overvoltage/High Temp, Blue for Undervoltage/Low Temp, Purple for Inrush Current, and Green for Earth Leakage [SOURCE_IMAGE_4].
* Data Visualization: Complex billing stacks are simplified through "Distribution by Category" donut charts and historical bar charts, allowing users to differentiate consumption across HVAC, Refrigeration, and Cooking equipment at a glance [SOURCE_IMAGE_9, SOURCE_IMAGE_41].

Business Impact & ROI

Klimashift translates technical telemetry into clear financial outcomes through the "Savings Analytics" dashboard.

Key Metrics & Financial Tracking

* Total Cost Savings: Immediate visibility into monetary gains (e.g., ₹20,345) [SOURCE_IMAGE_42].
* Total Carbon Saving: Environmental impact quantified in tonnes of CO2e (e.g., 26 t CO2e) [SOURCE_IMAGE_42].
* APFC & Technical Savings: The system tracks the Ideal Power Factor (0.98) against current performance to calculate potential ROI for hardware upgrades. Key technical savings include Total APFC Saving (e.g., ₹2,30,345) and Sanctioned Load Savings [SOURCE_IMAGE_41, SOURCE_IMAGE_42, SOURCE_IMAGE_43].

Scalability and Ecosystem

The solution is designed to scale across diverse portfolios, such as the Burger Bite branches (Hauz Khas, Saket, Janakpuri). A streamlined onboarding flow for "Add Building" and "Add Assets" ensures the platform grows with the enterprise [SOURCE_IMAGE_3, SOURCE_IMAGE_6].

Conclusion

The Klimashift dashboard successfully bridges the gap between raw utility data and actionable facility management. By moving from a "Reactive" to an "Intelligent" ecosystem, the platform empowers users not only to identify issues through AI but to resolve them—whether through automated load balancing or by purchasing hardware solutions like a "Temperature Control Panel Box" directly through the integrated Marketplace [SOURCE_IMAGE_40].

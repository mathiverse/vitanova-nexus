# VitaNova Nexus Project Overview

## Project Description

VitaNova Nexus is an AI-driven correctional intelligence platform that combines real-time behavioral monitoring with rehabilitation tools. The system uses a wearable smart band and centralized dashboard to help correctional staff ensure safety while guiding inmates toward behavioral change.

## Core Components

1. **Dashboard**: Main interface showing monitored individuals with risk levels (RED/YELLOW/GREEN)
2. **User Monitor**: Detailed view of an individual's biometrics, location, and intervention options
3. **Simulation Service**: Generates mock data for demonstration purposes

## Key Features

- **Real-time Monitoring**: Display of biometric data, location information, and risk levels
- **Intervention Tools**: Options for staff to send alerts and schedule interventions
- **Data Visualization**: Charts for stress history and status indicators

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **Charting**: Chart.js with react-chartjs-2
- **Routing**: React Router
- **Styling**: CSS Modules and MUI styling system

## Project Structure 

```/src
/components
/Dashboard
Dashboard.tsx - Main monitoring dashboard
DashboardSummary.tsx - Risk level summary cards
/Monitoring
UserMonitor.tsx - Individual inmate monitoring
BiometricChart.tsx - Charts for biometric data
InterventionPanel.tsx - Staff intervention tools
LocationTracker.tsx - Inmate location visualization
/Common
Navbar.tsx - Application navigation
RiskBadge.tsx - Risk level indicator
/services
simulationService.ts - Mock data generation
App.tsx - Main application component
main.tsx - Application entry point
/notes
project_overview.md - Project description and structure
action_plan.md - Development phases and tasks
design_guidelines.md - UI/UX standards
```

## Additional Files

The project also includes:

- **.cursorrules** - Rules for maintaining code quality
- **.cursorignore** - Files to exclude from Cursor analysis
- **package.json** - Project dependencies and scripts
- **tsconfig.json** - TypeScript configuration
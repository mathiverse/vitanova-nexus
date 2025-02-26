# VitaNova Nexus

![VitaNova Nexus](public/vitanova-logo.png)

## Overview

VitaNova Nexus is an AI-driven correctional intelligence platform that combines real-time behavioral monitoring with rehabilitation tools. The system uses a wearable smart band and centralized dashboard to help correctional staff ensure safety while guiding inmates toward behavioral change.

## 🌟 Features

- **Real-time Monitoring Dashboard**: View all monitored individuals with risk assessments
- **Biometric Tracking**: Heart rate, stress levels, and behavioral analysis
- **Risk Classification**: Automated risk level assessment (HIGH/MEDIUM/LOW)
- **Staff Intervention Tools**: Communication and intervention scheduling
- **Responsive Design**: Works on desktop, tablet and mobile devices
- **Data Visualization**: Visual representations of inmate status and trends

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/vitanova-nexus.git
   cd vitanova-nexus
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **Charting**: Chart.js with react-chartjs-2
- **Routing**: React Router
- **Styling**: CSS-in-JS with MUI styling system

## 📚 Project Documentation

For detailed information about the project, please refer to the following documentation:

- [Project Overview](notes/project_overview.md): Project description and architecture
- [Design Guidelines](notes/design_guidelines.md): UI/UX standards and styling principles
- [Development Roadmap](notes/action_plan.md): Implementation phases and progress

## 📁 Project Structure

```
/src
  /components
    /Dashboard         # Main monitoring dashboard components
    /Monitoring        # Individual inmate monitoring
    /Common            # Shared UI components
    /Reports           # Reporting and analytics
    /Settings          # User and system settings
  /services            # Data and API services
  /utils               # Utility functions
  /assets              # Static assets
  App.tsx              # Main application component
  main.tsx             # Application entry point
/notes                 # Project documentation
```

## 📊 Current Status

VitaNova Nexus is currently in active development. We have completed the core implementation and UI enhancement phases.

### Progress Overview

- ✅ Core dashboard functionality
- ✅ User monitoring interface
- ✅ Risk level visualization
- ✅ Responsive UI design
- ✅ Settings management
- ✅ Reports and analytics
- 🔄 Authentication system (in progress)
- 🔄 Advanced filtering (in progress)
- ❌ CI/CD pipeline (planned)
- ❌ Production deployment (planned)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Material-UI for the component library
- React team for the amazing framework
- Vite for the blazing fast build tool

# VitaNova Nexus Design Guidelines

## Color Palette

- **Primary**: #1976d2 (Blue) - Main actions, buttons, links
- **Secondary**: #dc004e (Pink) - Accent elements, secondary actions
- **Error**: #d32f2f (Red) - High risk, errors, alerts
- **Warning**: #f57c00 (Orange) - Medium risk, warnings
- **Success**: #388e3c (Green) - Low risk, success messages
- **Background**: #f5f5f5 (Light Gray) - Main background
- **Paper**: #ffffff (White) - Card backgrounds

## Typography

- **Font Family**: "Roboto", "Helvetica", "Arial", sans-serif
- **Headings**: 
  - H1: 2.5rem, 400 weight
  - H2: 2rem, 400 weight
  - H3: 1.75rem, 400 weight
  - H4: 1.5rem, 500 weight
  - H5: 1.25rem, 500 weight
  - H6: 1rem, 500 weight
- **Body**: 1rem, 400 weight
- **Small Text**: 0.875rem, 400 weight

## Component Styling

- **Cards/Papers**: 
  - Border radius: 8px
  - Box shadow: 0 4px 20px rgba(0,0,0,0.08)
  - Padding: 16px

- **Buttons**:
  - Primary actions: Contained buttons
  - Secondary actions: Outlined buttons
  - Text buttons for tertiary actions
  - Icon buttons for compact UI areas

- **Risk Level Indicators**:
  - High Risk: Red (#d32f2f)
  - Medium Risk: Orange (#f57c00)
  - Low Risk: Green (#388e3c)

## Layout Guidelines

- Use responsive grid layouts (MUI Grid)
- Maintain consistent spacing (8px increments)
- Use appropriate container widths for different screen sizes
- Ensure sufficient contrast for readability
- Implement mobile-first approach for responsive design

## Animation Guidelines

- Use subtle animations for state changes
- Keep animations under 300ms for UI responsiveness
- Avoid excessive animations that might distract users
- Ensure animations can be disabled for accessibility 
# Component Documentation

## Task Management Components

### TaskDetails
Displays detailed information about a task.

```typescript
interface TaskDetailsProps {
  taskId: string;
}
```

#### Subcomponents
- `TaskHeader`: Displays task title and status
- `TaskInstructions`: Shows step-by-step instructions
- `TaskResources`: Lists associated resources
- `TaskActions`: Action buttons for task management

### ResourceOverlay
Handles different types of resource previews.

#### Supported Resource Types
- Video (using ReactPlayer)
- Document (with zoom controls)
- Image (with zoom and download)
- Audio (custom player)
- Link (external URL handler)

```typescript
interface ResourceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    type: string;
    title: string;
    url: string;
  };
}
```

## Analytics Components

### Development Analytics
Components for tracking development progress:
- `ContributionProgress`
- `RepetitionChart`
- `ProgressionStats`
- `SkillProgress`

### Performance Analytics
Components for monitoring performance:
- `SalesOverview`
- `MarginAnalysis`
- `TradeMetrics`

### Communication Analytics
Components for communication metrics:
- `MessageActivity`
- `MessageTrends`
- `ChannelEngagement`

### Engagement Analytics
Components for user engagement:
- `EngagementOverview`
- `ResourceMetrics`
- `SocialEngagement`

## UI Components

### Common Components
Reusable UI components with Material-UI:

```typescript
// Button.tsx
interface ButtonProps extends MuiButtonProps {
  icon?: LucideIcon;
}

// Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

### Navigation Components
Components for application navigation:
- `Sidebar`: Main navigation menu
- `TopBar`: Top application bar
- `MobileNav`: Mobile-responsive navigation
- `FloatingTabs`: Floating navigation tabs

## Layout Components

### MainLayout
Main application layout wrapper:

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
}
```

Features:
- Responsive sidebar
- Top navigation bar
- Content area
- Mobile navigation handling
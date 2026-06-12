# OPW V2.1 - Project Overview

## Project Summary

**OPW V2.1** is a **demo/prototype** React-based document processing workspace. Users review and resolve outstanding exceptions, missing documents, field validation errors, and unclassified documents that come from a mobile scanning application.

### Architecture Overview
- **Front-end Only**: This is a UI prototype with no backend integration. All data is mock/placeholder.
- **Document Source**: Scanned documents from a mobile application → OCR extraction → field values compared against TMS (Transportation Management System) values via integration
- **Post-Approval Flow**: Documents are shipped out of the system and handled in another area of the application
- **Design**: Built using Figma Make (design-to-code generation)

---

## Technology Stack

### Core Framework
- **React**: 18.3.1 (TypeScript)
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **Package Manager**: npm (with pnpm overrides)

### UI Component Libraries
- **Radix UI**: Comprehensive unstyled component library (accordion, dialog, select, tabs, etc.)
- **Material-UI (MUI)**: 7.3.5 for icons and additional components
- **shadcn/ui**: Components built on Radix UI
- **Lucide React**: 0.487.0 - icon library

### Specialized Libraries
- **Animations**: Motion 12.23.24 (successor to Framer Motion)
- **Forms**: react-hook-form 7.55.0
- **Routing**: react-router 7.13.0
- **Drag & Drop**: react-dnd 16.0.1
- **Resizable Panels**: react-resizable-panels 2.1.7, re-resizable 6.11.2
- **Charts**: Recharts 2.15.2
- **Date Management**: date-fns 3.6.0
- **State Management**: zustand 5.0.14
- **Toast Notifications**: sonner 2.0.3
- **Theming**: next-themes 0.4.6
- **Backend Framework**: Hono 4.12.25
- **Database**: Supabase JS 2.49.8

---

## Project Structure

```
OPW V2.1/
├── src/
│   ├── app/
│   │   ├── App.tsx                          # Main application component
│   │   ├── context/
│   │   │   └── LibraryContext.tsx          # Context for component library
│   │   ├── components/                      # Reusable components
│   │   │   ├── ValidationGrid.tsx
│   │   │   ├── ApprovedContainer.tsx
│   │   │   ├── MissingDocumentsContainer.tsx
│   │   │   ├── DocumentViewerWithToolbar.tsx
│   │   │   ├── MessageCenterFab.tsx
│   │   │   ├── ComponentLibrary.tsx
│   │   │   ├── DocumentContextMenu.tsx
│   │   │   ├── DocumentPanelContainer.tsx
│   │   │   ├── ExceptionTabHeader.tsx
│   │   │   ├── BottomControlBar.tsx
│   │   │   ├── ConsolidatedExceptionsView.tsx
│   │   │   └── ui/                          # Base Radix UI components
│   │   ├── imports/                         # Generated components from Figma
│   │   │   ├── ValadationSection.tsx       # Left panel validation UI
│   │   │   ├── DocumentThumbnails.tsx
│   │   │   ├── DocumentViewerComponentDesign.tsx
│   │   │   ├── FieldExceptions.tsx
│   │   │   ├── ExceptionInputs-*.tsx
│   │   │   └── [various SVG components]
│   │   └── [Documentation files]
│   ├── styles/
│   │   ├── index.css
│   │   ├── default_theme.css
│   │   └── globals.css
│   ├── assets/
│   │   └── [PNG images]
│   └── main.tsx                             # Entry point
├── vite.config.ts
├── postcss.config.mjs
├── package.json
├── index.html
├── tailwind.config.ts (implied)
└── README.md
```

---

## Key Features & Functionality

### 1. **Document Classification System**
- Documents can be classified into types:
  - Invoice
  - Bill of Lading
  - Proof of Delivery
  - Fuel Receipt
  - Driver Log
  - Unclassified (default state)

- **Document Lifecycle**:
  - `unclassified` → `approved` or `rejected`
  - Document status: unclassified, approved, rejected
  - Auto-selection of newly classified documents

### 2. **Validation Grid / Exception Handling**
- Compares expected values against evaluated values
- Field properties:
  - `id`, `fieldName`, `expectedValue`, `evaluatedValue`
  - `isRequired`, `isResolved`, `isIgnored`, `isIgnorable`
  - `section` (document type), `additionalInfo`
  - `fieldType` (e.g., date, datetime)
  - `wasOverridden`, `wasManuallyEdited` flags

- **Range Validation**: Supports parsing ranges from additionalInfo (e.g., "Range: $1,000 - $1,300")

### 3. **Approval Workflow**
- Users can select validation fields/sections for approval
- Approval creates `ApprovedDocument` records with:
  - Section name, approval timestamp, page count, field list
- Approved fields are removed from the validation view
- Auto-selection of next available document after approval

### 4. **Missing Documents Tracking**
- Tracks missing required documents
- Can be marked as `ignored` to suppress the exception
- Marked as `isPendingRemoval` when a missing document type is classified
- Removed on save

### 5. **Document Viewer & Toolbar**
- Displays the selected document (right panel)
- Toolbar for document actions
- Supports classification and rejection workflows

### 6. **Resizable Layout**
- Left panel (validation section) is resizable (300-800px)
- Uses `re-resizable` library
- Right panel (document viewer) takes remaining space

### 7. **Component Library**
- Includes a `ComponentLibrary` view (accessible via context)
- Appears to be for UI component showcase/reference

### 8. **Toast Notifications**
- Uses `sonner` for success/info/error messages
- Positioned top-right, 3-second duration

### 9. **Drag & Drop Support**
- React-dnd integration (visible in package.json)
- Implementation details not yet reviewed

### 10. **Tabbed Interface**
- Tabs for "Exceptions" and other views
- Active tab tracking for filtering

---

## Core Data Models

### Document
```typescript
interface Document {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
}

type DocumentType = 'Invoice' | 'Bill of Lading' | 'Proof of Delivery' | 'Fuel Receipt' | 'Driver Log' | 'Unclassified';
type DocumentStatus = 'unclassified' | 'approved' | 'rejected';
```

### ValidationField
```typescript
interface ValidationField {
  id: string;
  fieldName: string;
  expectedValue: string;
  evaluatedValue: string;
  isRequired: boolean;
  isResolved: boolean;
  isIgnored: boolean;
  isIgnorable?: boolean;
  section: string;
  additionalInfo?: string;
  fieldType?: 'date' | 'datetime';
  wasOverridden?: boolean;
  wasManuallyEdited?: boolean;
}
```

### ApprovedDocument
```typescript
interface ApprovedDocument {
  section: string;
  approvedAt: Date;
  pageCount: number;
  fields: ValidationField[];
}
```

### MissingDocument
```typescript
interface MissingDocument {
  id: string;
  name: string;
  isIgnored: boolean;
  isPendingRemoval?: boolean;
}
```

---

## State Management

All state is managed at the `App.tsx` level using React's `useState`:

- `showLibrary` - Toggle component library view
- `validationData` - Array of validation fields
- `documents` - Array of documents
- `missingDocuments` - Array of missing document records
- `hasChanges` - Flag for unsaved changes
- `selectedSections` - Set of selected validation sections for approval
- `selectedDocumentId` - Currently selected document
- `activeTab` - Active tab in the interface
- `leftPanelWidth` - Width of left resizable panel
- `approvedDocuments` - Array of approved documents

---

## Key Workflows & Use Cases

### 1. **Classify an Unclassified Document**
1. User selects an unclassified document
2. Calls `handleDocumentClassification(documentId, newType)`
3. Updates document type
4. Checks if a missing document exception is resolved
5. Adds validation fields for the new document type
6. Auto-selects the newly classified document
7. Marks as having unsaved changes

### 2. **Resolve a Validation Exception**
1. User views a validation field in the grid
2. Edits `evaluatedValue` or marks as resolved/ignored
3. Field update triggers `handleFieldUpdate()`
4. Marks as having unsaved changes

### 3. **Approve Validated Documents**
1. User selects one or more sections in the validation grid
2. Clicks "Approve" button
3. Selected sections are moved to `approvedDocuments`
4. Corresponding fields are removed from `validationData`
5. Auto-selects next available document
6. Clears selected sections
7. Marks as having changes (but already approved, so ready to save)

### 4. **Save Changes**
1. User clicks "Save"
2. Removes pending-removal missing documents
3. Sets `hasChanges` to false
4. Shows success toast

### 5. **Revert Changes**
1. User clicks "Revert"
2. All state reverts to initial values
3. Shows info toast

### 6. **Reject a Document**
1. User rejects a document with a reason
2. Document status changes to `rejected`
3. Validation fields for that document are removed
4. Shows success toast

---

## Important Context

### This is a Demo/Prototype
- **No backend integration** - All data is mock/placeholder
- **No persistence** - When "Save" is clicked, changes are not stored anywhere
- **Figma Make generated** - UI components were generated via Figma Make design-to-code
- **Document flow complete elsewhere** - Post-approval handling is in a different part of the application

### Data Flow (Current / Mock)
1. **Document Scan** → Mobile app captures image of document
2. **OCR Extraction** → Values extracted from document (currently mocked)
3. **TMS Comparison** → Extracted values compared against TMS system values (currently mocked)
4. **Validation Display** → Exceptions/mismatches shown in this workspace for user review
5. **User Resolution** → User classifies documents, resolves field mismatches, handles missing docs
6. **Approval & Handoff** → Approved documents leave this system (handled elsewhere)

---

## Development Notes

### Implementation Details Worth Noting
- **Typo Alert**: Component is named `ValadationSection` (should be `ValidationSection`) - consider fixing across the codebase
- **Auto-selection Logic**: Ensures selected document ID is always valid; resets if selection becomes invalid
- **Conditional Field Addition**: Different document types (Invoice, BOL, POD, etc.) add type-specific validation fields
- **Message Center FAB**: Floating action button visible at all times - purpose unclear, likely for future help/messaging feature
- **Theme Support**: `next-themes` imported but usage unclear - may have dark/light mode partially implemented
- **Unused Dependencies**: Hono and Supabase JS are imported but not actively used (likely carried over from design template)
- **Zustand Not Used**: State management library imported but not utilized - all state handled via React `useState`

### Code Quality Observations
- **Extensive Logging**: `App.tsx` has detailed console.log statements in classification and rejection handlers (great for debugging, consider removing for production)
- **Mock Data**: Sample documents and validation fields are realistic and comprehensive
- **ResizablePanels**: Left panel resizable (300-800px) provides good UX flexibility

---

## Potential Improvements & Next Steps

### Code Quality
1. **Fix Typo**: Rename `ValadationSection` → `ValidationSection` throughout codebase
2. **Clean Up Logging**: Remove extensive console.log statements once development stabilizes
3. **Remove Unused Dependencies**: Hono, Supabase JS, Zustand not currently used - consider removing from package.json to reduce bundle size

### Feature Enhancements (If Prototype Expands)
4. **Refine Drag-and-Drop**: react-dnd is imported but not visibly used - implement if needed
5. **Toast Notifications**: Add more contextual feedback for different user actions
6. **Keyboard Shortcuts**: Add support for common workflows (e.g., Tab to next exception, Enter to approve)
7. **Undo/Redo**: Consider adding undo stack for field edits

### UX Improvements
8. **Document Viewer**: Clarify how scanned documents display (currently unclear what's shown on right panel)
9. **Missing Document Flow**: Add clarity on when users see missing document exceptions
10. **Validation Feedback**: Add visual indicators for fields that are "resolved" vs "ignored"

### Documentation
11. **Component Props Documentation**: Document all component interfaces and expected props
12. **Mock Data Generator**: Create utilities to generate different test scenarios
13. **User Workflow Guide**: Document the intended user journey through the interface

---

**Last Updated**: 2026-06-12
**Generated By**: Code Analysis

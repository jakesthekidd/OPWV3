# Document Viewer Drag & Drop Integration

## Overview

This document describes the comprehensive drag-and-drop system integrated into the document processing area. The system allows for intuitive document and page management through visual drag-and-drop interactions.

## Architecture

### Core Components

1. **DragDropContext** (`/components/DragDropContext.tsx`)
   - Provides global drag-and-drop state management
   - Validates drop operations based on business rules
   - Handles drop events and triggers API calls

2. **DocumentRail** (`/components/DocumentRail.tsx`)
   - Displays documents grouped by status (Unclassified, Approved, Rejected)
   - Supports document reordering within groups
   - Handles document reclassification via drag-and-drop

3. **DocumentAPIHandlers** (`/components/DocumentAPIHandlers.tsx`)
   - Mock API handlers for all drag-and-drop operations
   - Simulates network delays and error conditions
   - Provides optimistic update patterns

4. **FunctionalDocumentViewer** (`/components/FunctionalDocumentViewer.tsx`)
   - Displays document pages with thumbnail sidebar
   - Supports page reordering and cross-document moves
   - Manages page-level drag-and-drop operations

## Supported Operations

### 1. Document Reclassification
**Action:** Drag a document card onto a different status group header

**Rules:**
- ✅ Can drop into "Unclassified" group
- ❌ Cannot drop into "Approved" or "Rejected" groups (locked)
- Shows visual feedback (blue highlight for valid, red for invalid)

**API Call:** `reclassifyDocumentAPI(docId, newStatus, targetIndex)`

**Visual Feedback:**
- Blue border when hovering over valid drop zone
- Red background with lock icon when hovering over locked groups
- Toast notification on success/failure

### 2. Document Reordering
**Action:** Drag a document card between other documents in the same group

**Rules:**
- Only works within the "Unclassified" group
- Shows 2px blue insertion line at drop position
- Cannot reorder approved/rejected documents

**API Call:** `reorderDocumentsAPI(docId, status, targetIndex)`

### 3. Page Reordering (Within Document)
**Action:** Drag a page thumbnail to a different position in the same document

**Rules:**
- Shows blue insertion line between pages
- Animates neighboring thumbnails smoothly
- Updates page numbers automatically

**API Call:** `reorderPagesAPI(docId, fromIndex, toIndex)`

**Visual States:**
- Dragging: Page shows with 85% opacity ghost
- Drop target: 2px blue line between pages
- Placeholder: Light grey dashed border where page was

### 4. Page Movement (Cross-Document)
**Action:** Drag a page thumbnail from one document onto another document

**Rules:**
- Page merges into destination document
- Source document deleted if it becomes empty
- Page inherits destination document's metadata
- Shows blue outline on target document

**API Call:** `movePageToDocumentAPI(fromDocId, fromIndex, toDocId, toIndex)`

**Side Effects:**
- Orphan document cleanup if source becomes empty
- Page count updates in both documents
- Viewer updates immediately

### 5. Page Split (Create New Document)
**Action:** Drag a page thumbnail onto the "Unclassified" group header

**Rules:**
- Creates a new single-page document
- Runs auto-classification on the new document
- Deletes source document if it becomes empty

**API Call:** 
1. `splitPageToNewDocumentAPI(sourceDocId, pageIndex, 'unclassified')`
2. `autoClassifyDocumentAPI(newDocId)` (automatic)

**Auto-Classification:**
- Runs ML model to determine document type
- Shows confidence percentage in toast
- Updates document type in UI

## Visual Design System

### Drag Ghost
- Mini thumbnail with "Pg. X" label
- 85% opacity
- Medium shadow elevation
- Follows cursor smoothly

### Insertion Indicator
- 2px solid blue line (`#2474BB`)
- 2px corner radius
- Positioned precisely between items
- Only visible when drop is valid

### Valid Drop Highlight
- Target element: 2px blue border
- Background: Light blue (`#EEF6FB`)
- Smooth transition

### Invalid Drop Feedback
- Cursor: `not-allowed`
- Background: Light red (`#FEF2F2`)
- Toast: "Drop not allowed here"
- Lock icon for locked groups

## State Management

### DraggedItem State
```typescript
{
  type: 'doc' | 'page' | 'file'
  id: string
  documentId?: string  // For pages
  pageIndex?: number   // For pages
}
```

### DropTarget State
```typescript
{
  type: 'group' | 'doc-insert-before' | 'doc-insert-after' | 'page-strip'
  documentId?: string
  status?: 'unclassified' | 'approved' | 'rejected'
  index?: number
}
```

## API Integration

All drag-and-drop operations follow this pattern:

1. **Optimistic Update**: UI updates immediately
2. **API Call**: Request sent to backend (mocked)
3. **Success**: Toast notification, state persists
4. **Failure**: Rollback to previous state, error toast

### Mock API Responses
- 95% success rate (simulates realistic error conditions)
- Network delays: 200-1500ms (varies by operation)
- Returns metadata (e.g., orphan document deletion flags)

### Real API Integration

To connect to a real backend, replace the mock functions in `DocumentAPIHandlers.tsx`:

```typescript
// Example: Real API implementation
export const reclassifyDocumentAPI = async (
  docId: string,
  newStatus: DocumentStatus,
  targetIndex: number
): Promise<APIResponse> => {
  const response = await fetch('/api/documents/reclassify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, newStatus, targetIndex })
  });
  
  if (!response.ok) {
    return { success: false, error: await response.text() };
  }
  
  return { success: true, data: await response.json() };
};
```

## Accessibility

### Keyboard Support (Planned)
- **Space**: Start drag
- **Arrow Keys**: Navigate drop targets
- **Enter**: Confirm drop
- **Escape**: Cancel drag

### ARIA Attributes
- `role="option"` on draggable items
- `aria-grabbed="true|false"` during drag
- `role="listbox"` on drop zones
- `aria-dropeffect="move"` on valid targets

## Performance Optimizations

1. **Thumbnail Virtualization**: Only renders visible thumbnails
2. **Lazy Loading**: Thumbnails load on scroll
3. **Auto-scroll**: Smooth scrolling near edges during drag
4. **Debounced Updates**: Prevents excessive re-renders

### Auto-scroll Configuration
- Edge threshold: 48px from top/bottom
- Scroll speed: 480px per second
- Activates only when dragging near edges

## Testing & QA Checklist

- [ ] No "Drop here" tiles render (spec violation)
- [ ] Only 2px blue insertion line appears
- [ ] Dragging page onto another doc shows blue outline
- [ ] Dropping merges page and updates viewer
- [ ] Reordering shows insertion line and animates smoothly
- [ ] Approved/Rejected show not-allowed cursor and toast
- [ ] Unclassified header creates new doc and auto-classifies
- [ ] Empty source docs are deleted automatically
- [ ] Auto-scroll works smoothly near rail edges
- [ ] Drag ghosts appear correctly with page numbers
- [ ] All toasts display with correct messages

## Troubleshooting

### Issue: Drag not starting
**Solution:** Ensure `draggable={true}` on drag handle and event handlers are attached

### Issue: Drop not working
**Solution:** Check `canDrop()` rules and ensure `handleDrop()` is wired up

### Issue: State not updating
**Solution:** Verify API handlers are called and state setters are invoked

### Issue: Visual feedback missing
**Solution:** Check that `dropTarget` state is set correctly in drag handlers

## Future Enhancements

1. **Multi-select**: Drag multiple pages at once
2. **Undo/Redo**: Revert drag-and-drop operations
3. **Batch Operations**: Move multiple documents together
4. **Drag Previews**: Show document preview on hover
5. **Smart Suggestions**: ML-powered drop target suggestions
6. **Conflict Resolution**: Handle concurrent edits gracefully

## Related Files

- `/App.tsx` - Main application with DragDropProvider
- `/components/DragDropContext.tsx` - Global drag-and-drop state
- `/components/DocumentRail.tsx` - Document status groups
- `/components/FunctionalDocumentViewer.tsx` - Page thumbnails
- `/components/DocumentAPIHandlers.tsx` - API mock functions
- `/components/ValidationGrid.tsx` - Validation section integration

## Specification Reference

This implementation follows the detailed specification in the drag-and-drop JSON provided:
- Version: v1.3
- Module: `document_viewer_drag_drop`
- Policies: Merge mode, metadata inheritance, orphan cleanup
- Visuals: Drag ghost, insertion indicator, drop highlights
- Rules: SR1-SR4 (status restrictions, page inheritance, etc.)

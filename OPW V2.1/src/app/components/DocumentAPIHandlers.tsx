/**
 * Mock API handlers for document operations
 * These simulate backend API calls for drag-and-drop operations
 * In production, these would make actual HTTP requests to your backend
 */

import { DocumentStatus } from './DragDropContext';
import { toast } from 'sonner';

export interface APIResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Simulates API call to reclassify a document's status
 * @param docId - Document ID to reclassify
 * @param newStatus - New status (unclassified/approved/rejected)
 * @param targetIndex - Target position in the new status group
 */
export const reclassifyDocumentAPI = async (
  docId: string,
  newStatus: DocumentStatus,
  targetIndex: number
): Promise<APIResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simulate 95% success rate
  if (Math.random() < 0.95) {
    console.log('✅ API: Document reclassified', { docId, newStatus, targetIndex });
    return { success: true };
  } else {
    console.error('❌ API: Failed to reclassify document', { docId, newStatus });
    return { success: false, error: 'Network error' };
  }
};

/**
 * Simulates API call to reorder pages within the same document
 * @param docId - Document ID containing the page
 * @param fromIndex - Current page index
 * @param toIndex - Target page index
 */
export const reorderPagesAPI = async (
  docId: string,
  fromIndex: number,
  toIndex: number
): Promise<APIResponse> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (Math.random() < 0.95) {
    console.log('✅ API: Pages reordered', { docId, fromIndex, toIndex });
    return { success: true };
  } else {
    console.error('❌ API: Failed to reorder pages', { docId });
    return { success: false, error: 'Network error' };
  }
};

/**
 * Simulates API call to move a page from one document to another
 * @param fromDocId - Source document ID
 * @param fromIndex - Page index in source document
 * @param toDocId - Target document ID
 * @param toIndex - Target page index in destination document
 */
export const movePageToDocumentAPI = async (
  fromDocId: string,
  fromIndex: number,
  toDocId: string,
  toIndex: number
): Promise<APIResponse<{ orphanDocDeleted?: boolean }>> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (Math.random() < 0.95) {
    // Check if source document would be empty (simulate)
    const orphanDocDeleted = Math.random() > 0.7; // Sometimes the source doc becomes empty
    
    console.log('✅ API: Page moved to document', { 
      fromDocId, 
      fromIndex, 
      toDocId, 
      toIndex,
      orphanDocDeleted 
    });
    
    return { 
      success: true, 
      data: { orphanDocDeleted } 
    };
  } else {
    console.error('❌ API: Failed to move page', { fromDocId, toDocId });
    return { success: false, error: 'Network error' };
  }
};

/**
 * Simulates API call to split a page into a new document
 * @param sourceDocId - Source document ID
 * @param pageIndex - Page index to split
 * @param newStatus - Status for the new document
 */
export const splitPageToNewDocumentAPI = async (
  sourceDocId: string,
  pageIndex: number,
  newStatus: DocumentStatus
): Promise<APIResponse<{ newDocId: string; orphanDocDeleted?: boolean }>> => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  if (Math.random() < 0.95) {
    const newDocId = `doc-split-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const orphanDocDeleted = Math.random() > 0.8; // Sometimes the source doc becomes empty
    
    console.log('✅ API: Page split into new document', { 
      sourceDocId, 
      pageIndex, 
      newStatus,
      newDocId,
      orphanDocDeleted 
    });
    
    return { 
      success: true, 
      data: { newDocId, orphanDocDeleted } 
    };
  } else {
    console.error('❌ API: Failed to split page', { sourceDocId, pageIndex });
    return { success: false, error: 'Network error' };
  }
};

/**
 * Simulates API call to replace viewer document
 * @param viewerDocId - Current document in viewer
 * @param sourceDocId - Document to load into viewer
 */
export const replaceViewerDocumentAPI = async (
  viewerDocId: string,
  sourceDocId: string
): Promise<APIResponse> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  if (Math.random() < 0.95) {
    console.log('✅ API: Viewer document replaced', { viewerDocId, sourceDocId });
    return { success: true };
  } else {
    console.error('❌ API: Failed to replace viewer document');
    return { success: false, error: 'Network error' };
  }
};

/**
 * Simulates API call to upload and replace document
 * @param viewerDocId - Current document in viewer
 * @param file - File to upload
 */
export const uploadAndReplaceAPI = async (
  viewerDocId: string,
  file: File
): Promise<APIResponse<{ newDocId: string }>> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Longer delay for upload
  
  if (Math.random() < 0.95) {
    const newDocId = `doc-upload-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    console.log('✅ API: File uploaded and replaced', { 
      viewerDocId, 
      fileName: file.name,
      fileSize: file.size,
      newDocId 
    });
    
    return { 
      success: true, 
      data: { newDocId } 
    };
  } else {
    console.error('❌ API: Failed to upload file', { fileName: file.name });
    return { success: false, error: 'Upload failed' };
  }
};

/**
 * Simulates API call to auto-classify a document
 * Used when a new document is created from a split page
 * @param docId - Document ID to classify
 */
export const autoClassifyDocumentAPI = async (
  docId: string
): Promise<APIResponse<{ 
  documentType: string; 
  confidence: number;
  metadata: Record<string, any> 
}>> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (Math.random() < 0.90) {
    const documentTypes = ['Invoice', 'Bill of Lading', 'Proof of Delivery', 'Fuel Receipt', 'Driver Log'];
    const documentType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
    const confidence = 0.7 + Math.random() * 0.25; // 70-95% confidence
    
    console.log('✅ API: Document auto-classified', { 
      docId, 
      documentType, 
      confidence: `${(confidence * 100).toFixed(1)}%` 
    });
    
    return { 
      success: true, 
      data: { 
        documentType, 
        confidence,
        metadata: {
          classifiedAt: new Date().toISOString(),
          method: 'ML_MODEL_v2.3'
        }
      } 
    };
  } else {
    console.error('❌ API: Failed to auto-classify document', { docId });
    return { success: false, error: 'Classification failed' };
  }
};

/**
 * Simulates API call to reorder documents within a status group
 * @param docId - Document ID to move
 * @param status - Status group (must stay the same)
 * @param targetIndex - Target position in the group
 */
export const reorderDocumentsAPI = async (
  docId: string,
  status: DocumentStatus,
  targetIndex: number
): Promise<APIResponse> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (Math.random() < 0.95) {
    console.log('✅ API: Documents reordered', { docId, status, targetIndex });
    return { success: true };
  } else {
    console.error('❌ API: Failed to reorder documents');
    return { success: false, error: 'Network error' };
  }
};

/**
 * Helper to handle API errors with user-friendly toast messages
 */
export const handleAPIError = (error: string, operation: string) => {
  console.error(`API Error during ${operation}:`, error);
  toast.error(`Failed to ${operation}. Please try again.`);
};

/**
 * Helper to show optimistic update with rollback on error
 */
export const withOptimisticUpdate = async <T,>(
  optimisticUpdate: () => void,
  apiCall: () => Promise<APIResponse<T>>,
  rollback: () => void,
  successMessage?: string
): Promise<boolean> => {
  // Apply optimistic update immediately
  optimisticUpdate();
  
  try {
    // Make the API call
    const response = await apiCall();
    
    if (response.success) {
      if (successMessage) {
        toast.success(successMessage);
      }
      return true;
    } else {
      // Rollback on API error
      rollback();
      handleAPIError(response.error || 'Unknown error', 'complete operation');
      return false;
    }
  } catch (error) {
    // Rollback on network error
    rollback();
    handleAPIError(String(error), 'complete operation');
    return false;
  }
};

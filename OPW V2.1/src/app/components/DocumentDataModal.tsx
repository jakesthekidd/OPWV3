import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Document } from "./DocumentViewerStore";

interface DocumentDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

export default function DocumentDataModal({ isOpen, onClose, document }: DocumentDataModalProps) {
  if (!document) return null;

  const handleCopyJSON = () => {
    const jsonData = JSON.stringify(document, null, 2);
    navigator.clipboard.writeText(jsonData);
    toast.success("Document data copied to clipboard");
  };

  const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(document, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.fileName}.metadata.json`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Metadata downloaded");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Document Data</DialogTitle>
          <DialogDescription>
            Metadata and extracted information for {document.fileName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* File Information */}
            <div>
              <h3 className="mb-3">File Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[#8d9aae] text-[11px]">File Name</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.fileName}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">File Size</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{formatFileSize(document.fileSize)}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Document Type</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1 capitalize">{document.documentType.replace('_', ' ')}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Status</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.status}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Total Pages</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.pages.length}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Source Information */}
            <div>
              <h3 className="mb-3">Source Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Upload Date</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{formatDate(document.uploadDate)}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Source</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.metadata.source}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Processing Information */}
            <div>
              <h3 className="mb-3">Processing Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Processed Date</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{formatDate(document.processedDate)}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Processor</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.metadata.processor}</div>
                </div>
                <div>
                  <div className="text-[#8d9aae] text-[11px]">Version</div>
                  <div className="text-[#3d3d3d] text-[12px] mt-1">{document.metadata.version}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Extracted Fields Table */}
            <div>
              <h3 className="mb-3">Extracted Fields</h3>
              {document.extractedFields.length > 0 ? (
                <div className="border border-[#e2e6eb] rounded-[4px] overflow-hidden">
                  <div className="bg-[#f7f8f9] border-b border-[#e2e6eb] grid grid-cols-5 gap-2 px-3 py-2">
                    <div className="text-[#123b60] text-[11px]">Field Name</div>
                    <div className="text-[#123b60] text-[11px]">Value</div>
                    <div className="text-[#123b60] text-[11px]">Confidence</div>
                    <div className="text-[#123b60] text-[11px]">Page</div>
                    <div className="text-[#123b60] text-[11px]">BBox</div>
                  </div>
                  {document.extractedFields.map((field, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-5 gap-2 px-3 py-2 ${
                        idx !== document.extractedFields.length - 1 ? 'border-b border-[#e2e6eb]' : ''
                      }`}
                    >
                      <div className="text-[#3d3d3d] text-[11px]">{field.fieldName}</div>
                      <div className="text-[#3d3d3d] text-[11px]">{field.value}</div>
                      <div className="text-[#3d3d3d] text-[11px]">{(field.confidence * 100).toFixed(0)}%</div>
                      <div className="text-[#3d3d3d] text-[11px]">Page {field.pageRef}</div>
                      <div className="text-[#8d9aae] text-[10px]">
                        {field.bboxRef ? 
                          `${field.bboxRef.x},${field.bboxRef.y}` : 
                          '-'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-[#8d9aae] text-[12px]">
                  No extracted fields available
                </div>
              )}
            </div>

            <Separator />

            {/* Raw JSON */}
            <div>
              <h3 className="mb-3">Raw JSON</h3>
              <div className="bg-[#f7f8f9] border border-[#e2e6eb] rounded-[4px] p-3">
                <pre className="text-[10px] text-[#3d3d3d] overflow-x-auto">
                  {JSON.stringify(document, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyJSON}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadJSON}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
          <Button variant="default" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

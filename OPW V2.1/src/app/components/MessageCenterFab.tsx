import { useState } from 'react';
import NotificationFabComponent from '../imports/NotificationFabComponent';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

export function MessageCenterFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[24px] right-[24px] size-[38px] cursor-pointer bg-transparent border-none p-0 z-50 hover:scale-105 transition-transform"
        aria-label="Open Message Center"
      >
        <div className="scale-[0.8] origin-center">
          <NotificationFabComponent />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogTitle>Message Center</DialogTitle>
          <DialogDescription>
            This feature is currently under development.
          </DialogDescription>
          <div className="flex items-center justify-center py-8">
            <p className="text-[24px] text-[#0e2e4b]">Coming Soon</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

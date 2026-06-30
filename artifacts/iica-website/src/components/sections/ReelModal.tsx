import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Instagram } from 'lucide-react';
import { useTheme } from '@/lib/themeContext';
import { extractInstagramCode } from '@/lib/googleSheets';

interface ReelModalProps {
  reelCode: string;
  name: string;
  children: React.ReactNode;
}

export function ReelModal({ reelCode, name, children }: ReelModalProps) {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[420px] p-0 gap-0 border overflow-hidden ${
          theme === 'light'
            ? 'bg-white border-border'
            : 'bg-[#0a0a0a] border-white/10'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Instagram-style header */}
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${
          theme === 'light' ? 'border-border' : 'border-white/10'
        }`}>
          <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${
              theme === 'light' ? 'text-foreground' : 'text-white'
            }`}>{name}</p>
            <p className={`text-xs ${
              theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'
            }`}>IICA Artist</p>
          </div>
          <a
            href={`https://www.instagram.com/reel/${extractInstagramCode(reelCode)}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              theme === 'light'
                ? 'bg-[#833AB4]/10 text-[#833AB4] hover:bg-[#833AB4]/20 border border-[#833AB4]/20'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            View Profile
          </a>
        </div>

        {/* Reel video embed */}
        <div className={`w-full ${
          theme === 'light' ? 'bg-black' : 'bg-black'
        }`}>
          <iframe
            src={`https://www.instagram.com/reel/${extractInstagramCode(reelCode)}/embed/`}
            className="w-full aspect-[9/16] max-h-[65vh]"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            allow="autoplay"
          />
        </div>

        {/* Bottom bar with actions */}
        <div className={`flex items-center justify-between px-4 py-3 border-t ${
          theme === 'light' ? 'border-border' : 'border-white/10'
        }`}>
          <div className="flex items-center gap-1 text-xs">
            <span className={theme === 'light' ? 'text-muted-foreground' : 'text-gray-500'}>
              via Instagram
            </span>
          </div>
          <a
            href={`https://www.instagram.com/reel/${extractInstagramCode(reelCode)}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs flex items-center gap-1 transition-colors ${
              theme === 'light'
                ? 'text-muted-foreground hover:text-foreground'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-3 h-3" />
            Open in Instagram
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useConfiguratorStore } from '@/lib/store';
import { ViewMode, viewModes } from '@shared/schema';
import { 
  Undo2, 
  Redo2, 
  HelpCircle, 
  Save, 
  Share2,
  Box,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CircleDot,
} from 'lucide-react';

const viewIcons: Record<ViewMode, typeof Box> = {
  '3D': Box,
  '+Y': ArrowUp,
  '-Y': ArrowDown,
  '+X': ArrowRight,
  '-X': ArrowLeft,
  '-Z': CircleDot,
};

const viewLabels: Record<ViewMode, string> = {
  '3D': '3D Perspective',
  '+Y': 'Top View',
  '-Y': 'Bottom View',
  '+X': 'Right Side',
  '-X': 'Left Side',
  '-Z': 'Front View',
};

export function TopControlBar() {
  const { viewMode, setViewMode, undo, redo, history, historyIndex } = useConfiguratorStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="h-12 bg-card border-b flex items-center justify-between px-4 gap-4">
      {/* Left - View Mode Buttons */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-2">View:</span>
        {viewModes.map((mode) => {
          const Icon = viewIcons[mode];
          return (
            <Tooltip key={mode}>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === mode ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode(mode)}
                  className="toggle-elevate"
                  data-state={viewMode === mode ? 'on' : 'off'}
                  data-testid={`button-view-${mode.replace('+', 'plus').replace('-', 'minus')}`}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{viewLabels[mode]}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Right - Action Buttons */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={!canUndo}
              data-testid="button-undo"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={redo}
              disabled={!canRedo}
              data-testid="button-redo"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-2" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-testid="button-help"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Help</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-testid="button-save"
            >
              <Save className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Save Configuration</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-testid="button-share"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

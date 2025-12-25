import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useConfiguratorStore } from '@/lib/store';
import { ChevronDown, Eye, Layers } from 'lucide-react';
import { useState } from 'react';

const visibilityOptions = [
  { key: 'showPanels', label: 'Panels' },
  { key: 'showSolidWalls', label: 'Solid Walls' },
  { key: 'showOpenings', label: 'Openings' },
  { key: 'showFrames', label: 'Frames' },
  { key: 'showPurlins', label: 'Purlins' },
  { key: 'showGirts', label: 'Girts' },
  { key: 'showFlashing', label: 'Flashing' },
  { key: 'showAccessories', label: 'Accessories' },
  { key: 'showBasePlate', label: 'Base Plate' },
  { key: 'showDimensions', label: 'Dimensions' },
  { key: 'showButtons', label: 'Buttons' },
] as const;

export function RightSidebar() {
  const { visualization, setVisualization } = useConfiguratorStore();
  const [visualOpen, setVisualOpen] = useState(true);
  const [partsOpen, setPartsOpen] = useState(true);

  return (
    <aside className="w-80 bg-sidebar border-l flex flex-col h-full">
      <div className="p-4 border-b bg-sidebar">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Display Options
        </h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {/* Visualization Section */}
          <Collapsible open={visualOpen} onOpenChange={setVisualOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-md hover-elevate">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Visualization</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-muted-foreground transition-transform ${visualOpen ? 'rotate-180' : ''}`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3">
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edges" className="text-sm cursor-pointer">Edges</Label>
                  <Switch
                    id="edges"
                    checked={visualization.showEdges}
                    onCheckedChange={(checked) => setVisualization({ showEdges: checked })}
                    data-testid="switch-edges"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="faces" className="text-sm cursor-pointer">Faces</Label>
                  <Switch
                    id="faces"
                    checked={visualization.showFaces}
                    onCheckedChange={(checked) => setVisualization({ showFaces: checked })}
                    data-testid="switch-faces"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-2" />

          {/* Main Parts Section */}
          <Collapsible open={partsOpen} onOpenChange={setPartsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-md hover-elevate">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Main Parts</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-muted-foreground transition-transform ${partsOpen ? 'rotate-180' : ''}`} 
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3">
              <div className="grid grid-cols-2 gap-3 pt-2">
                {visibilityOptions.map((option) => (
                  <div key={option.key} className="flex items-center gap-2">
                    <Checkbox
                      id={option.key}
                      checked={visualization[option.key as keyof typeof visualization] as boolean}
                      onCheckedChange={(checked) => 
                        setVisualization({ [option.key]: checked === true })
                      }
                      data-testid={`checkbox-${option.key}`}
                    />
                    <Label 
                      htmlFor={option.key} 
                      className="text-xs cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      {/* Quick Stats */}
      <div className="border-t p-4 bg-sidebar">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Quick View
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 rounded-md p-2">
            <span className="text-muted-foreground block">Visible</span>
            <span className="font-medium">
              {Object.values(visualization).filter(Boolean).length} / {Object.keys(visualization).length}
            </span>
          </div>
          <div className="bg-muted/50 rounded-md p-2">
            <span className="text-muted-foreground block">Mode</span>
            <span className="font-medium">
              {visualization.showFaces ? 'Solid' : 'Wireframe'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

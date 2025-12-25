import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RAL_COLORS, RalColor } from '@shared/schema';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  
  const selectedColor = RAL_COLORS.find(c => c.code === value || c.name === value) || RAL_COLORS[0];

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-10 px-3"
            data-testid={`color-picker-${label?.toLowerCase().replace(/\s+/g, '-') || 'color'}`}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-4 rounded-sm border border-border"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="text-sm truncate">{selectedColor.name || selectedColor.code}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3" align="start">
          <div className="grid grid-cols-4 gap-2">
            {RAL_COLORS.map((color) => (
              <button
                key={color.code}
                onClick={() => {
                  onChange(color.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-md transition-all hover-elevate",
                  value === color.code && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                title={`${color.code} - ${color.name}`}
                data-testid={`color-option-${color.code.replace(/\s+/g, '-')}`}
              >
                <div 
                  className="w-8 h-6 rounded-sm border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {color.code.replace('RAL ', '')}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ColorSwatchProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ColorSwatch({ color, size = 'md', className }: ColorSwatchProps) {
  const colorData = RAL_COLORS.find(c => c.code === color || c.name === color);
  const hex = colorData?.hex || color;
  
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-10 h-6',
  };

  return (
    <div 
      className={cn(
        "rounded-sm border border-border",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: hex }}
      title={colorData?.name || color}
    />
  );
}

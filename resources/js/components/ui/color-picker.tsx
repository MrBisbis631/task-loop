import React, { useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import Color from "color";
import { Badge } from "./badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useDebounceValue } from "usehooks-ts";

type Props = {
  color: string;
  onSetColor: (color: string) => void;
  className?: string;
};

export default function ColorPicker({ color, onSetColor, className }: Props) {
  const [history, setHistory] = React.useState<string[]>([]);
  const [debounceColor, _] = useDebounceValue(color, 200);

  useEffect(() => {
    if (color && !history.includes(color)) {
      setHistory([color, ...history].slice(0, 9));
    }
  }, [debounceColor]);

  const colorColor = color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ? Color(color) : Color("#ffffff");

  const variants = [
    { label: "Lighten 0.1", value: colorColor.lighten(0.1).hex() },
    { label: "Lighten 0.3", value: colorColor.lighten(0.3).hex() },
    { label: "Darken 0.1", value: colorColor.darken(0.1).hex() },
    { label: "Darken 0.3", value: colorColor.darken(0.3).hex() },
    { label: "Saturate 0.1", value: colorColor.saturate(0.1).hex() },
    { label: "Saturate 0.2", value: colorColor.saturate(0.2).hex() },
    { label: "Desaturate 0.1", value: colorColor.desaturate(0.1).hex() },
    { label: "Desaturate 0.2", value: colorColor.desaturate(0.2).hex() },
    { label: "Rotate 15", value: colorColor.rotate(15).hex() },
    { label: "Rotate 30", value: colorColor.rotate(30).hex() },
    { label: "Rotate 45", value: colorColor.rotate(45).hex() },
    { label: "Rotate 60", value: colorColor.rotate(60).hex() },
    { label: "Rotate 90", value: colorColor.rotate(90).hex() },
    { label: "Rotate 120", value: colorColor.rotate(120).hex() },
    { label: "Rotate 180", value: colorColor.rotate(180).hex() },
    { label: "Grayscale", value: colorColor.grayscale().hex() },
    { label: "Opaquer 0.5", value: colorColor.opaquer(0.5).hex() },
    { label: "Fade 0.5", value: colorColor.fade(0.5).hex() },
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} className={cn("w-[135px] justify-start text-left font-normal", !color && "text-muted-foreground", className)}>
          <div className="w-full flex items-center gap-2">
            {color ? <div className="h-4 w-4 rounded !bg-center !bg-cover transition-all" style={{ background: color }}></div> : <Paintbrush className="h-4 w-4" />}
            <div className="truncate flex-1">{color ? color : "Pick a color"}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto space-y-2">
        <Input id="custom" value={color} className={cn("col-span-2 w-full", color.startsWith("#ffffff") ? "shadow-sm" : "")} onChange={e => onSetColor(e.currentTarget.value)} />
        <HexColorPicker color={color} onChange={onSetColor} />
        <Badge className={cn(colorColor.isLight() ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-gray-200")}>{colorColor.isDark() ? "Dark" : "Light"}</Badge>

        <div className="grid grid-cols-9 content-stretch gap-1 max-w-[200px]">
          {history.map((s, i) => (
            <div key={i} className="size-5 rounded shadow-sm cursor-pointer active:scale-105" style={{ background: s }} onClick={() => onSetColor(s)}></div>
          ))}
        </div>

        <div className="grid grid-cols-9 content-stretch gap-1 max-w-[200px]">
          {variants.map((s, i) => (
            <Tooltip key={i}>
              <TooltipTrigger>
                <div className="size-5 rounded shadow-sm cursor-pointer active:scale-105" style={{ background: s.value }} onClick={() => onSetColor(s.value)}></div>
              </TooltipTrigger>
              <TooltipContent>{s.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 max-w-[200px]">
          <Badge variant={"outline"}>
            <a href="https://www.w3.org/TR/WCAG20/#relativeluminancedef" className="" target="_blank" rel="noreferrer">
              WCAG luminosity {colorColor.luminosity().toFixed(2)}
            </a>
          </Badge>
          <Badge variant={"outline"}>
            <a href="https://www.w3.org/TR/WCAG20/#contrast-ratiodef" className="" target="_blank" rel="noreferrer">
              White contrast ratio {colorColor.contrast(Color("#fff")).toFixed(2)}
            </a>
          </Badge>
          <Badge variant={"outline"}>
            <a href="https://www.w3.org/TR/WCAG20/#contrast-ratiodef" className="" target="_blank" rel="noreferrer">
              Black contrast ratio {colorColor.contrast(Color("#000")).toFixed(2)}
            </a>
          </Badge>
        </div>
      </PopoverContent>
    </Popover>
  );
}

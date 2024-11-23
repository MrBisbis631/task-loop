import { useToast } from "@/hooks/use-toast";
import React, { useId } from "react";
import { Button } from "./ui/button";
import { ClipboardCopyIcon, Link1Icon } from "@radix-ui/react-icons";
import { Link } from "@inertiajs/react";

export type ModelDetailsProps = {
  title?: string;
  items: {
    label: string;
    value: string;
    link?: {
      href: string;
      isInner: boolean;
      onBlank?: boolean;
    };
  }[];
};

export default function ModelDetails({ title, items }: ModelDetailsProps) {
  const id = useId();
  const { toast } = useToast();

  const copyAction = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      description: "The value has been copied to your clipboard",
    });
  };

  return (
    <div>
      <h2 className="text-2xl mb-1">{title ? title : "Details"}</h2>
      <div className="flex flex-wrap gap-y-1">
        <div className="w-full grid grid-cols-[max-content_max-content_1fr] items-center">
          {items.map(({ label, value, link }, index) =>
            value ? (
              <>
                <div className="h-8 truncate w-fit flex items-center [&:nth-child(2n+1)]:bg-muted" key={`copy-${index}-${id}`}>
                  <span className="pl-1">&bull;</span>
                  <Button onClick={() => copyAction(value)} size={"icon"} variant={"ghost"} className="size-6">
                    <ClipboardCopyIcon />
                  </Button>
                </div>
                <span className="block p-1 pr-4 [&:nth-child(2n+2)]:bg-muted truncate" key={`title-${index}-${id}`}>
                  {label}
                </span>
                <div className="p-1 [&:nth-child(2n+3)]:bg-muted truncate flex gap-1 items-center" key={`value-${index}-${id}`}>
                  {link ? (
                    <>
                      <Link1Icon />
                      {link.isInner ? (
                        <Link href={link.href} className="hover:underline focus:underline" target={link.onBlank ? "_blank" : ""}>
                          {value}
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:underline focus:underline" target={link.onBlank ? "_blank" : ""}>
                          {value}
                        </a>
                      )}
                    </>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              </>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

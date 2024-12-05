import React, { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@inertiajs/react";
import { ClipboardIcon, Link1Icon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type CardDataProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  items: {
    label: string;
    value: string;
    link?: {
      href: string;
      isInner: boolean;
      onBlank?: boolean;
    };
  }[];
  actions?: React.ReactNode;
};

export default function DataCard({ description, title, items, actions }: CardDataProps) {
  const id = useId();
  const { toast } = useToast();

  const copyAction = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      description: "The value has been copied to your clipboard",
      duration: 1000,
    });
  };

  return (
    <Card className="max-w-md flex-auto flex flex-col justify-between">
      <div className="">
        {/* card title & description */}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        {/* card content with copy action */}
        <CardContent className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-x-1 gap-y-0.5">
          {items
            .filter(item => item.value)
            .map(({ label, value, link }, index) => (
              <>
                <Button key={`${id}-${index}-title`} type="button" variant={"ghost"} size={"icon"} className="size-6" onClick={() => copyAction(value)}>
                  <ClipboardIcon width={"14"} />
                </Button>

                <div key={`${id}-${index}-value`} className="">
                  {/* label with link icon if link exists */}
                  <span className="font-semibold text-sm relative">
                    {label}
                    {link ? <Link1Icon width={12} className="absolute -top-1 right-0 translate-x-full rotate-45" /> : null}
                  </span>

                  {/* tooltip with value & link if there is */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="max-w-40 text-sm flex gap-1 items-center">
                          {link ? (
                            link.isInner ? (
                              <Link href={link.href} className="hover:underline focus:underline truncate" target={link.onBlank ? "_blank" : ""}>
                                {value}
                              </Link>
                            ) : (
                              <a href={link.href} className="hover:underline focus:underline truncate" target={link.onBlank ? "_blank" : ""}>
                                {value}
                              </a>
                            )
                          ) : (
                            <span className="truncate">{value}</span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{value}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </>
            ))}
        </CardContent>
      </div>

      {/* actions */}
      {actions ? <CardFooter>{actions}</CardFooter> : null}
    </Card>
  );
}

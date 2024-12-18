import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ClipboardIcon } from "lucide-react";

export function Cell({ children, value, disabled = false }: React.PropsWithChildren<{ value: string; disabled?: boolean }>) {
  const { toast } = useToast();

  const copyValue = async () => {
    await navigator.clipboard.writeText(value);
    toast({
      description: "Copied to clipboard!",
      duration: 500,
    });
  };

  if (disabled) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent align="start" className="flex items-center gap-1">
        <Button onClick={copyValue} variant={"ghost"} size={"icon"} className="size-5">
          <ClipboardIcon width={14} />
        </Button>
        <div className="">{value}</div>
      </TooltipContent>
    </Tooltip>
  );
}

function LinkCell({ children, value }: React.PropsWithChildren<{ value: string }>) {
  return (
    <Cell value={value}>
      <Button variant={"link"} className="block truncate max-w-56 px-0 mx-0" asChild>
        {children}
      </Button>
    </Cell>
  );
}

export function TextCell({ children }: PropsWithChildren) {
  return (
    <Cell value={children as string}>
      <span className="block truncate max-w-56">{children}</span>
    </Cell>
  );
}
export function ExternalLinkCell({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <LinkCell value={href}>
      <a href={href} className="">
        {children}
      </a>
    </LinkCell>
  );
}

export function InternalLinkCell({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <LinkCell value={href}>
      <Link href={href} className="">
        {children}
      </Link>
    </LinkCell>
  );
}

export function EmailCell({ email }: { email: string }) {
  return (
    <LinkCell value={email}>
      <a href={`mailto:${email}`}>{email}</a>
    </LinkCell>
  );
}

export function LocationCell({ location }: PropsWithChildren<{ location: string }>) {
  return (
    <LinkCell value={location}>
      <a href={`https://www.google.com/maps/search/?api=1&query=${location}`}>{location}</a>
    </LinkCell>
  );
}

export function PhoneCell({ phone_rfc3966, children }: PropsWithChildren<{ phone_rfc3966: string }>) {
  return (
    <LinkCell value={children as string}>
      <a href={phone_rfc3966}>{children}</a>
    </LinkCell>
  );
}

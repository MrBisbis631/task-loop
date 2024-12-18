import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { Link1Icon } from "@radix-ui/react-icons";
import { Cell } from "@/components/table/cell";

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
  return (
    <Card className="">
      {/* card title & description */}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* card content with copy action */}
      <CardContent className="space-y-3">
        {items.map(({ label, value, link }) => (
          <div key={label} className="">
            <Cell value={value} disabled={!value}>
              {link && value ? (
                <div className="">
                  <div className="font-semibold text-sm relative max-w-max">
                    <span className="">{label}</span>
                    <Link1Icon width={12} className="absolute -top-1 right-0 translate-x-full rotate-45" />
                  </div>
                  {link.isInner ? (
                    <Link href={link.href} className="hover:underline focus:underline block truncate" target={link.onBlank ? "_blank" : ""}>
                      {value}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:underline focus:underline block truncate" target={link.onBlank ? "_blank" : ""}>
                      {value}
                    </a>
                  )}
                </div>
              ) : (
                <div className="">
                  <div className="font-semibold text-sm relative max-w-max">{label}</div>
                  <div className="truncate">{value || "Missing info - add in  the form below."}</div>
                </div>
              )}
            </Cell>
          </div>
        ))}
      </CardContent>

      {/* actions */}
      {actions ? (
        <CardFooter>
          <CardFooter>{actions}</CardFooter>
        </CardFooter>
      ) : null}
    </Card>
  );
}

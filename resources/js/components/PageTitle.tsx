import React from "react";

type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
};

export default function PageTitle({ title, description }: Props) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description ? <p className="text-slate-600 text-sm">{description}</p> : null}
    </div>
  );
}

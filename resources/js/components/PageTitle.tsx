import React from "react";

export type Props = {
  pageTitle: React.ReactNode;
  pageDescription?: React.ReactNode;
};

export default function PageTitle({ pageTitle, pageDescription }: Props) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold capitalize">{pageTitle}</h1>
      {pageDescription ? <p className="text-slate-600 text-sm">{pageDescription}</p> : null}
    </div>
  );
}

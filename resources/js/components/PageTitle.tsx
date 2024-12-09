import React from "react";

export type Props = {
  pageTitle?: React.ReactNode;
  pageDescription?: React.ReactNode;
};

export default function PageTitle({ pageTitle, pageDescription }: Props) {
  if (!pageTitle && !pageDescription) {
    return null;
  }

  return (
    <div className="mb-4">
      {pageTitle ? <h1 className="text-2xl font-semibold capitalize">{pageTitle}</h1> : null}
      {pageDescription ? <p className="text-slate-600 text-sm">{pageDescription}</p> : null}
    </div>
  );
}

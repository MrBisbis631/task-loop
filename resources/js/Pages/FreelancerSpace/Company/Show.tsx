import React from "react";
import DetailsCard from "@/components/DataCard";
import UpdateGeneralDetailsCompanyForm from "./UpdateGeneralDetailsCompanyForm";
import UpdateContactDetailsCompanyForm from "./UpdateContactDetailsCompanyForm";
import UpdateTaxDetailsCompanyForm from "./UpdateTaxDetailsCompanyForm";
import { googleMapsLink } from "@/lib/utils";
import { getName } from "i18n-iso-countries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  company: App.Http.Resources.CompanyResource;
  companyTypeEnumAsArray: {
    value: string;
    description: string;
    readable: string;
  }[];
};

export default function Show({ company, companyTypeEnumAsArray }: Props) {
  return (
    <div className="">
      <div className="max-w-2xl">
        <h1 className="text-2xl mb-2">Details & Info</h1>
        <div className="">
          <Tabs defaultValue="general-details" className="flex flex-col">
            <TabsList>
              <TabsTrigger value="general-details" className="flex-1">
                General Details
              </TabsTrigger>
              <TabsTrigger value="contact-details" className="flex-1">
                Contact details
              </TabsTrigger>
              <TabsTrigger value="tax-details" className="flex-1">
                Tax details
              </TabsTrigger>
              <TabsTrigger value="payment-details" className="flex-1">
                Payment details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general-details">
              <DetailsCard title="General details" description="Company general details" items={getGeneralDetails(company)} actions={<UpdateGeneralDetailsCompanyForm company={company} />} />
            </TabsContent>
            <TabsContent value="contact-details">
              <DetailsCard title="Contact details" description="Company contact and addresses details" items={getContactDetails(company)} actions={<UpdateContactDetailsCompanyForm company={company} />} />
            </TabsContent>
            <TabsContent value="tax-details">
              <DetailsCard title="Tax details" description="Company taxing details" items={getTaxDetails(company)} actions={<UpdateTaxDetailsCompanyForm company={company} companyTypeEnumAsArray={companyTypeEnumAsArray} />} />
            </TabsContent>
            <TabsContent value="payment-details">
              <div className="">
                {/* TODO implement */}
                Coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function getContactDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Email",
      value: company.email,
      link: {
        href: `mailto:${company.email}`,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "Address",
      value: company.address_1,
      link: {
        href: googleMapsLink(`${getName(company.country, "en") || ""},${company.state},${company.address_1}`),
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Phone",
      value: company.phone_1_readable,
      link: {
        href: company.phone_1_rfc3966,
        isInner: false,
        onBlank: false,
      },
    },
    {
      label: "State\\District",
      value: company.state,
    },
    {
      label: "Country",
      value: getName(company.country, "en") || "",
    },
  ];
}

function getTaxDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Tax identification number",
      value: company.tax_identification_number,
    },
    {
      label: "VAT number",
      value: company.vat_number,
    },
    {
      label: "Tax region country",
      value: company.tax_region_country,
    },
    {
      label: "Tax filing category",
      value: company.tax_filing_category,
    },
    {
      label: "Tax documentation",
      value: company.tax_documentation_url,
      link: {
        href: company.tax_documentation_url,
        isInner: false,
        onBlank: true,
      },
    },
  ];
}

function getGeneralDetails(company: App.Http.Resources.CompanyResource) {
  return [
    {
      label: "Company name",
      value: company.name,
    },
    {
      label: "Activity status",
      value: company.activity_status,
    },
    {
      label: "Company type",
      value: company.company_type_readable,
    },
    {
      label: "Website",
      value: company.website_url,
      link: {
        href: company.website_url,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "LinkedIn",
      value: company.linkedin_url,
      link: {
        href: company.linkedin_url,
        isInner: false,
        onBlank: true,
      },
    },
    {
      label: "Instagram",
      value: company.instagram_url,
      link: {
        href: company.instagram_url,
        isInner: false,
        onBlank: true,
      },
    },
  ];
}

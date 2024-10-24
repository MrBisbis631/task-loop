declare namespace App.Enums {
export type CompanyActivityStatusEnum = 'active' | 'inactive';
export type CompanyTypeEnum = 'Sole Proprietorship' | 'Partnership' | 'Limited Liability Company (LLC)' | 'Corporation (C Corp)' | 'S Corporation' | 'Nonprofit Organization' | 'Cooperative (Co-op)';
export type ExternalServiceEnum = 'github';
export type PaymentMethodEnum = 'credit_card' | 'pay_pal' | 'bank_transfer';
export type PaymentTermEnum = 'immediate' | 'net_30' | 'net_60' | 'net_90';
export type RoleEnum = 'super-admin' | 'admin' | 'freelancer' | 'client';
}
declare namespace App.Models {
export type Company = {id:string;created_at:string;updated_at:string;name:string;phone_1:string;phone_2:string;last_contacted_at:string;activity_status:string;company_type:string;flags:string;website_url:string;linkedin_url:string;facebook_url:string;instagram_url:string;country:string;state:string;zip_code:string;address_1:string;address_2:string;tax_identification_number:string;vat_number:string;tax_region_country:string;tax_filing_category:string;tax_documentation_url:string;preferred_payment_method:string;bank_account_details:string;billing_address:string;payment_terms:string;preferred_currency:string;};
export type ExternApiDetail = {id:string;api_token:string;api_secret:string;api_name:string;label:string;description:string;api_username:string;expires_at:string;created_at:string;updated_at:string;};
export type User = {id:string;name:string;email:string;password:string;profile_photo_url:string;email_verified_at:string;externApiDetails:ExternApiDetail[];};
}

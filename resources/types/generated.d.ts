declare namespace App.Enums {
export type CompanyActivityStatusEnum = 'active' | 'inactive';
export type CompanyContactActivityStatusEnum = 'unknown' | 'active' | 'inactive' | 'in_vacation';
export type CompanyTypeEnum = 'other' | 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widower' | 'sole_proprietorship' | 'partnership' | 'corporation' | 'non_profit';
export type ContactMethodEnum = 'other' | 'email' | 'phone' | 'sms';
export type ExternalServiceEnum = 'github';
export type PaymentMethodEnum = 'credit_card' | 'pay_pal' | 'bank_transfer';
export type PaymentTermEnum = 'immediate' | 'net_30' | 'net_60' | 'net_90';
export type RoleEnum = 'super-admin' | 'admin' | 'freelancer' | 'client';
}
declare namespace App.Http.Resources {
export type CompanyContactResource = {id:any;first_name:string;last_name:string;email:string;phone:string;title:string;job_title:string;preferred_contact_method:App.Enums.ContactMethodEnum;last_contacted_at:string;phone_readable:string;phone_rfc3966:string;notes:Array<string>;preferred_contact_method_readable:App.Enums.ContactMethodEnum;activity_status:App.Enums.CompanyContactActivityStatusEnum;activity_status_readable:string;};
export type CompanyResource = {id:string;created_at:string;updated_at:string;name:string;phone_1:string;phone_2:string;email:string;last_contacted_at:string;activity_status:string;company_type:string;flags:string;website_url:string;linkedin_url:string;facebook_url:string;instagram_url:string;country:string;state:string;zip_code:string;address_1:string;address_2:string;tax_identification_number:string;vat_number:string;tax_region_country:string;tax_filing_category:string;tax_documentation_url:string;preferred_payment_method:string;bank_account_details:string;billing_address:string;payment_terms:string;preferred_currency:string;phone_1_readable:string;phone_2_readable:string;phone_1_rfc3966:string;phone_2_rfc3966:string;company_term_readable:string;preferred_payment_method_readable:string;company_type_readable:string;companyContacts:CompanyContact[];};
export type ExternApiDetailResource = {id:string;api_name:string;label:string;description:string;api_username:string;expires_at:string;created_at:string;updated_at:string;has_api_secret:boolean;has_api_token:boolean;};
export type SecretExternApiDetailResource = {api_secret:string;api_token:string;};
export type ThemeResource = {primary_color:string|null;secondary_color:string|null;trinary_color:string|null;primary_text_color:string|null;secondary_text_color:string|null;trinary_text_color:string|null;primary_background_color:string|null;secondary_background_color:string|null;trinary_background_color:string|null;default_font:string|null;headline_font:string|null;tailwind_config:string|null;custom_css:string|null;favicon:string|null;logo:string|null;dark_logo:string|null;small_logo:string|null;dark_small_logo:string|null;icons_set:string|null;};
}
declare namespace App.Models {
export type ExternApiDetail = {id:string;api_token:string;api_secret:string;api_name:string;label:string;description:string;api_username:string;expires_at:string;created_at:string;updated_at:string;};
export type User = {id:string;name:string;email:string;role:RoleEnum;password:string;profile_photo_url:string;email_verified_at:string;externApiDetails:ExternApiDetail[];};
}

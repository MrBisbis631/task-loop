declare namespace App.Enums {
export type ExternalServiceEnum = 'github';
export type RoleEnum = 'super-admin' | 'admin' | 'freelancer' | 'client';
}
declare namespace App.Models {
export type ExternApiDetail = {id:string;api_token:string;api_secret:string;api_name:string;label:string;description:string;api_username:string;expires_at:string;created_at:string;updated_at:string;};
export type User = {id:string;name:string;email:string;password:string;profile_photo_url:string;email_verified_at:string;externApiDetails:ExternApiDetail[];};
}

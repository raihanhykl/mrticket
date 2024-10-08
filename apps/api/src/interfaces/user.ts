export default interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
  referral_code: string;
  f_referral_code: string;
  roleId: number;
  is_verified?: boolean;
}

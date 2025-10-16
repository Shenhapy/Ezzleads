// User roles
export type UserRole = 'buyer' | 'agent' | 'manager' | 'jv_partner';

// User profile type
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

// Lead types
export type LeadStatus = 'pending' | 'approved' | 'rejected' | 'sold' | 'expired' | 'deleted';
export type LeadMode = 'fixed_price' | 'marketplace';
export type PropertyType = 'single_family' | 'multi_family' | 'land' | 'commercial' | 'other';
export type LeadType = 'motivated_seller' | 'fsbo' | 'pre_foreclosure' | 'probate' | 'inherited' | 'other';

export interface Lead {
  id: string;
  submitted_by: string;
  status: LeadStatus;
  mode: LeadMode;
  assigned_to: string | null;
  
  // Property info
  property_address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number | null;
  longitude: number | null;
  property_type: PropertyType;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  
  // Lead info
  lead_type: LeadType;
  owner_name: string;
  owner_phone: string;
  owner_email: string | null;
  motivation_level: number; // 1-10
  notes: string | null;
  asking_price: number | null;
  suggested_price: number;
  
  // Marketplace info
  price: number;
  countdown_expires_at: string | null;
  views_count: number;
  favorites_count: number;
  
  // Timestamps
  created_at: string;
  approved_at: string | null;
  rejected_at: string | null;
  sold_at: string | null;
  rejection_reason: string | null;
}

// Wallet types
export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export type TransactionType = 'credit' | 'debit' | 'refund';

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  reference_id: string | null;
  created_by: string | null;
  created_at: string;
}

// CRM types
export type CRMLeadStatus = 'new' | 'contacted' | 'qualified' | 'negotiating' | 'under_contract' | 'closed' | 'dead';
export type CRMPriority = 'high' | 'medium' | 'low';

export interface CRMLead {
  id: string;
  purchase_id: string;
  buyer_id: string;
  lead_id: string;
  status: CRMLeadStatus;
  priority: CRMPriority;
  next_follow_up: string | null;
  notes: string | null;
  last_contact_date: string | null;
  created_at: string;
  updated_at: string;
}

export type ActivityType = 'call' | 'email' | 'sms' | 'note' | 'meeting' | 'status_change';

export interface CRMActivity {
  id: string;
  crm_lead_id: string;
  activity_type: ActivityType;
  description: string;
  created_by: string;
  created_at: string;
}

// Credit request types
export type CreditRequestStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface CreditRequest {
  id: string;
  user_id: string;
  amount_requested: number;
  status: CreditRequestStatus;
  payment_link: string | null;
  notes: string | null;
  created_at: string;
  processed_at: string | null;
  processed_by: string | null;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

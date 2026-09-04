export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface SavedPlan {
  id: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    brand: string;
  };
  variant: {
    id: string;
    color: string;
    storage: string;
    sellingPrice: number;
    cashback: number;
  };
  emiPlan: {
    id: string;
    tenureMonths: number;
    monthlyAmount: number;
    interestRate: number;
    totalAmount: number;
    cashback: number;
  };
}

export interface AssistantAction {
  type: string;
  label: string;
  path: string;
}

export interface AssistantResponse {
  message: string;
  actions: AssistantAction[];
}

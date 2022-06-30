export interface Sector {
  id: string;
  name: string;
  parentSectorId?: string;
}

export interface Worker {
  id?: string;
  name: string;
  agreeToTerms: boolean;
  sectors?: Partial<Sector>[];
}

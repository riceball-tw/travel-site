export interface AttractionsResponse {
  total: number;
  data: Data[];
}

export interface Data {
  id: number;
  name: string;
  name_zh: unknown;
  open_status: number;
  introduction: string;
  open_time: string;
  zipcode: string;
  distric: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  months: string;
  nlat: number;
  elong: number;
  official_site: string;
  facebook: string;
  ticket: string;
  remind: string;
  staytime: string;
  modified: string;
  url: string;
  category: Category[];
  target: Target[];
  service: Service[];
  friendly: unknown[];
  images: Image[];
  files: unknown[];
  links: Link[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Target {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
}

export interface Image {
  src: string;
  subject: string;
  ext: string;
}

export interface Link {
  src: string;
  subject: string;
}
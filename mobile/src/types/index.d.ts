type Category = {
  id: string;
  name: string;
};

type Place = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
  latitude?: number | 0;
  longitude?: number | 0;
  phone: string;
  rules: Array<{
    id: Place["id"];
    description: Place["description"];
  }>;
};

type PlaceDetailsParams = {
  id: string;
};

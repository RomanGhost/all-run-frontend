interface Card {
  id: number;
  title: string;
  description: string;
  sessionsCount: number;
  validDays: number;
  isPopular: boolean;
  validFrom: number;
  validTo: number;
  trainingType: {
    name: string;
  };
  price: {
    amount: number;
    currency: string;
  };
}

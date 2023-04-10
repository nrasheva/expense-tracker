type Constraints = {
  limit: number;
  validity: number;
};

export type Category = {
  color: string;
  constraints: Constraints[];
  icon: string;
  id: number;
  name: string;
};

export interface Foods {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export interface Restaurant {
  foods: Foods[];
  editingFood: Foods;
  modalOpen: boolean;
  editModalOpen: boolean;
}

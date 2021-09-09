import { Component, useEffect, useState } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { Foods, Restaurant } from "../../models/types";

const Dashboard: React.FC = () => {
  const [state, setState] = useState<Restaurant>({
    foods: [],
    editingFood: {} as Foods,
    editModalOpen: false,
    modalOpen: false,
  });

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get("/foods").then((res) => res.data);
      setState({ ...state, foods: response });
    }
    loadFoods();
  }, []);

  const handleAddFood = async (food: Foods) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setState({
        ...state,
        foods: [...state.foods, response.data],
        modalOpen: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: Foods) => {
    try {
      const foodUpdated = await api.put<Foods>(
        `/foods/${state.editingFood.id}`,
        {
          ...state.editingFood,
          ...food,
        }
      );

      const foodsUpdated = state.foods.map((item) =>
        item.id !== foodUpdated.data.id ? item : foodUpdated.data
      );

      setState({ ...state, foods: foodsUpdated, editModalOpen: false });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = state.foods.filter((food) => food.id !== id);

    setState({ ...state, foods: foodsFiltered });
  };

  const toggleModal = () => {
    setState({ ...state, modalOpen: !state.modalOpen });
  };

  const toggleEditModal = () => {
    setState({ ...state, editModalOpen: !state.editModalOpen });
  };

  const handleEditFood = (food: Foods) => {
    setState({ ...state, editingFood: food, editModalOpen: true });
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={state.modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={state.editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={state.editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {state.foods &&
          state.foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

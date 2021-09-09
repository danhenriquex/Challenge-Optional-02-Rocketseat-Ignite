import { Component, createRef, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { Foods } from "../../models/types";

interface ModalAddFoodProps {
  handleAddFood: (data: Foods) => void;
  setIsOpen: () => void;
  isOpen: boolean;
}

const ModalAddFood: React.FC<ModalAddFoodProps> = ({
  handleAddFood,
  setIsOpen,
  isOpen,
}) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: Foods) => {
    handleAddFood(data);
    setIsOpen();
  };

  console.log("###isOpen: ", isOpen);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;

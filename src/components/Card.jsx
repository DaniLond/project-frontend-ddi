import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

const CardPrueba = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-[300px] bg-gray-50 shadow-lg">
        <CardBody className="p-4">
          <p className="text-lg font-bold text-primary-dark">
            Prueba de NextUI + Tailwind
          </p>
          <p className="text-sm text-gray-500">Esta es una tarjeta</p>
        </CardBody>
        <CardFooter className="justify-end">
          <Button className="bg-primary-dark text-white" size="sm">
            Ver más
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardPrueba;

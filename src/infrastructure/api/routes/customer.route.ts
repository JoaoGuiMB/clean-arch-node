import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUsecase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: req.body.address,
    };
    const customer = await useCase.execute(customerDto);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListCustomerUsecase(new CustomerRepository());
  try {
    const customers = await useCase.execute({});
    res.format({
      "application/json": () => {
        res.status(200).json(customers);
      },
      "application/xml": () => {
        res.status(200).send(CustomerPresenter.toXML(customers));
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

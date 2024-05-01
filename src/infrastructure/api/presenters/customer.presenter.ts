import { toXML as convertToXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };
    return convertToXML(
      {
        customers: {
          customer: data.customers.map((customer) => {
            return {
              id: customer.id,
              name: customer.name,
              address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                zip: customer.address.zip,
              },
            };
          }),
        },
      },
      xmlOptions
    );
  }
}

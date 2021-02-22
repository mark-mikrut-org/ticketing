import { Message } from 'node-nats-streaming';
import {Listener, PaymentCreatedEvent, Subjects, OrderStatus} from "@my58tickets/common";
import { QueueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = QueueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete
    });
    await order.save();

    // note that we should probably publish an order update event

    msg.ack();
  }
}
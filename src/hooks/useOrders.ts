import { Order, PercentType } from "@/lib/types";
import { calculateDeduction, calculateDuration } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export function useOrder(countryId: string, orders: Order[]) {
  const getNow = () => new Date().toISOString().slice(0, 16);

  const addOrder = () => {
    const last = orders[orders.length - 1];
    const now = getNow();
    const fromdate = last?.todate ?? now;

    if (last && !last.todate) {
      alert("Please complete the last order first.");
      return orders;
    }

    const newOrder: Order = {
      id: uuidv4(),
      countryId,
      day: new Date(fromdate).toLocaleDateString('en-US', { weekday: 'short' }),
      activitytype: "Unknown",
      fromdate,
      duration: "0h",
      percent: "0%",
      todate: fromdate,
      remarks: "",
      deductions: "0h",
    };

    return [...orders, newOrder];
  };
const updateOrder = (id: string, changes: Partial<Order>) => {
  return orders.map(order => {
    if (order.id !== id) return order;

    const updatedOrder = {
      ...order,
      ...changes,
    };

    const duration = calculateDuration(updatedOrder.fromdate, updatedOrder.todate);
    const deductions = calculateDeduction(duration, updatedOrder.percent);

    let needsReorder = order.needsReorder;

    if (changes.fromdate) {
      const updatedOrders = orders.map(o =>
        o.id === id ? { ...o, fromdate: changes.fromdate! } : o
      );
      const sortedIds = [...updatedOrders]
        .sort((a, b) => new Date(a.fromdate).getTime() - new Date(b.fromdate).getTime())
        .map(o => o.id);
      const currentIds = orders.map(o => o.id);

      needsReorder = JSON.stringify(sortedIds) !== JSON.stringify(currentIds);
    }

    return {
      ...updatedOrder,
      duration,
      deductions,
      needsReorder,
      todate: order.todate,
    };
  });
};


  const deleteOrder = (id: string) => orders.filter(o => o.id !== id);

  const cloneOrder = (id: string) => {
    const original = orders.find(o => o.id === id);
    if (!original) return orders;

    const now = getNow();
    const clone: Order = {
      ...original,
      id: uuidv4(),
      fromdate: now,
      todate: now,
      duration: "0h",
      deductions: "0h",
      needsReorder: false,
    };

    return [...orders, clone];
  };

  const confirmReorder = () => {
    return [...orders]
      .sort((a, b) => new Date(a.fromdate).getTime() - new Date(b.fromdate).getTime())
      .map(o => ({ ...o, needsReorder: false }));
  };

  return {
    addOrder,
    updateOrder,
    deleteOrder,
    cloneOrder,
    confirmReorder,
  };
}

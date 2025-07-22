"use client";

import "@/styles/global.css";
import { useState } from "react";
import { useOrder } from "@/hooks/useOrders";
import { ActivityType, Order, PercentType } from "@/lib/types";
import { Check, Files, Plus, Trash } from "lucide-react";
import IconButton from "../ui/IconButton";
import DeleteModal from "../modals/DeleteModal";
import ConfirmModal from "../modals/ConfirmModal";
import clsx from "clsx";

const activityOptions: ActivityType[] = [
  "Unknown","Loading", "Unloading", "Waiting", "Berthing",
  "Unberthing", "Inspection", "Bunkering", "Maintenance"
];
const percentOptions: PercentType[] = ["0%", "50%", "100%"];

type Props = {
  countryId: string;
  orders: Order[];
  onChangeOrders: (orders: Order[]) => void;
};

export default function OrderTable({ countryId, orders, onChangeOrders }: Props) {
  const { addOrder, updateOrder, deleteOrder, cloneOrder, confirmReorder } =
    useOrder(countryId, orders);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  return (
    <div className="space-y-5 min-w-5xl">
      <div className="flex justify-end items-center">
        <button
          onClick={() => onChangeOrders(addOrder())}
          className="bg-gray-100 font-semibold border border-gray-300 hover:bg-gray-200 transition-colors
           duration-200 shadow text-sm text-black px-4 py-1 rounded flex items-center gap-2 hover:opacity-95"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      <table className="w-full text-left shadow text-[.85rem]">
        <thead className="bg-gray-100 border-b border-b-gray-200">
          <tr className="*:px-4 *:py-2 *:border-r-1 *:border-r-gray-300">
            <th className="rounded-tl-xl">Day</th>
            <th>Activity Type</th>
            <th>From Date & Time</th>
            <th>Duration</th>
            <th>%</th>
            <th>To Date & Time</th>
            <th>Remarks</th>
            <th>Deductions</th>
            <th className="border-none rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id} className={order.needsReorder ? "bg-red-100" : ""}>
              <td className="p-2">{order.day}</td>
              <td>
                <select
                  value={order.activitytype}
                  onChange={(e) =>
                    onChangeOrders(
                      updateOrder(order.id, {
                        activitytype: e.target.value as ActivityType,
                      })
                    )
                  }
                  className={clsx("outline-none",
                      {"text-gray-500":order.activitytype === "Unknown"}
                    )}
                >
                  {activityOptions.map((act) => (
                    <option key={act} value={act}
                    className="text-black outline-none hover:bg-gray-400"
                    >
                      {act}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="datetime-local"
                  value={order.fromdate}
                  onChange={(e) =>
                    onChangeOrders(
                      updateOrder(order.id, { fromdate: e.target.value })
                    )
                  }
                />
              </td>
              <td>{order.duration}</td>
              <td>
                <select
                  value={order.percent}
                  onChange={(e) =>
                    onChangeOrders(
                      updateOrder(order.id, {
                        percent: e.target.value as PercentType,
                      })
                    )
                  }
                  className="outline-none"
                >
                  {percentOptions.map((p) => (
                    <option key={p} value={p} >
                      {p}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(order.todate).toLocaleString()}</td>
              <td>
                <input
                  value={order.remarks}
                  onChange={(e) =>
                    onChangeOrders(
                      updateOrder(order.id, { remarks: e.target.value })
                    )
                  }
                  placeholder="notes..."
                  className="ouline-none focus:outline-none"
                  
                />
              </td>
              <td>{order.deductions}</td>
              <td>
                <div className="flex gap-2 justify-end pe-4">
                  {order.needsReorder && (
                    <IconButton
                      onClick={()=>{
                        setShowConfirm(true);

                      }}
                      Icon={Check}
                      title="Sort"
                    />
                  )}
                  {idx > 0 && (
                    <IconButton
                      onClick={() => onChangeOrders(cloneOrder(order.id))}
                      Icon={Files}
                      title="Clone"
                    />
                  )}
                  <IconButton
                    onClick={() => {
                      setDeleteTarget(order.id);
                      setDeleteConfirm(true);
                    }}
                    Icon={Trash}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <DeleteModal open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <div className="flex gap-4">
          <button
            className="p-2 bg-white hover:bg-gray-100 transition-colors duration-300 shadow text-gray-500 rounded-sm w-full cursor-pointer"
            onClick={() => setDeleteConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-red-500  hover:bg-red-600 transition-colors duration-300 text-white rounded-sm w-full cursor-pointer"
            onClick={() => {
              if (deleteTarget) {
                onChangeOrders(deleteOrder(deleteTarget));
                setDeleteTarget(null);
                setDeleteConfirm(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      </DeleteModal>
      <ConfirmModal open={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="flex gap-4">
          <button
            className="p-2 bg-white hover:bg-gray-100 transition-colors duration-300 shadow text-gray-500 rounded-sm w-full cursor-pointer"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-blue-500 hover:opacity-85 transition-opacity duration-300 text-white rounded-sm w-full cursor-pointer"
            onClick={() => {
              if (showConfirm) {
                onChangeOrders(confirmReorder());      
                setShowConfirm(false);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </ConfirmModal>
    </div>
  );
}

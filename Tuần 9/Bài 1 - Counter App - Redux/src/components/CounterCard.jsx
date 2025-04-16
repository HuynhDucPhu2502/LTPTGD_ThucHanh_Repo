import React from "react";
import { useSelector, useDispatch } from "react-redux";

function CounterCard() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-64 text-center">
      <h2 className="text-2xl font-bold mb-4">Số hiện tại: {count}</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Giảm
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tăng
        </button>
      </div>
    </div>
  );
}

export default CounterCard;

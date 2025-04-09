import React, { useState } from "react";

const DeleteCustomerForm = ({ onDeleteCustomer, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onDeleteCustomer(id);
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <p className="text-center">
        Are you sure to delete this customer, this action cannot be undone
      </p>
      <div className="flex flex-col space-y-4 mt-12">
        <button
          onClick={handleSubmit}
          type="submit"
          className={`px-4 py-2 bg-pink-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } text-white font-semibold rounded-md hover:bg-pink-600 w-1/2 mx-auto`}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteCustomerForm;

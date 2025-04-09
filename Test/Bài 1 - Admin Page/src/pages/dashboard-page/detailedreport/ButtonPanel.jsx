import React from "react";
import { exportToCSV } from "../../../utils/CSVUtils";
import { Download, FileUp } from "lucide-react";

const ButtonPanel = ({ isLoading, handleStartCreate, handleImport, data }) => {
  return (
    <>
      {!isLoading && (
        <div className="flex space-x-2">
          <button
            onClick={handleStartCreate}
            className="size-12 bg-green-500 hover:bg-green-600 text-center rounded-lg text-2xl font-bold text-white cursor-pointer"
          >
            +
          </button>
          <button
            onClick={() => exportToCSV(data, "customers.csv")}
            className="flex space-x-4 items-center bg-blue-600 hover:bg-blue-700 text-center rounded-lg text-lg font-bold text-white cursor-pointer px-4"
          >
            <Download />
            <p>Export CSV</p>
          </button>
          <label className="flex space-x-4 items-center bg-green-600 hover:bg-green-700 text-center rounded-lg text-lg font-bold text-white cursor-pointer px-4">
            <FileUp />
            <p>Import CSV</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      )}
    </>
  );
};

export default ButtonPanel;

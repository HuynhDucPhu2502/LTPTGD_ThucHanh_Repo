import React, { useCallback, useReducer } from "react";
import {
  deleteCustomer,
  fetchCustomer,
  saveCustomer,
  updateCustomer,
} from "../../../services/CustomerService";
import { SquareChartGantt } from "lucide-react";
import DataTable from "react-data-table-component";
import { columns } from "./DataTableConfig";
import { Loading } from "../../../components/Loading";
import useFetch from "../../../hooks/useFetch";
import { Modal } from "../../../components/Modal";
import CustomerForm from "../../../components/CustomerForm";
import { importFromCSV } from "../../../utils/CSVUtils";
import DataTableActionReducer from "../../../reducers/DataTableActionReducer";
import DeleteCustomerForm from "./DeleteCustomerForm";
import ButtonPanel from "./ButtonPanel";

const initialState = {
  status: "IDLE",
  edittingCustomer: null,
};

export const DetailedReport = () => {
  const stableFetchCustomer = useCallback(fetchCustomer, []);
  const { data, isLoading, refetch, toggleLoading } =
    useFetch(stableFetchCustomer);

  const [state, dispatch] = useReducer(DataTableActionReducer, initialState);

  const closeModal = () => dispatch({ type: "CLOSE" });

  const handleStartUpdate = (row) => dispatch({ type: "UPDATE", payload: row });

  const handleStartCreate = () => dispatch({ type: "ADD" });

  const handStartDelete = (row) => dispatch({ type: "DELETE", payload: row });

  const onUpdateCustomer = async (id, newCustomer) => {
    toggleLoading();
    await updateCustomer(id, newCustomer);
    refetch();
    closeModal();
  };

  const onSaveCustomer = async (newCustomer) => {
    toggleLoading();
    await saveCustomer(newCustomer);
    refetch();
    closeModal();
  };

  const onDeleteCustomer = async (id) => {
    toggleLoading();
    await deleteCustomer(id);
    refetch();
    closeModal();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      importFromCSV(file, async (importedData) => {
        try {
          toggleLoading();

          const promises = importedData.map((customer) => {
            return saveCustomer(customer);
          });
          const results = await Promise.all(promises);

          results.forEach((result, index) => {
            if (result) {
              console.log("Đã lưu khách hàng:", importedData[index].name);
            } else {
              console.warn(
                "Không thể lưu khách hàng:",
                importedData[index].name
              );
            }
          });

          refetch();
        } catch (e) {
          console.error("Lỗi khi lưu danh sách khách hàng:", e);
        }
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center space-x-4">
          <SquareChartGantt className="text-pink-500 text-xl" />
          <h1 className="text-xl font-bold">Detailed Report</h1>
        </div>
        <ButtonPanel
          data={data}
          handleImport={handleImport}
          handleStartCreate={handleStartCreate}
          isLoading={isLoading}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center min-h-[600px]">
          <Loading />
        </div>
      ) : (
        <DataTable
          columns={columns(handleStartUpdate, handStartDelete)}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      )}

      {/* Modal cho thêm hoặc update */}
      {state.status !== "IDLE" && state.status !== "DELETING" && (
        <Modal title={"Customer Form"} onClose={closeModal}>
          <CustomerForm
            initialData={state.edittingCustomer}
            onSave={
              state.status === "UPDATING" ? onUpdateCustomer : onSaveCustomer
            }
            status={state.status}
          />
        </Modal>
      )}

      {/* Modal cho xóa */}
      {state.status === "DELETING" && (
        <Modal title={"Delete Customer"} onClose={closeModal} size={"w-fit"}>
          <DeleteCustomerForm
            closeModal={closeModal}
            onDeleteCustomer={onDeleteCustomer}
            id={state.edittingCustomer.id}
          />
        </Modal>
      )}
    </>
  );
};

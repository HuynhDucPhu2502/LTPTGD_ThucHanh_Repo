const DataTableActionReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { status: "ADDING", edittingCustomer: null };
    case "UPDATE":
      return { status: "UPDATING", edittingCustomer: action.payload };
    case "CLOSE":
      return { status: "IDLE", edittingCustomer: null };
    case "DELETE":
      return { status: "DELETING", edittingCustomer: action.payload };
    default:
      return state;
  }
};

export default DataTableActionReducer;

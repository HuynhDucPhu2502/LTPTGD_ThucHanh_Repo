export const fetchCustomer = async () => {
  try {
    const response = await fetch(
      "https://67dfef6b7635238f9aabca61.mockapi.io/customer"
    );

    if (response.ok) {
      return await response.json();
    }

    return [];
  } catch (e) {
    console.error("Xảy ra lỗi trong lúc fetch: ", e);
  }
};

import axiosInstance from "./axios";

export const getAllReviews = async () => {
  const response = await axiosInstance.get("/reviews");

  return response.data;
};

export const makeReview = async (
  name: string,
  comment: string,
  rating: number
) => {
  try {
    await axiosInstance.post("/reviews", {
      name,
      comment,
      rating,
    });

    return true;
  } catch {
    return false;
  }
};

export const deleteReview = async (id: string) => {
  await axiosInstance.delete(`/reviews/${id}`);
};

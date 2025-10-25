import axiosInstance from "./axios";

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export const getAllReviews = async () => {
  const response = await axiosInstance.get("/reviews");

  return response.data;
};

export const makeReview = async (
  name: string,
  comment: string,
  rating: number
): Promise<Review | null> => {
  try {
    return (
      await axiosInstance.post("/reviews", {
        name,
        comment,
        rating,
      })
    ).data;
  } catch {
    return null;
  }
};

export const deleteReview = async (id: string) => {
  await axiosInstance.delete(`/reviews/${id}`);
};

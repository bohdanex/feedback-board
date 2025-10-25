import { createSignal, type Component } from "solid-js";
import Reviews from "./Reviews";
import CreateReviewForm from "./CreateReviewForm";
import { Review } from "./reviewService";

export const [getReviews, setReviews] = createSignal<Review[]>([]);

const App: Component = () => {
  return (
    <>
      <Reviews />
      <CreateReviewForm />
    </>
  );
};

export default App;

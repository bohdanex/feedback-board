import { createEffect, createSignal, For } from "solid-js";
import { getAllReviews } from "./reviewService";

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

export default () => {
  const [getReviews, setReviews] = createSignal<Review[]>([]);

  createEffect(() => {
    getAllReviews().then((reviews) => {
      setReviews(reviews);
    });
  });

  return (
    <h2>
      {
        <For each={getReviews()}>
          {(item) => (
            <div>
              <h2>{item.name}</h2>
              <p>{item.comment}</p>
              <p>{item.rating}/5</p>
            </div>
          )}
        </For>
      }
    </h2>
  );
};

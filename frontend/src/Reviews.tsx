import { createEffect, createSignal, For } from "solid-js";
import { deleteReview, getAllReviews } from "./reviewService";

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
}

export default () => {
  const [getReviews, setReviews] = createSignal<Review[]>([]);

  createEffect(() => {
    getAllReviews().then((reviews) => {
      setReviews(reviews);
    });
  });

  return (
    <table>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Author
          </th>
          <th scope="col" class="px-6 py-3">
            Comment
          </th>
          <th scope="col" class="px-6 py-3">
            Rating
          </th>
          <th scope="col" class="px-6 py-3">
            Data & Time
          </th>
          <th scope="col" class="px-6 py-3">
            * * *
          </th>
        </tr>
      </thead>
      <tbody>
        <For each={getReviews()}>
          {(item) => (
            <tr class="text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td class="px-6 py-4">{item.name}</td>
              <td class="px-6 py-4">{item.comment}</td>
              <td class="px-6 py-4">{item.rating}/5</td>
              <td class="px-6 py-4">{item.created_at}</td>
              <td class="px-6 py-4 text-red-700 font-bold">
                <button
                  class="cursor-pointer"
                  on:click={async () => {
                    await deleteReview(item.id);
                    setReviews((prevReviews) =>
                      prevReviews.filter((it) => item.id !== it.id)
                    );
                  }}
                >
                  DELETE
                </button>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
    // <table class="table-auto">
    //   {

    //   }
    // </table>
  );
};

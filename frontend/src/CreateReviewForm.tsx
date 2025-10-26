import { setReviews } from "./App";
import { makeReview } from "./reviewService";
export default () => {
  let usernameInput: HTMLInputElement | undefined;
  let ratingInput: HTMLInputElement | undefined;
  let commentInput: HTMLTextAreaElement | undefined;
  let form: HTMLFormElement | undefined;

  return (
    <form
      ref={form}
      class="p-1 flex flex-col gap-y-2 w-max border rounded-md m-2"
    >
      <div class="flex flex-row gap-x-2 items-center">
        <label for="username">Name and surname:</label>
        <input
          ref={usernameInput}
          id="username"
          type="text"
          placeholder="Type your name and surname"
          class="dark:bg-gray-700 text-white p-1"
        ></input>
      </div>
      <div class="flex flex-row gap-x-2 items-center justify-between">
        <label for="rating">Rate from 1 to 5</label>
        <input
          ref={ratingInput}
          id="rating"
          type="number"
          min={1}
          max={5}
          value={5}
          placeholder="1-5"
          class="dark:bg-gray-700 text-white p-1"
        ></input>
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="comment">Leave your comment</label>
        <textarea
          ref={commentInput}
          class="dark:bg-gray-700 text-white p-1"
          maxLength={150}
          placeholder="Comment..."
        ></textarea>
      </div>
      <button
        type="button"
        class="cursor-pointer dark:bg-gray-800 text-white rounded-md p-3"
        on:click={async () => {
          if (
            usernameInput?.value &&
            ratingInput?.value &&
            commentInput &&
            form
          ) {
            const review = await makeReview(
              usernameInput.value,
              commentInput.value,
              ratingInput.valueAsNumber
            );
            if (review) setReviews((prevReviews) => [...prevReviews, review]);

            form.reset();
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};

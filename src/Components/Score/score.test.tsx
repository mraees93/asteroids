import Score from "./Score";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("Score component", () => {
  test("should be rendered in the dom and the score is zero", () => {
    render(
      // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
      <Provider store={store}>
        // @ts-expect-error TS(2749): 'Score' refers to a value, but is being used as a ... Remove this comment to see the full error message
        <Score />
      </Provider>
    );
    const score = screen.getByTestId("scoreID");

    expect(score).toBeVisible();
    expect(score.textContent).toContain("Score: 0");
  });
});

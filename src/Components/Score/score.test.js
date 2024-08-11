import Score from "./Score";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("Score component", () => {
  test("should be rendered in the dom and the score is zero", () => {
    render(
      <Provider store={store}>
        <Score />
      </Provider>
    );
    const score = screen.getByTestId("scoreID");

    expect(score).toBeVisible();
    expect(score.textContent).toContain("Score: 0");
  });
});

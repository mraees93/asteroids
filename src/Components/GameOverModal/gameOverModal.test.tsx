import GameOverModal from "./GameOverModal";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("GameOverModal component", () => {
  test("should be rendered in the dom and its text is an empty string", () => {
    render(
      // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
      <Provider store={store}>
        // @ts-expect-error TS(2749): 'GameOverModal' refers to a value, but is being us... Remove this comment to see the full error message
        <GameOverModal />
      </Provider>
    );
    const gameOverModal = screen.queryByTestId("gameOverModalID");

    expect(gameOverModal).toBeInTheDocument();
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    expect(gameOverModal.textContent).toContain("");
  });
});

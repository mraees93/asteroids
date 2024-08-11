import GameOverModal from "./GameOverModal";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("GameOverModal component", () => {
  test("should be rendered in the dom and its text is an empty string", () => {
    render(
      <Provider store={store}>
        <GameOverModal />
      </Provider>
    );
    const gameOverModal = screen.queryByTestId("gameOverModalID");

    expect(gameOverModal).toBeInTheDocument();
    expect(gameOverModal.textContent).toContain("");
  });
});

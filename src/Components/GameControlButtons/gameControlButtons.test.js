import GameControlButtons from "./GameControlButtons";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
let gameControlButtonsComponent;

beforeEach(() => {
  gameControlButtonsComponent = (
    <Provider store={store}>
      <GameControlButtons />
    </Provider>
  );
});

describe("GameControlButtons component", () => {
  test("should be rendered in the dom", () => {
    render(gameControlButtonsComponent);
    const buttonsDiv = screen.queryByTestId("buttonsID");
    expect(buttonsDiv).toBeVisible();
  });

  test("should render 'Stop / Reset game' and 'Start new game' buttons", () => {
    render(gameControlButtonsComponent);
    const resetButton = screen.queryByText("Stop / Reset game");
    const startNewGameButton = screen.queryByText("Start new game");

    expect(resetButton).toBeVisible();
    expect(startNewGameButton).toBeVisible();
  });
});

import GameControlButtons from "./GameControlButtons";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
let gameControlButtonsComponent: any;

beforeEach(() => {
  gameControlButtonsComponent = (
    // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
    <Provider store={store}>
      // @ts-expect-error TS(2749): 'GameControlButtons' refers to a value, but is bei... Remove this comment to see the full error message
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

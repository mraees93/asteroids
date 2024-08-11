import AllScoresModal from "./AllScoresModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

let allScoresModalComponent;

beforeEach(() => {
  allScoresModalComponent = (
    <Provider store={store}>
      <AllScoresModal />
    </Provider>
  );
});

describe("AllScoresModal component", () => {
  test("should be rendered in the dom and its text should be an empty string", () => {
    render(allScoresModalComponent);
    const scoresModal = screen.queryByTestId("allScoresModalID");
    expect(scoresModal).toBeInTheDocument();
    expect(scoresModal.textContent).toContain("");
  });

  test("should render the 'See your scores' button and when its clicked the text heading is 'YOUR SCORES'", () => {
    render(allScoresModalComponent);
    const scoresButton = screen.queryByText("See your scores");

    fireEvent.click(scoresButton);

    const scoresModalText = screen.getByText("YOUR SCORES");
    expect(scoresModalText).toBeVisible();
  });
});

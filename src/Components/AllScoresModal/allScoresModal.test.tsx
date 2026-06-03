import AllScoresModal from "./AllScoresModal";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

let allScoresModalComponent: any;

beforeEach(() => {
  allScoresModalComponent = (
    // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
    <Provider store={store}>
      // @ts-expect-error TS(2749): 'AllScoresModal' refers to a value, but is being u... Remove this comment to see the full error message
      <AllScoresModal />
    </Provider>
  );
});

describe("AllScoresModal component", () => {
  test("should be rendered in the dom and its text should be an empty string", () => {
    render(allScoresModalComponent);
    const scoresModal = screen.queryByTestId("allScoresModalID");
    expect(scoresModal).toBeInTheDocument();
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    expect(scoresModal.textContent).toContain("");
  });

  test("should render the 'See your scores' button and when its clicked the text heading is 'YOUR SCORES'", () => {
    render(allScoresModalComponent);
    const scoresButton = screen.queryByText("See your scores");

    // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
    fireEvent.click(scoresButton);

    const scoresModalText = screen.getByText("YOUR SCORES");
    expect(scoresModalText).toBeVisible();
  });
});

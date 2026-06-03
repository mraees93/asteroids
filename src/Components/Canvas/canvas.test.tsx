import Canvas from "./Canvas";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("Canvas component", () => {
  test("should be rendered in the dom", () => {
    render(
      // @ts-expect-error TS(2749): 'Provider' refers to a value, but is being used as... Remove this comment to see the full error message
      <Provider store={store}>
        // @ts-expect-error TS(2749): 'Canvas' refers to a value, but is being used as a... Remove this comment to see the full error message
        <Canvas />
      </Provider>
    );
    const canvas = screen.getByTestId("canvasID");
    expect(canvas).toBeInTheDocument();
  });
});

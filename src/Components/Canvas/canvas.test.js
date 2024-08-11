import Canvas from "./Canvas";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("Canvas component", () => {
  test("should be rendered in the dom", () => {
    render(
      <Provider store={store}>
        <Canvas />
      </Provider>
    );
    const canvas = screen.getByTestId("canvasID");
    expect(canvas).toBeInTheDocument();
  });
});

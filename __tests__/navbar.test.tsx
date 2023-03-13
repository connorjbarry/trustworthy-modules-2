import NavBar from "../src/components/NavBar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("NavBar testing", () => {
  it("should render the NavBar component", () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav")).toMatchSnapshot();
  });
});

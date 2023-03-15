import Packages from "../src/pages/packages";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Package Screen testing", () => {
  it("should render the add packages button", () => {
    render(<Packages />);
    expect(screen.getByTestId("add-package-btn")).toBeInTheDocument();
  });
  it("should render the search bar", () => {
    render(<Packages />);
    expect(screen.getByTestId("package-search-bar")).toBeInTheDocument();
  });
});

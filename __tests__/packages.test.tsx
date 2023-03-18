/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Packages from "../src/pages/packages";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Package Screen testing", () => {
  it("should render the add packages button", () => {
    render(<Packages />);
    expect(screen.getByTestId("add-package-btn")).toBeInTheDocument();
  });
  it("should render the search bar", () => {
    render(<Packages />);
    expect(screen.getByTestId("package-search-bar")).toBeInTheDocument();
  });
  it("the add package button should be clickable", async () => {
    render(<Packages />);
    await userEvent.click(screen.getByTestId("add-package-btn"));
    expect(screen.getByTestId("add-package-modal")).toBeInTheDocument();
  });
  it("search bar should hold the value that is typed in", async () => {
    render(<Packages />);
    const searchBar = screen.getByTestId("package-search-input");
    expect(searchBar).toBeInTheDocument();
    await userEvent.type(searchBar, "test");
    expect(screen.getByTestId("package-search-input")).toHaveValue("test");
  });
});

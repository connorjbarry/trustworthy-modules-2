/* eslint-disable @typescript-eslint/no-unsafe-call */
import NavBar from "../src/components/NavBar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// TODO: Add tests for NavBar component

describe("NavBar testing", () => {
  it("should render the NavBar component", () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
  it("should have the correct number of links", () => {
    render(<NavBar />);
    expect(screen.getAllByTestId("nav-link")).toHaveLength(4);
  });
  it("should have an image that links to homepage", () => {
    render(<NavBar />);
    // the parent element should have attribute href="/"
    expect(
      screen.getByText("Trustworthy Modules Registry").parentElement
    ).toHaveAttribute("href", "/");
  });
  it("should go to account page when account link is clicked", () => {
    render(<NavBar />);
    // the parent element should have attribute href="/account"
    expect(screen.getByText("Account").parentElement).toHaveAttribute(
      "href",
      "/account"
    );
  });
});

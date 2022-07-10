import { render, screen } from "@testing-library/react";
import FormView from "./FormView";

test("renders learn react link", () => {
  render(<FormView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

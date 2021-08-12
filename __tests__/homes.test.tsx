import { render } from "@testing-library/react";
import Homes from "../components/ui/Homes";

describe("home comp", () => {
  it("hello textAlign", () => {
    const { container, getByText } = render(<Homes />);
    expect(getByText("Welcome to Henosis")).toBeInTheDocument();
  });
});

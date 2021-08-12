import { render } from "@testing-library/react";
import Contact from "../components/ui/HomePage/Contact";

describe("Contact Testing", () => {
  it("div rendering", () => {
    const { getByTestId } = render(<Contact />);
    expect(getByTestId("contact-header")).toBeInTheDocument();
  });
  it("form rendering", () => {
    const contact = render(<Contact />);
    const someElement = contact.container.querySelector(".contact-form");
    expect(someElement).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import Banner from "../components/ui/HomePage/Banner";

describe("Should render the banner without crashing", () => {
  it("Renders the banner section", () => {
    const { getByTestId } = render(<Banner />);
    expect(getByTestId("banner-test")).toBeTruthy();
  });
  //   it("form rendering", () => {
  //     const contact = render(<Contact />);
  //     const someElement = contact.container.querySelector(".contact-form");
  //     expect(someElement).toBeInTheDocument();
  //   });
});

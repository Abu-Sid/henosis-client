import { render } from "@testing-library/react";
import Footer from "../components/ui/Footer";

describe("Should render the footer without crashing", () => {
  it("Renders the footer section", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toBe(
      "ContactPhone: +88 017 123 654 45Address: 385 Lane - 6, Dhaka, 1206MenuFeaturesPricingCreate a new workspaceExisting workspaceSign up and get started with Henosis today. A world of productive teamwork awaits!Signup© Copyright 2021. All Rights Reserved by Henosis."
    );
  });
});

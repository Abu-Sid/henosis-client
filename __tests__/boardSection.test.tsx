import { render } from "@testing-library/react";
import BoardSection from "../components/ui/HomePage/BoardSection";

describe("Should render the app without crashing", () => {
  it("Renders the board section", () => {
    const { container } = render(<BoardSection />);
    expect(container.textContent).toBe(
      "Group ChatThe board is just the beginningYou can chat with other developers in your group, while working on a feature or solving a problem."
    );
  });
});

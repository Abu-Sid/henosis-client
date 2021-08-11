import { render } from "@testing-library/react";
import Homes from "../components/ui/Homes";

test("renders a message", () => {
  const { container, getByText } = render(<Homes />);
  expect(getByText("Hello World")).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
      <p>
        Hello World
      </p>
    `);
});

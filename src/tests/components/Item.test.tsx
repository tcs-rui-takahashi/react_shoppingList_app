import { render } from "@testing-library/react";
import { Item } from "../../apps/components/Item";

it("renders Item component without crashing", () => {
  render(<Item />);
});

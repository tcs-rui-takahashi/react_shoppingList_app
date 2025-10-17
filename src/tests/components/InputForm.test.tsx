import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { InputForm } from "../../apps/components/InputForm";

describe("inputForm", () => {
  it("フォーム送信時にonAddItemが正しく呼ばれる", () => {
    const mockOnAddItem = vi.fn();
    render(<InputForm onAddItem={mockOnAddItem} />);
    const input = screen.getByPlaceholderText("アイテム名");
    fireEvent.change(input, { target: { value: "牛乳" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    const arg = mockOnAddItem.mock.calls[0][0];
    expect(arg.name).toBe("牛乳");
    expect(arg.completed).toBe(false);
    expect(typeof arg.id).toBe("string");
  });
});

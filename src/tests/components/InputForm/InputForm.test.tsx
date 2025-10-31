import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputForm } from "../../../apps/components/InputForm/InputForm";

describe("InputForm", () => {
  test("初期画面で「アイテムを新規追加」ボタンが表示される", () => {
    const mockOnAddItem = vi.fn();
    render(<InputForm onAddItem={mockOnAddItem} />);
    expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
  });

  describe("フォームを開いた状態", () => {
    let mockOnAddItem: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
      mockOnAddItem = vi.fn();
      render(<InputForm onAddItem={mockOnAddItem} />);
      await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    });

    const getElements = () => ({
      nameInput: screen.getByLabelText(/品名/i),
      quantityInput: screen.getByPlaceholderText("例: 1, 2, 3...") as HTMLInputElement,
      unitSelect: screen.getByLabelText(/単位/i) as HTMLSelectElement,
      memoInput: screen.getByPlaceholderText("例: 特売日、ブランド指定、代替品など") as HTMLTextAreaElement,
      addButton: screen.getByText(/追加する/i),
      cancelButton: screen.getByText(/キャンセル/i),
    });

    const expectOnAddItemCalledWith = (mockFn: ReturnType<typeof vi.fn>, expectedName: string) => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      const arg = mockFn.mock.calls[0][0];
      expect(arg.name).toBe(expectedName);
      expect(arg.completed).toBe(false);
      expect(typeof arg.id).toBe("string");
    };

    const addItem = async (name: string) => {
      const { nameInput, addButton } = getElements();
      await userEvent.type(nameInput, name);
      await userEvent.click(addButton);
    };

    test("フォーム送信時にonAddItemが正しく呼ばれる", async () => {
      const { nameInput } = getElements();
      await userEvent.type(nameInput, "牛乳");
      await userEvent.keyboard("{Enter}");
      expectOnAddItemCalledWith(mockOnAddItem, "牛乳");
    });

    test("「追加する」ボタンをクリックしたらonAddItemが呼ばれる", async () => {
      await addItem("にんじん");
      expectOnAddItemCalledWith(mockOnAddItem, "にんじん");
    });

    test("「アイテムを新規追加」ボタンをクリックするとフォームが表示される", () => {
      const { nameInput, quantityInput, unitSelect, memoInput } = getElements();
      expect(nameInput).toBeInTheDocument();
      expect(quantityInput).toBeInTheDocument();
      expect(unitSelect).toBeInTheDocument();
      expect(memoInput).toBeInTheDocument();
    });

    test("キャンセルボタンでフォームがリセットされ閉じる", async () => {
      const { nameInput, cancelButton } = getElements();
      await userEvent.type(nameInput, "にんじん");
      await userEvent.click(cancelButton);
      expect(screen.queryByLabelText(/品名/i)).not.toBeInTheDocument();
      expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
    });

    test("品名が未入力の場合、エラーメッセージが表示される", async () => {
      const { nameInput, addButton } = getElements();
      await userEvent.clear(nameInput);
      await userEvent.click(addButton);
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
    });

    test("品名が入力されている場合、エラーメッセージは表示されない", async () => {
      await addItem("にんじん");
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });

    test("エラー表示後、正しい値を入れるとエラーが消える", async () => {
      const { nameInput, addButton } = getElements();
      await userEvent.clear(nameInput);
      await userEvent.click(addButton);
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
      await userEvent.type(nameInput, "にんじん");
      await userEvent.click(addButton);
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });

    test("品名が入力されていれば、追加ボタンが有効になる", async () => {
      const { nameInput, addButton } = getElements();
      await userEvent.type(nameInput, "にんじん");
      expect(addButton).toBeEnabled();
    });

    test("追加ボタンを押したら、初期の画面に戻る", async () => {
      await addItem("にんじん");
      expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
    });

    test("数量inputに数字を入力するとその値になる", async () => {
      const { quantityInput } = getElements();
      await userEvent.clear(quantityInput);
      await userEvent.type(quantityInput, "5");
      expect(quantityInput.value).toBe("5");
    });

    test("数量inputを空欄→数字→空欄と切り替える", async () => {
      const { quantityInput } = getElements();
      await userEvent.clear(quantityInput);
      expect(quantityInput.value).toBe("");
      await userEvent.type(quantityInput, "7");
      expect(quantityInput.value).toBe("7");
      await userEvent.clear(quantityInput);
      expect(quantityInput.value).toBe("");
    });

    test("単位を選択できる", async () => {
      const { unitSelect } = getElements();
      await userEvent.selectOptions(unitSelect, "個");
      expect(unitSelect.value).toBe("個");
    });

    test("メモの入力が反映される", async () => {
      const { memoInput } = getElements();
      await userEvent.type(memoInput, "今週中に買う");
      expect(memoInput.value).toBe("今週中に買う");
    });
  });
});
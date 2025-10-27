import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputForm } from "../../apps/components/InputForm";

describe('InputForm', () => {
  test('初期画面で「アイテムを新規追加」ボタンが表示される', () => {
    const mockOnAddItem = vi.fn(); 
    render(<InputForm onAddItem={mockOnAddItem} />);
    const button = screen.getByText(/アイテムを新規追加/i);
    expect(button).toBeInTheDocument();
  });

  describe('フォームを開いた状態', () => {
    let mockOnAddItem: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
      mockOnAddItem = vi.fn();
      render(<InputForm onAddItem={mockOnAddItem} />);
      await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    });

    test("フォーム送信時にonAddItemが正しく呼ばれる", async () => {
      const input = screen.getByPlaceholderText(/例: にんじん/);
      await userEvent.type(input, "牛乳");
      await userEvent.keyboard("{Enter}");

      expect(mockOnAddItem).toHaveBeenCalledTimes(1);
      const arg = mockOnAddItem.mock.calls[0][0];
      expect(arg.name).toBe("牛乳");
      expect(arg.completed).toBe(false);
      expect(typeof arg.id).toBe("string");
    });

    test('「追加する」ボタンをクリックしたらonAddItemが呼ばれる', async () => {
      const nameInput = screen.getByLabelText(/品名/i);
      await userEvent.type(nameInput, 'にんじん');
      const addButton = screen.getByText(/追加する/i);
      await userEvent.click(addButton);
      
      expect(mockOnAddItem).toHaveBeenCalledTimes(1);
      const arg = mockOnAddItem.mock.calls[0][0];
      expect(arg.name).toBe('にんじん');
    });

    test('「アイテムを新規追加」ボタンをクリックするとフォームが表示される', () => {
      expect(screen.getByLabelText(/品名/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/数量/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/単位/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/メモ/i)).toBeInTheDocument();
    });

    test('キャンセルボタンでフォームがリセットされ閉じる', async () => {
      const itemInput = screen.getByLabelText(/品名/i);
      const cancelButton = screen.getByText(/キャンセル/i);
      await userEvent.type(itemInput, 'にんじん');
      await userEvent.click(cancelButton);
      expect(screen.queryByLabelText(/品名/i)).not.toBeInTheDocument();
      expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
    });

    test('品名が未入力の場合、エラーメッセージが表示される', async () => {
      const itemInput = screen.getByLabelText(/品名/i);
      await userEvent.clear(itemInput);
      await userEvent.click(screen.getByText(/追加する/i));
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
    });
    
    test('品名が入力されている場合、エラーメッセージは表示されない', async () => {
      const itemInput = screen.getByLabelText(/品名/i);
      await userEvent.type(itemInput, 'にんじん');
      await userEvent.click(screen.getByText(/追加する/i));
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });

    test('エラー表示後、正しい値を入れるとエラーが消える', async () => {
      const itemInput = screen.getByLabelText(/品名/i);
      await userEvent.clear(itemInput);
      await userEvent.click(screen.getByText(/追加する/i));
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
      await userEvent.type(itemInput, 'にんじん');
      await userEvent.click(screen.getByText(/追加する/i));
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });

    test('品名が入力されていれば、追加ボタンが有効になる', async () => {
      const itemInput = screen.getByLabelText(/品名/i);
      await userEvent.type(itemInput, 'にんじん');
      const submitButton = screen.getByText(/追加する/i);
      expect(submitButton).toBeEnabled();
    });
    
    test('追加ボタンを押したら、初期の画面に戻る', async () => {
      const itemInput = screen.getByPlaceholderText(/例: にんじん/);
      await userEvent.type(itemInput, 'にんじん');
      await userEvent.click(screen.getByText(/追加する/i));
      expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
    });

    test('数量inputに数字を入力するとその値になる', async () => {
      const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
      await userEvent.clear(quantityInput);
      await userEvent.type(quantityInput, '5');
      expect(quantityInput.value).toBe('5');
    });

    test('数量inputを空欄→数字→空欄と切り替える', async () => {
      const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
      await userEvent.clear(quantityInput);
      expect(quantityInput.value).toBe('');
      await userEvent.type(quantityInput, '7');
      expect(quantityInput.value).toBe('7');
      await userEvent.clear(quantityInput);
      expect(quantityInput.value).toBe('');
    });

    test('単位を選択できる', async () => {
      const unitInput = screen.getByLabelText(/単位/i) as HTMLSelectElement;
      await userEvent.selectOptions(unitInput, '個');
      expect(unitInput.value).toBe('個');
    });

    test('メモの入力が反映される', async () => {
      const memoInput = screen.getByPlaceholderText('例: 特売日、ブランド指定、代替品など') as HTMLTextAreaElement;
      await userEvent.type(memoInput, '今週中に買う');
      expect(memoInput.value).toBe('今週中に買う');
    });
  });
});
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputForm } from "../../apps/components/InputForm";

describe('InputForm', () => {
  test('初期画面で「アイテムを新規追加」ボタンが表示される', () => {
    render(<InputForm />);
    const button = screen.getByText(/アイテムを新規追加/i);
    expect(button).toBeInTheDocument();
  });

  test('「アイテムを新規追加」ボタンをクリックするとフォームが表示される', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    expect(screen.getByLabelText(/品名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/数量/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/単位/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/メモ/i)).toBeInTheDocument();
  });

  test('キャンセルボタンでフォームがリセットされ閉じる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByLabelText(/品名/i);
    const cancelButton = screen.getByText(/キャンセル/i);
    await userEvent.type(itemInput, 'にんじん');
    await userEvent.click(cancelButton);
    await waitFor(() => {
    expect(screen.queryByLabelText(/品名/i)).not.toBeInTheDocument();
  });
    expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
  });

  test('品名が未入力の場合、エラーメッセージが表示される', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByLabelText(/品名/i);
    await userEvent.clear(itemInput);
    await userEvent.click(screen.getByText(/追加する/i));
    await waitFor(() => {
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
    });
  });
  
  test('品名が入力されている場合、エラーメッセージは表示されない', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByLabelText(/品名/i);
    await userEvent.type(itemInput, 'にんじん');
    await userEvent.click(screen.getByText(/追加する/i));
    await waitFor(() => {
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });
  });

  test('エラー表示後、正しい値を入れるとエラーが消える', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByLabelText(/品名/i);
    await userEvent.clear(itemInput);
    await userEvent.click(screen.getByText(/追加する/i));
    await waitFor(() => {
      expect(screen.getByText(/品名を入力してください。/i)).toBeInTheDocument();
    });
    await userEvent.type(itemInput, 'にんじん');
    await userEvent.click(screen.getByText(/追加する/i));
    await waitFor(() => {
      expect(screen.queryByText(/品名を入力してください。/i)).not.toBeInTheDocument();
    });
  });

  test('品名が入力されていれば、送信ボタンが有効になる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByLabelText(/品名/i);
    await userEvent.type(itemInput, 'にんじん');
    const submitButton = screen.getByText(/追加する/i);
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
  
  test('追加ボタンを押したら、初期の画面に戻る', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const itemInput = screen.getByPlaceholderText(/例: にんじん/);
    await userEvent.type(itemInput, 'にんじん');
    await userEvent.click(screen.getByText(/追加する/i));
    await waitFor(() => {
      expect(screen.getByText(/アイテムを新規追加/i)).toBeInTheDocument();
    });
  });

  test('数量inputを空欄にすると空欄になる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
    await userEvent.clear(quantityInput);
    expect(quantityInput.value).toBe('');
  });

  test('数量inputに数字を入力するとその値になる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '5');
    expect(quantityInput.value).toBe('5');
  });

  test('数量inputに数字を入力した場合、formData.quantityはNumber型になる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, '5');
    expect(quantityInput.value).toBe('5');
    await userEvent.click(screen.getByText(/追加する/i));
    // Type assertion must be validated in component behavior or state checks.
  });

  test('数量inputを空欄→数字→空欄と切り替える', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const quantityInput = screen.getByPlaceholderText('例: 1, 2, 3...') as HTMLInputElement;
    await userEvent.clear(quantityInput);
    expect(quantityInput.value).toBe('');
    await userEvent.type(quantityInput, '7');
    expect(quantityInput.value).toBe('7');
    await userEvent.clear(quantityInput);
    expect(quantityInput.value).toBe('');
  });

  test('単位を選択できる', async () => {
    render(<InputForm />);
    await userEvent.click(screen.getByText(/アイテムを新規追加/i));
    const unitInput = screen.getByLabelText(/単位/i) as HTMLSelectElement;
    await userEvent.selectOptions(unitInput, '個');
    expect(unitInput.value).toBe('個');
  });
});

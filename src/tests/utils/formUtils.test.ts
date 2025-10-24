import { 
  initialFormData, 
  validateFormData, 
  convertInputValue, 
  createNewItem, 
  type FormData 
} from "../../apps/utils/formUtils";
import type { Item } from "../../apps/types/Items";

describe("フォームユーティリティ関数のテスト", () => {

  describe("validateFormData 関数", () => {
    test("品名が空の場合はエラーを返す", () => {
      const data: FormData = { ...initialFormData, name: " " };
      const result = validateFormData(data);
      expect(result).toBe("品名を入力してください。");
    });

    test("品名が入力されている場合はエラーなし", () => {
      const data: FormData = { ...initialFormData, name: "にんじん" };
      const result = validateFormData(data);
      expect(result).toBeNull();
    });
  });

  describe("convertInputValue 関数", () => {
    test("数量が空文字の場合は undefined を返す", () => {
      const result = convertInputValue("quantity", "");
      expect(result).toBeUndefined();
    });

    test("数量が数字文字列の場合は number に変換される", () => {
      const result = convertInputValue("quantity", "5");
      expect(result).toBe(5);
      expect(typeof result).toBe("number");
    });

    test("数量以外のフィールドは文字列として返す", () => {
      const result = convertInputValue("name", "にんじん");
      expect(result).toBe("にんじん");
    });
  });

  describe("createNewItem 関数", () => {
    test("FormData から正しい Item オブジェクトを作成できる", () => {
      const data: FormData = {
        name: "牛乳",
        quantity: 2,
        unit: "L",
        memo: "低脂肪"
      };
      const newItem: Item = createNewItem(data);

      expect(newItem.id).toBeDefined();
      expect(newItem.name).toBe("牛乳");
      expect(newItem.quantity).toBe(2);
      expect(newItem.unit).toBe("L");
      expect(newItem.completed).toBe(false);
      expect(newItem.note).toBe("低脂肪");
    });

    test("省略可能なフィールドが空の場合も正しく処理される", () => {
      const data: FormData = {
        name: "食パン",
        quantity: undefined,
        unit: "",
        memo: ""
      };
      const newItem: Item = createNewItem(data);

      expect(newItem.id).toBeDefined();
      expect(newItem.name).toBe("食パン");
      expect(newItem.quantity).toBeUndefined();
      expect(newItem.unit).toBeUndefined();
      expect(newItem.note).toBeUndefined();
      expect(newItem.completed).toBe(false);
    });
  });

});
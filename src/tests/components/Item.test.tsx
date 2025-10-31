import { render, screen } from "@testing-library/react";
import { Item } from "../../apps/components/Item";
import type { Item as ItemType } from "../../apps/types/Items";

const mockItemWithAll: ItemType = {
  id: "1",
  name: "りんご",
  quantity: 2,
  unit: "個",
  note: "赤い",
  completed: false,
};

const mockItemWithoutOptional: ItemType = {
  id: "2",
  name: "バナナ",
  completed: true,
};

const renderItem = (item: ItemType) => render(<Item item={item} />);

const expectTextsToBeInDocument = (texts: (string | RegExp)[]) => {
  texts.forEach(text => expect(screen.getByText(text)).toBeInTheDocument());
};

const expectTextsNotToBeInDocument = (texts: (string | RegExp)[]) => {
  texts.forEach(text => expect(screen.queryByText(text)).toBeNull());
};

describe("Item コンポーネント", () => {
  test("name が表示される", () => {
    renderItem(mockItemWithAll);

    expectTextsToBeInDocument(["りんご"]);

    renderItem(mockItemWithoutOptional);

    expectTextsToBeInDocument(["バナナ"]);
  });

  test("quantity と unit がある場合は表示される", () => {
    renderItem(mockItemWithAll);

    expectTextsToBeInDocument(["(2 個)"]);
  });

  test("quantity が 0 または unit がない場合は表示されない", () => {
    renderItem(mockItemWithoutOptional);

    expectTextsNotToBeInDocument([/\(\d+ .*?\)/]);

    renderItem({ id: "3", name: "みかん", quantity: 0, completed: false });

    expectTextsNotToBeInDocument([/\(\d+ .*?\)/]);
  });

  test("note がある場合は表示される", () => {
    renderItem(mockItemWithAll);

    expectTextsToBeInDocument(["赤い"]);
  });

  test("note がない場合は表示されない", () => {
    renderItem(mockItemWithoutOptional);
    
    expectTextsNotToBeInDocument(["赤い"]);
  });
});

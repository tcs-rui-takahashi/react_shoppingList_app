import { render } from "@testing-library/react";
import { Item } from "../../apps/components/Item";

// FIXME: 現時点ではコンテンツ未実装のため container.firstChild で描画確認のみ。
// 将来的にユーザーが認識できる要素（role/text）を通じたテストに置き換える。
it("Itemが描画される", () => {
  const { container } = render(<Item />);
  expect(container.firstChild).toBeInTheDocument();
});

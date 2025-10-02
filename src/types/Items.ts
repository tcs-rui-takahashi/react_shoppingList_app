export interface Item {
  id: string;             // 一意のID
  name: string;           // 品名
  quantity?: number;      // 数量（任意）
  unit?: string;          // 単位（例：個、箱など）（任意）
  completed: boolean;     // 購入済みかどうか
  plannedDate?: Date;     // 購入予定日（任意）
  purchaseDate?: Date;    // 実際に購入した日（任意）
  note?: string;          // メモ（任意）
}
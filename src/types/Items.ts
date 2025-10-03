export interface Item {
  id: string;             
  name: string;           
  quantity?: number;      
  unit?: string;          
  completed: boolean;     
  plannedDate?: Date;     
  purchaseDate?: Date;    
  note?: string;       
}
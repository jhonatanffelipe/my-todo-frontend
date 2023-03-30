import ICategory from "./ICategory";

export default interface ITask {
  id: string;
  userId: string;
  categoryId?: string;
  title: string;
  description: string;
  when: Date;
  done: boolean;
  category: ICategory;
}

export default class Category {
  constructor(category, color, type) {
    this.category = category;
    this.color = color;
    this.type = type ? type : 'expense';
  }
}

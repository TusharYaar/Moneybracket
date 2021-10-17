export default class Category {
  constructor(category, imageUri, type) {
    this.category = category;
    this.imageUri = imageUri;
    this.type = type ? type : 'expense';
  }
}

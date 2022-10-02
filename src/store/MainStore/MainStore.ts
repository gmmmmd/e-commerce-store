import ProductsStore from './../ProductsStore';
import SingleProductStore from './../SingleProductStore';

export default class MainStore {
  ProductsStore: ProductsStore;
  SingleProductStore: SingleProductStore;

  constructor() {
    this.ProductsStore = new ProductsStore();
    this.SingleProductStore = new SingleProductStore();
  }
}

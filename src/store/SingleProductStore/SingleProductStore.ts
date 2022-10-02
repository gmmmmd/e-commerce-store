import { Meta } from '@utils/meta';
import axios from 'axios';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { IProduct } from 'src/types/productType';

type PrivateFields =
  | '_category'
  | '_meta'
  | '_relatedProducts'
  | '_product'
  | '_id';

export default class SingleProductStore {
  private _id: string | undefined;
  private _meta: Meta = Meta.initial;
  private _category: string = '';
  private _relatedProducts: [] = [];
  private _product: IProduct = {
    id: '',
    image: '',
    category: '',
    title: '',
    description: '',
    price: 0,
  };

  constructor() {
    makeObservable<SingleProductStore, PrivateFields>(this, {
      _meta: observable,
      _category: observable,
      _relatedProducts: observable.ref,
      _product: observable,
      _id: observable,
      id: computed,
      meta: computed,
      category: computed,
      relatedProducts: computed,
      product: computed,
      setId: action.bound,
      getFullProduct: action.bound,
      getRelatedProducts: action.bound,
    });
  }

  get id() {
    return this._id;
  }

  get meta(): Meta {
    return this._meta;
  }

  get category(): string {
    return this._category;
  }

  get relatedProducts(): [] {
    return this._relatedProducts;
  }

  get product(): IProduct {
    return this._product;
  }

  setId = (item: string | undefined) => {
    this._id = item;
  };

  getFullProduct = async (): Promise<void> => {
    if (this.meta === Meta.loading) {
      return;
    }

    this._meta = Meta.loading;

    try {
      const productData = await axios.get(
        `https://fakestoreapi.com/products/${this._id}`
      );
      runInAction(() => {
        this._product = productData.data;
        this._category = productData.data.category;
        this._meta = Meta.success;
      });
    } catch (error) {
      this._meta = Meta.error;
      alert('server disabled');
    }
  };

  getRelatedProducts = async (): Promise<void> => {
    try {
      const productData = await axios.get(
        `https://fakestoreapi.com/products/category/${this._category}`
      );
      runInAction(() => {
        this._relatedProducts = productData.data;
      });
    } catch (error) {
      alert('server disabled');
    }
  };
}

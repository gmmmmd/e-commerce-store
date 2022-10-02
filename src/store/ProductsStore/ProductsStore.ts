import { Meta } from '@utils/meta';
import axios from 'axios';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { IProduct } from 'src/types/productType';

import rootStore from './../RootStore';

type PrivateFields =
  | '_productsList'
  | '_meta'
  | '_categories'
  | '_searchCategory'
  | '_query';

export default class ProductsStore {
  private _productsList: IProduct[] = [];
  private _meta: Meta = Meta.initial;
  private _categories: string[] = [];
  private _searchCategory: string = '';
  private _query: string = '';

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _productsList: observable.ref,
      _meta: observable,
      _categories: observable.ref,
      _searchCategory: observable,
      _query: observable,
      getCategories: action.bound,
      getProductsList: action.bound,
      getSearchCategory: action.bound,
      setSearchCategory: action.bound,
      setQuery: action.bound,
      meta: computed,
      productsList: computed,
      categories: computed,
      searchCategory: computed,
      query: computed,
    });
  }

  get query(): string {
    return this._query;
  }

  get productsList(): IProduct[] {
    return this._productsList;
  }

  get meta(): Meta {
    return this._meta;
  }

  get categories(): string[] {
    return this._categories;
  }

  get searchCategory(): string {
    return this._searchCategory;
  }

  // value запроса
  setQuery = (item: string) => {
    this._query = item;
    rootStore.query.setSearch(item);
  };

  // запрос по Value
  getSearch = async (): Promise<void> => {
    try {
      const getCategoryes = await axios.get(
        'https://fakestoreapi.com/products'
      );
      this._productsList = getCategoryes.data.filter(
        (item: { title: string; description: string }) => {
          return (
            item.title.toLowerCase().includes(this._query.toLowerCase()) ||
            item.description.toLowerCase().includes(this._query.toLowerCase())
          );
        }
      );
      this._query = '';
    } catch (error) {
      alert('server disabled');
    }
  };

  // Запрос сущностей
  getProductsList = async (): Promise<void> => {
    if (this.meta === Meta.loading || this.meta === Meta.success) {
      return;
    }

    this._meta = Meta.loading;
    this._productsList = [];

    try {
      const productData = await axios.get('https://fakestoreapi.com/products');
      runInAction(() => {
        this._productsList = productData.data;
        this._meta = Meta.success;
      });
    } catch (error) {
      this._meta = Meta.error;
      alert('server disabled');
    }
  };

  //загрузка всех категорий
  getCategories = async (): Promise<void> => {
    this._categories = [];
    try {
      const categoriesData = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );
      this._categories = categoriesData.data;
    } catch (error) {
      alert('server disabled');
    }
  };

  // смена категории в Select
  setSearchCategory = (item: string): void => {
    this._searchCategory = item;
  };

  // Поиск по категории
  getSearchCategory = async (): Promise<void> => {
    try {
      const getCategoryes = await axios.get(
        `https://fakestoreapi.com/products/category/${this._searchCategory}`
      );
      this._productsList = getCategoryes.data;
    } catch (error) {
      alert('server disabled');
    }
  };

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => {
      rootStore.query.getParams('search');
    },
    (search) => {
      console.log('search value change', search);
    }
  );
}

import React, { useContext, useEffect } from 'react';

import Loader from '@components/Loader';
import { LoaderSize } from '@components/Loader/Loader';
import ProductFullCard from '@components/ProductFullCard';
import RelatedItems from '@components/RelatedItems';
import { Meta } from '@utils/meta';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { StoreContext } from '../../App/App';

const SingleProductPage: React.FC = () => {
  const context = useContext(StoreContext);
  const { SingleProductStore } = context;

  const { id } = useParams();

  useEffect(() => {
    SingleProductStore.setId(id);

    SingleProductStore.getFullProduct();

    window.scrollTo(0, 0);
  }, [SingleProductStore, id]);

  useEffect(() => {
    if (SingleProductStore.category) {
      SingleProductStore.getRelatedProducts();
    }
  }, [SingleProductStore, SingleProductStore.category]);

  if (SingleProductStore.meta === Meta.loading) {
    return <Loader size={LoaderSize.l} />;
  }

  return (
    <main className="Container">
      <ProductFullCard />
      <RelatedItems />
    </main>
  );
};

export default observer(SingleProductPage);

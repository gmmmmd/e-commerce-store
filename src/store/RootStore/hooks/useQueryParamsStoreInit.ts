import * as Router from 'react-router-dom';

import rootStore from '../instanse';

export const useQueryParamsStoreInit = (): void => {
  const { search } = Router.useLocation();

  rootStore.query.setSearch(search);
  console.log(rootStore.query.setSearch(search));
  console.log(search);
  console.log(Router.useLocation());
};

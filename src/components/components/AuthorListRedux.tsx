import React, { memo } from 'react';
import { USER_TYPE } from 'src/enums';
import { IProcessTracking } from 'src/types/processTracking.types';

import UserTopSeller from './UserTopSeller';

interface Iprops {
  data: IProcessTracking[];
  type: USER_TYPE;
}

const AuthorList: React.FC<Iprops> = (props) => {
  const { data } = props;
  return (
    <div>
      <ol className="author_list">
        {data &&
          data.map((item, index) => (
            <li key={index}>
              <UserTopSeller
                user={item.userInfo || []}
                totalPrice={item.price}
              />
            </li>
          ))}
      </ol>
    </div>
  );
};
export default memo(AuthorList);

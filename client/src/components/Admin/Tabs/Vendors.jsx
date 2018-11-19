import React from 'react';

import Tabs from '../../common/Tab/Index';
import Vendors from '../Vendors/Vendors';
import Engagement from '../Engagements/Index';

const Index = () => (
  <div>
    <Tabs>
      <div label="Engagement">
        <Engagement />
      </div>
      <div label="Vendors">
        <Vendors />
      </div>
    </Tabs>
  </div>
);

export default Index;
import * as React from 'react';
import { action } from '@/utils/action';
import { Tabs, Heading, Dropdown, Button, Input, Tab } from '@/index';

// CSF format story
export const tabsWithCount = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const options = [
    {
      label: 'Increasing',
      value: 'Increasing',
    },
    {
      label: 'Decreasing',
      value: 'Decreasing',
    },
  ];

  const onTabChangeHandler = (tabIndex) => {
    setActiveIndex(tabIndex);
    return action(`tab-change: ${tabIndex}`)();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Heading size="m" className="pl-5">
          Strategy
        </Heading>
        <Button appearance="primary">New Strategy</Button>
      </div>
      <div className="d-flex align-items-center mt-3">
        <Tabs activeIndex={activeIndex} onTabChange={onTabChangeHandler} className="mb-6">
          <Tab label="All" count={12} className="pl-5">
            <div>All</div>
          </Tab>
          <Tab label="Active User" count={3} className="pl-5">
            <div>Active User</div>
          </Tab>
          <Tab label="Inactive User" count={9} className="pl-5">
            <div>Inactive User</div>
          </Tab>
          <div className="d-flex align-items-center">
            <div style={{ width: 'var(--spacing-9)' }} className="ml-8">
              <Input placeholder="Search by name" icon="search" />
            </div>
            <div style={{ width: 'var(--spacing-8)' }} className="ml-4">
              <Dropdown options={options} placeholder="Sort by" />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const customCode = `() => {
  const options = [
    {
      label: 'Increasing',
      value: 'Increasing',
    },
    {
      label: 'Decreasing',
      value: 'Decreasing'
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onTabChangeHandler = (tabIndex) => {
    setActiveIndex(tabIndex);
  };

  return(
    <div>
      <div className="d-flex justify-content-between">
        <Heading size="m" className="pl-5">Strategy</Heading>
        <Button appearance="primary">New Strategy</Button>
      </div>
      <div className="d-flex align-items-center mt-3" >
        <Tabs
          onTabChange={onTabChangeHandler}
          className="mb-6"
          activeIndex={activeIndex}
        >
          <Tab label="All" count={12} className="pl-5">
            <div>All</div>
          </Tab>
          <Tab label="Active User" count={3} className="pl-5">
            <div>Active User</div>
          </Tab>
          <Tab label="Inactive User" count={9} className="pl-5">
            <div>Inactive User</div>
          </Tab>
          <div className="d-flex align-items-center">
            <div style={{ width: 'var(--spacing-9)' }} className="ml-8">
              <Input placeholder="Search by name" icon="search" />
            </div>
            <div style={{ width: 'var(--spacing-8)' }} className="ml-4">
              <Dropdown options={options} placeholder="Sort by" />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}`;

export default {
  title: 'Components/Tabs/Tabs With Count',
  component: Tabs,
  parameters: {
    docs: {
      docPage: {
        customCode,
      },
    },
  },
};

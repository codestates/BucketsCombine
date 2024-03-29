import React from 'react';

import { Tag } from '../Tag';

export default {
  title: 'Example/Tag',
  component: Tag
};

const Template = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Tag'
};
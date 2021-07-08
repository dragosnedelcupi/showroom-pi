import React from 'react'
import { Story, Meta } from '@storybook/react'

import Button, { IButtonProps } from './Button'
import { SetupWrapper } from '../../../../SetupWrapper'

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<IButtonProps> = (args) => (
  <SetupWrapper>
    <Button className="btn btnPrimary" {...args}>
      Button
    </Button>
  </SetupWrapper>
)

export const Primary = Template.bind({})
Primary.args = {
  loading: false,
}

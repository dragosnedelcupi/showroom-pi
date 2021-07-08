import React from 'react'
import { Meta, Story } from '@storybook/react'
import useFormHook from './formHook'
import DynamicFormattedMessage from '../../components/common/ui/DynamicFormattedMessage'
import TextInput from './atoms/TextInput'
import SelectInput from './atoms/SelectInput'
import YesNoInput from './atoms/YesNoInput'
import Checkbox from './atoms/Checkbox'
import { SetupWrapper } from '../../SetupWrapper'

export default {
  title: 'Form/React-Hook',
  component: useFormHook as any,
} as Meta

const Example: Story<any> = () => {
  const {
    form: { register, handleSubmit, errors, reset, watch },
    onSubmit,
    options,
  } = useFormHook()
  const watchDeveloper = watch('developer')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container mt5">
        <DynamicFormattedMessage
          tag="span"
          id="reactHookFormExample"
          className="text-center text-4xl pb-8 inline-block"
        />
        <div className="formRow">
          <TextInput
            name="name"
            id="firstName"
            register={register({ required: true, maxLength: 80 })}
            error={errors.name}
          />
          <TextInput
            name="lastName"
            id="lastName"
            register={register({ required: true, maxLength: 80 })}
            error={errors.lastName}
          />
          <TextInput
            name="email"
            id="email"
            register={register({
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'email',
              },
            })}
            error={errors.email}
          />
          <SelectInput
            name="title"
            id="title"
            register={register({ required: true })}
            options={options}
          />
          <YesNoInput
            name="developer"
            id="developer"
            register={register}
            error={errors.developer}
          />
          {watchDeveloper === 'Yes' && (
            <Checkbox
              name="human"
              id="human"
              register={register({ required: true })}
              error={errors.human}
            />
          )}
          <div className="flex content-center">
            <button className="btn btnPrimary mr-4">Save</button>
            <button
              type="button"
              className="btn btnDanger ml3"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

const Template: Story<any> = () => (
  <SetupWrapper>
    <Example />
  </SetupWrapper>
)

export const Primary = Template.bind({})
Primary.args = {}

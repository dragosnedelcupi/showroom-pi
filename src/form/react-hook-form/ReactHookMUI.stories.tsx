import React, { FC } from 'react'
import { Meta, Story } from '@storybook/react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import useFormHook from './formHook'
import DynamicFormattedMessage from '../../components/common/ui/DynamicFormattedMessage'
import TextInput from './atoms/mui/TextInput'
import SelectInput from './atoms/mui/SelectInput'
import YesNoInput from './atoms/mui/YesNoInput'
import CheckboxMui from './atoms/mui/Checkbox'
import { SetupWrapper } from '../../SetupWrapper'

export default {
  title: 'Form/React-Hook',
  component: useFormHook as any,
} as Meta

const Example: FC = () => {
  const {
    form: { handleSubmit, errors, reset, watch, control },
    onSubmit,
    options,
  } = useFormHook()
  const watchDeveloper = watch('developer')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          <DynamicFormattedMessage tag="span" id="reactHookFormExample" />
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="name"
              id="firstName"
              error={errors.name}
              rules={{ required: true, maxLength: 80 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextInput
              control={control}
              name="lastName"
              label="lastName"
              id="lastName"
              error={errors.lastName}
              rules={{ required: true, maxLength: 80 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextInput
              control={control}
              name="email"
              id="email"
              label="email"
              rules={{
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'email',
                },
              }}
              error={errors.email}
            />
          </Grid>

          <Grid item xs={6}>
            <SelectInput
              name="title"
              id="title"
              options={options}
              control={control}
            />
          </Grid>

          <Grid item xs={6}>
            <YesNoInput
              name="developer"
              id="developer"
              error={errors.developer}
              control={control}
            />
          </Grid>

          {watchDeveloper === 'Yes' && (
            <Grid item xs={6}>
              <CheckboxMui
                control={control}
                name="human"
                id="human"
                rules={{ required: true }}
                error={errors.human}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Box display="flex">
              <Box mr={2}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}
const Template: Story<any> = () => (
  <SetupWrapper>
    <Example />
  </SetupWrapper>
)

export const MUI = Template.bind({})
MUI.args = {}

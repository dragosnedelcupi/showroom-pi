import React, { Dispatch, SetStateAction } from 'react'
import { FormRenderProps } from 'react-final-form'
import { Box, Button } from '@material-ui/core'
import DynamicFormattedMessage from '../../../../components/common/ui/DynamicFormattedMessage'

enum FormState {
  ADD = 0,
  VIEW = 1,
  EDIT = 2,
}

interface IFormButtons extends FormRenderProps<any> {
  editState?: [FormState, Dispatch<SetStateAction<FormState>>]
  disabled?: boolean
  canEdit?: boolean
}

/**
 * Component used for handling form submissions or resets
 * {@code FORM_STATE} is used to manage the current options the user has over the parent form
 *
 * @param form
 * @param submitting
 * @param pristine
 * @param disabled
 * @param editState
 * @param canEdit
 * @constructor
 */
export const FormButtons = ({
  form,
  submitting,
  pristine,
  disabled = submitting,
  editState = [FormState.ADD, () => null],
  canEdit = true,
}: IFormButtons) => {
  const [formState, setFormState] = editState

  if (formState === FormState.VIEW && canEdit) {
    return (
      <DynamicFormattedMessage
        tag={Button}
        id="form.button.edit"
        onClick={() => setFormState(FormState.EDIT)}
        disabled={disabled}
      />
    )
  }

  if (formState === FormState.EDIT || formState === FormState.ADD) {
    return (
      <Box display="flex">
        <Box mr={2}>
          <DynamicFormattedMessage
            tag={Button}
            id="form.button.save"
            type="submit"
            disabled={disabled}
            variant="contained"
            color="primary"
          />
        </Box>
        <Box>
          <DynamicFormattedMessage
            id="form.button.reset"
            tag={Button}
            onClick={() => {
              form.restart()
              if (formState === FormState.EDIT) setFormState(FormState.VIEW)
            }}
            disabled={formState !== FormState.EDIT && (disabled || pristine)}
            variant="contained"
            color="secondary"
          />
        </Box>
      </Box>
    )
  }

  return null
}

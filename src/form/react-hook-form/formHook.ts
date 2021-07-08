import { useForm } from 'react-hook-form'

interface IReactHookFormData {
  name: string
  lastName: string
  email: string
  title: string
  developer: string
  human: string
}
const useFormHook = () => {
  const options = ['Mr', 'Mrs', 'Miss', 'Dr']

  const form = useForm<IReactHookFormData>()

  const onSubmit = (data: IReactHookFormData) =>
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 2))

  return { form, onSubmit, options }
}

export default useFormHook

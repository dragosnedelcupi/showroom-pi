import { selector } from 'recoil'
import { todoListAtom, todoListFilterAtom } from '../atoms/todoAtoms'
import { Category } from '../../constants/todo'
import { TodoItem } from '../atoms'

export const filteredTodoListSelector = selector<TodoItem[]>({
  key: 'todoSelector',
  get: ({ get }) => {
    const filteredCategory = get(todoListFilterAtom)
    return get(todoListAtom).filter(
      (todo) =>
        filteredCategory === Category.ALL || todo.category === filteredCategory
    )
  },
})

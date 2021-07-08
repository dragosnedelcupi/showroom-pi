import { atom, AtomEffect } from 'recoil'
import { Category, ICategory } from '../../constants/todo'
import StorageUtils from '../../utils/storage'
import { TodoItem } from './index'

/**
 * Sets a cached value on initialise
 *
 * @param setSelf
 */
const localStorageCache: AtomEffect<TodoItem[]> = ({ setSelf }) => {
  const storageValue = StorageUtils.getLocalStorageValue('recoilTodoSlice')
  if (storageValue !== null) {
    setSelf(storageValue)
  }
}

/**
 * Updates local cache with the current value
 *
 * @param onSet
 */
const updateLocalCacheEffect: AtomEffect<TodoItem[]> = ({ onSet }) => {
  onSet((newValue) =>
    StorageUtils.setLocalStorageValue('recoilTodoSlice', newValue)
  )
}

/**
 * Contains all todos used
 */
export const todoListAtom = atom<TodoItem[]>({
  key: 'todoList',
  default: [],
  effects_UNSTABLE: [localStorageCache, updateLocalCacheEffect],
})

/**
 * Contains all todos used
 */
export const todoListFilterAtom = atom<ICategory>({
  key: 'todoListFilter',
  default: Category.ALL,
})

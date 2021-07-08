import { TodoItem } from '../recoil/atoms'

/**
 * Declares keys to be used in localStorage
 * Can be exported to be used as a global constant inside the project, but the functions already offer autocomplete
 *
 * @example loginCode : 'authLogin'
 */
const storageKeys = {
  recoilTodoSlice: 'recoilTodoSlice',
} as const

/**
 * Defines types of data stored at provided keys
 *
 * @example[storageKeys.loginCode]: Interface | null
 */
interface ILocalStorage {
  [storageKeys.recoilTodoSlice]: TodoItem[] | null
}

/**
 * Defines default values for each value in the localStorage
 *
 * @example authLogin: null
 */
const defaultValues: ILocalStorage = {
  recoilTodoSlice: null,
}

type TLocalStorageKey = typeof storageKeys[keyof typeof storageKeys]

/**
 * Wrapper over localStorage with Typescript support
 *
 * @example StorageUtils.getLocalStorageValue('authLogin')
 */
export default class StorageUtils {
  /**
   * Retrieves value stored locally for {@param key} or returns provided/above defined default value
   *
   * @param key
   * @param defaultValue
   * @param typeCast
   */
  static getLocalStorageValue<
    K extends TLocalStorageKey,
    T extends ILocalStorage[K]
  >(key: K, defaultValue: T = defaultValues[key] as T): T {
    try {
      const item = localStorage.getItem(key)
      if (item && !item.includes('{')) return item as unknown as T

      const value = JSON.parse(item || '')
      if (value != null) return value as T
    } catch (e) {
      // do nothing
    }

    return defaultValue
  }

  /**
   * Updates value for {@param key} on local storage
   * @param key
   * @param value
   */
  static setLocalStorageValue<
    K extends TLocalStorageKey,
    T = typeof defaultValues[K]
  >(key: K, value: T): void {
    localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  }

  /**
   * Removes provided key from storage
   * @param key
   */
  static removeLocalStorageValue<K extends TLocalStorageKey>(key: K): void {
    localStorage.removeItem(key)
  }
}

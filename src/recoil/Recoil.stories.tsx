import React, { FC, useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Category, ICategory } from '../constants/todo'
import { todoListAtom, todoListFilterAtom } from './atoms/todoAtoms'
import { filteredTodoListSelector } from './selectors/todoSelectors'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import Button from '../components/common/ui/button/Button'
import { SetupWrapper } from '../SetupWrapper'

export default {
  title: 'Global State/Recoil',
  component: todoListAtom as any,
} as Meta

const CategoryValues = Object.values(Category)

const Example: FC<any> = () => {
  const intl = useIntl()
  const [newTodo, setNewTodo] = useState('')
  const [category, setCategory] = useState<ICategory>(Category.ALL)

  const [allTodos, setTodos] = useRecoilState(todoListAtom)
  const [sorting, setSorting] = useRecoilState(todoListFilterAtom)
  const filteredTodos = useRecoilValue(filteredTodoListSelector)

  const addNewTodo = () => {
    setNewTodo('')
    setTodos((prevTodos) => [...prevTodos, { data: newTodo, category }])
  }

  return (
    <section className="container pt5">
      <div className="row">
        <div className="colMd8 offsetMd2">
          <div className="row">
            <div className="col12">
              <h1 className="textCenter mb5">Todo List</h1>
            </div>
            <div className="col12">
              <h4>Add item</h4>
            </div>
            <div className="inputGroup colMd5">
              <select
                className="inputField py0"
                onChange={({ target }) =>
                  setCategory(target.value as ICategory)
                }
                value={category}
              >
                {CategoryValues.map((option) => (
                  <option value={option} key={option}>
                    {intl.formatMessage({ id: option })}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputGroup colMd5 wFull">
              <input
                className="inputField"
                type="text"
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
              />
            </div>
            <div className="colMd2">
              <DynamicFormattedMessage
                id="form.button.save"
                shouldRender={!!newTodo}
                tag={Button}
                className="btn btnPrimary wFull"
                onClick={addNewTodo}
              />
            </div>
          </div>
          <div className="row mt15">
            <div className="inputGroup colMd6 offset3">
              <h4>Sorting</h4>
              <select
                className="inputField py0"
                onChange={({ target }) => setSorting(target.value as ICategory)}
                value={sorting}
              >
                {CategoryValues.map((option) => (
                  <option value={option} key={option}>
                    {intl.formatMessage({ id: option })}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col4 offset4 textCenter">
          <ul className="listUnstyled mt3 mh400 overflowAuto" key={sorting}>
            {filteredTodos.map((elem) => (
              <li className="py1 borderBottomDefault" key={elem.data}>
                <strong className="dFlex justifyContentBetween">
                  <span className="pr2">{elem.data}</span>
                  <span className="textPrimary pr2">
                    {intl.formatMessage({ id: elem.category })}
                  </span>
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="colMd2 containerFluid py2">
        <DynamicFormattedMessage
          id="form.button.reset"
          shouldRender={allTodos.length > 0}
          tag={Button}
          className="btn btnPrimary wFull"
          onClick={() => setTodos([])}
        />
      </div>
    </section>
  )
}

const Template: Story = () => (
  <SetupWrapper>
    <Example />
  </SetupWrapper>
)

export const Primary = Template.bind({})
Primary.args = {}

export const CounterMockData: [
  string,
  Record<string, string | number | undefined>
][] = [
  [
    'Increment',
    {
      payload: undefined,
      type: 'CounterReducer/increment',
    },
  ],
  [
    'Increment by 3',
    {
      payload: 3,
      type: 'CounterReducer/incrementBy',
    },
  ],
  [
    'Decrement',
    {
      payload: undefined,
      type: 'CounterReducer/decrement',
    },
  ],
]

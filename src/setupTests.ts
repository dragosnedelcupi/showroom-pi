import { configure } from '@testing-library/react'
import 'mutationobserver-shim'
import '@testing-library/jest-dom'

configure({ testIdAttribute: 'id' })

import {
  PAGE_TYPES
} from '.'

describe('Given Constants', () => {
  it('should match PAGE_TYPES', () => {
    expect(PAGE_TYPES).toMatchSnapshot()
  })
})

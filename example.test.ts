import {expect, test, describe, vi, Mocked} from 'vitest'
import { testFn, request } from './utils'

import axios from 'axios'
vi.mock('axios') //现在的axios是被模拟的axios了
const mockedAxios = axios as Mocked<typeof axios> //被模拟以后的axios会缺失一些方法写这个会让.后面能看到方法

test('test', () => {
  const name = 'viking'
  expect(name).toBe('viking')
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
  expect(0).toBeGreaterThan(-1)
  expect(0).toBeLessThan(1)
  // expect({name: 'liu'}).toBe({name: 'liu'})
  expect({name: 'liu'}).toEqual({name: 'liu'})
})

describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(10, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(10)
  })
  test('spy on method', () => {
    const obj = {
      getname: () => 1
    }
    const spy = vi.spyOn(obj, 'getname')
    obj.getname()
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
    // expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({data: 1})) //手动控制模拟以后的axios的get的返回数据
    mockedAxios.get.mockResolvedValue({data:1})
    const result = await request()
    expect(result).toBe(1)
  })
})


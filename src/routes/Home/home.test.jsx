import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import Home from './index';

//bugs https://github.com/ant-design/ant-design/issues/21096
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('axios', () => ({
  get: jest.fn(() => {
    return Promise.resolve({ data: { list: 
      [ { dt: 1595181600, 
        main: { temp: 27.29, temp_min: 27.29, temp_max: 28.33 }, 
        dt_txt: '2020-07-19 18:00:00' }, 
      { dt: 1595192400, 
        main: { temp: 27.54, temp_min: 27.54, temp_max: 27.88 }, 
        dt_txt: '2020-07-19 21:00:00' }, 
      { dt: 1595203200, 
        main: { temp: 27.73, temp_min: 27.73, temp_max: 27.83 }, 
        dt_txt: '2020-07-20 00:00:00' }, 
      { dt: 1595214000, 
        main: { temp: 31.36, temp_min: 31.36, temp_max: 31.4 }, 
        dt_txt: '2020-07-20 03:00:00' }, 
      { dt: 1595224800, 
        main: { temp: 33.49, temp_min: 33.49, temp_max: 33.49 }, 
        dt_txt: '2020-07-20 06:00:00' }, 
      { dt: 1595235600, 
        main: { temp: 31.51, temp_min: 31.51, temp_max: 31.51 }, 
        dt_txt: '2020-07-20 09:00:00' } ],
      }})
  })
}))

describe('test home page component', () => {
  it('should render correcly', () => {
    const { container } = render(<Home/>)
    const empty = container.querySelector('.ant-empty-description')
    expect(empty).toHaveTextContent('No Data');
    expect(container).toBeTruthy()
  })

  it('should show data weather correcly', async () => {
    const { container } = render(<Home/>)
    const button = container.querySelector('button');

    await act(() => {
      fireEvent.click(button);
    });

    const tBody = container.querySelector('tbody');
    expect(tBody.childElementCount).toEqual(3);

    const result = [
      { key: 0, date: '2020-07-19', temp: '27.41', diff: '1.04' },
      { key: 1, date: '2020-07-20', temp: '31.02', diff: '5.76' },
      {
        key: 'avegare',
        date: 'Rata-rata',
        temp: '29.21',
        diff: '3.40'
      }
    ];

    //field 0
    expect(tBody.children[0].children[0]).toHaveTextContent(result[0].date);
    expect(tBody.children[0].children[1]).toHaveTextContent(result[0].temp);
    expect(tBody.children[0].children[2]).toHaveTextContent(result[0].diff);

    //field 1
    expect(tBody.children[1].children[0]).toHaveTextContent(result[1].date);
    expect(tBody.children[1].children[1]).toHaveTextContent(result[1].temp);
    expect(tBody.children[1].children[2]).toHaveTextContent(result[1].diff);

    //field 2
    expect(tBody.children[2].children[0]).toHaveTextContent(result[2].date);
    expect(tBody.children[2].children[1]).toHaveTextContent(result[2].temp);
    expect(tBody.children[2].children[2]).toHaveTextContent(result[2].diff);
  })  
})
import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react';
import App from './App'
import Province from './components/Province'
import Territories from './components/Territories';
import { getCovid19Info, getProvincesData, getTerritories } from './api'
import Covid19 from './components/Covid19'
import Provinces from './components/Provinces';

//Test the functionalities of Show/Hide Capital button
test('renders <Province>', () => {
    const { getByRole } = render(<Province />)
    const button = getByRole('button')
    expect(button.innerHTML).toBe("Show Capital")
    fireEvent.click(button)
    expect(button.innerHTML).toBe("Hide Capital")
})

//mocking and api test
jest.mock('./api')

//mock Covid19 api response
const mockCovidResponse = {
    data: [
        {
            latest_date: "2021-08-09",
            change_cases: "575",
            change_fatalities: "1",
            total_cases: "1439809",
            total_fatalities: "26670",
            total_vaccinated: "23379756"
        }
    ]
}

//check for Covid19 call
test('renders <Covid19>', async () => {
    getCovid19Info.mockResolvedValueOnce(mockCovidResponse)
    const { getByText } = render(<Covid19 />)
    await waitFor(() => expect(getCovid19Info).toHaveBeenCalledTimes(1))
    expect(getByText('2021-08-09')).toBeTruthy()

    getCovid19Info.mockReset()
})

//mock Provinces data
const mockProvincesData = [
        {
            name: 'Ontario',
            capital: 'Toronto',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg'
        },
        {
            name: 'Quebec',
            capital: 'Quebec City',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg'
        },
        {
            name: 'Nova Scotia',
            capital: 'Halifax',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Nova_Scotia.svg'
        },
        {
            name: 'New Brunswick',
            capital: 'Fredericton',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg'
        },
        {
            name: 'Manitoba',
            capital: 'Winnipeg',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg'
        },
        {
            name: 'British Columbia',
            capital: 'Victoria',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg'
        },
        {
            name: 'Prince Edward Island',
            capital: 'Charlottetown',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Prince_Edward_Island.svg'
        },
        {
            name: 'Saskatchewan',
            capital: 'Regina',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Saskatchewan.svg'
        },
        {
            name: 'Alberta',
            capital: 'Edmonton',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg'
        },
        {
            name: 'Newfoundland and Labrador',
            capital: 'St. John\'s',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Newfoundland_and_Labrador.svg'
        }
]

//check for Provinces call
test('renders <Provinces>', async () => {
    getProvincesData.mockResolvedValueOnce(mockProvincesData)
    const { getByText } = render(<Provinces />)
    await waitFor(() => expect(getProvincesData).toHaveBeenCalledTimes(1))
    
    //check if Ontario is present as a province
    expect(getByText('Ontario')).toBeTruthy()

    getProvincesData.mockReset()
})

//check if the no. of provinces rendered are 10
test('check provinces count' , async() => {
    getProvincesData.mockResolvedValueOnce(mockProvincesData)
    const { getAllByRole } = render(<Provinces />)
    await waitFor(() => expect(getProvincesData).toHaveBeenCalledTimes(1))

    const provinces_length = getAllByRole('heading')
    expect(provinces_length.length).toBe(10)

    getProvincesData.mockReset()
})

//mock Territories data
const mockTerretoriesData = [
        {
            name: 'Northwest Territories',
            capital: 'Yellowknife',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_the_Northwest_Territories.svg'
        },
        {
            name: 'Yukon',
            capital: 'Whitehorse',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_Yukon.svg'
        },
        {
            name: 'Nunavut',
            capital: 'Iqaluit',
            flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg'
        }
]

//check for Territories Call
test('renders <Territories>', async () => {
    getTerritories.mockResolvedValueOnce(mockTerretoriesData)
    const { getByText } = render(<Territories />)
    await waitFor(() => expect(getTerritories).toHaveBeenCalledTimes(1))
    expect(getByText('Nunavut')).toBeTruthy()

    getTerritories.mockReset()
})

//check if the no. of territories rendered are 3
test('check territories count' , async() => {
    getTerritories.mockResolvedValueOnce(mockTerretoriesData)
    const { getAllByRole } = render(<Territories />)
    await waitFor(() => expect(getTerritories).toHaveBeenCalledTimes(1))

    const territories_length = getAllByRole('heading')
    expect(territories_length.length).toBe(3)
    
    getTerritories.mockReset()
})

//check if 3 components (Provinces, Territories, Covid19) are rendered in App
// test('check for 3 components', async () => {
//     getCovid19Info.mockResolvedValueOnce(mockCovidResponse)
//     render(<Covid19 />)
//     await waitFor(() => expect(getCovid19Info).toHaveBeenCalledTimes(1))

//     getProvincesData.mockResolvedValueOnce(mockProvincesData)
//     render(<Provinces />)
//     await waitFor(() => expect(getProvincesData).toHaveBeenCalledTimes(1))

//     getTerritories.mockResolvedValueOnce(mockTerretoriesData)
//     render(<Territories />)
//     await waitFor(() => expect(getTerritories).toHaveBeenCalledTimes(1))

//     const { getAllByRole } = render(<App />)
//     const components = getAllByRole('paragraph')
//     expect(components.length).toBe(3)
// })

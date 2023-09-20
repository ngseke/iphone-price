import dayjs from 'dayjs'
import { type Price } from '../types/Currency'
import { earliestReleasedAt } from './iphone'

export interface TaiwanMinimumWage {
  implementedAt: `${number}-${number}-${number}`
  monthlySalary: Price
}

export const taiwanMinimumWageList: TaiwanMinimumWage[] = [
  {
    implementedAt: '2014-01-01',
    monthlySalary: { twd: 19_047 },
  },
  {
    implementedAt: '2014-07-01',
    monthlySalary: { twd: 19_273 },
  },
  {
    implementedAt: '2015-07-01',
    monthlySalary: { twd: 20_008 },
  },
  {
    implementedAt: '2016-10-01',
    monthlySalary: { twd: 20_008 },
  },
  {
    implementedAt: '2017-01-01',
    monthlySalary: { twd: 21_009 },
  },
  {
    implementedAt: '2018-01-01',
    monthlySalary: { twd: 22_000 },
  },
  {
    implementedAt: '2019-01-01',
    monthlySalary: { twd: 23_100 },
  },
  {
    implementedAt: '2020-01-01',
    monthlySalary: { twd: 23_800 },
  },
  {
    implementedAt: '2021-01-01',
    monthlySalary: { twd: 24_000 },
  },
  {
    implementedAt: '2022-01-01',
    monthlySalary: { twd: 25_250 },
  },
  {
    implementedAt: '2023-01-01',
    monthlySalary: { twd: 26_400 },
  },
  {
    implementedAt: '2024-01-01',
    monthlySalary: { twd: 27_470 },
  },
]
  .filter((item) => (
    dayjs(item.implementedAt, 'YYYY-MM-DD').year() >=
    dayjs(earliestReleasedAt, 'YYYY-MM').year()
  )) as TaiwanMinimumWage[]

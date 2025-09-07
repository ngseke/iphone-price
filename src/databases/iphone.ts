import dayjs from 'dayjs'

import { type IphoneLine, type Iphone, type IphoneModel } from '../types/Iphone'

import { iphone16List } from './iphone16'
import { iphone15List } from './iphone15'
import { iphone14List } from './iphone14'
import { iphone13List } from './iphone13'
import { iphone12List } from './iphone12'
import { iphone11List } from './iphone11'
import { iphoneXsList } from './iphoneXs'
import { iphoneXrList } from './iphoneXr'
import { iphoneXList } from './iphoneX'
import { iphone8List } from './iphone8'
import { iphoneSe3List } from './iphoneSe3'
import { iphoneSe2List } from './iphoneSe2'
import { iphone7List } from './iphone7'
import { iphone6sList } from './iphone6s'
import { type StorageSize } from '../types/StorageSize'
import { groupBy } from 'lodash-es'
import { iphone16eList } from './iphone16e'
import { iphoneSeList } from './iphoneSe'
import { iphone6List } from './iphone6'

export const iphoneList: Iphone[] = [
  ...iphone16eList,
  ...iphone16List,
  ...iphone15List,
  ...iphone14List,
  ...iphoneSe3List,
  ...iphone13List,
  ...iphone12List,
  ...iphoneSe2List,
  ...iphone11List,
  ...iphoneXsList,
  ...iphoneXrList,
  ...iphoneXList,
  ...iphone8List,
  ...iphone7List,
  ...iphone6sList,
  ...iphoneSeList,
  ...iphone6List,
]
  .sort((a, b) => +dayjs(a.releasedAt) - +dayjs(b.releasedAt))

export const earliestReleasedAt = iphoneList.at(0)?.releasedAt
export const latestReleasedAt = iphoneList.at(-1)?.releasedAt

export function getFilteredIphoneListByLine (line: IphoneLine) {
  return iphoneList.filter(iphone => iphone.line === line)
}

const fullAdjustedList = groupBy(
  iphoneList?.filter(iphone => !iphone.isInitialRelease),
  (iphone) => [iphone.model, iphone.storage].join(',')
)
export function findAdjustedList (storage: StorageSize, model: IphoneModel) {
  return fullAdjustedList[[model, storage].join(',')]
}

import dayjs from 'dayjs'

import { type Iphone } from '../types/Iphone'

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

export const iphoneList: Iphone[] = [
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
]
  .sort((a, b) => +dayjs(a.releasedAt) - +dayjs(b.releasedAt))

export const earliestReleasedAt = iphoneList.at(0)?.releasedAt
export const latestReleasedAt = iphoneList.at(-1)?.releasedAt

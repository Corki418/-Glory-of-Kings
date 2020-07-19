import { heros } from './heros';
import { Response, Request } from 'express'
import { Hero, Player } from '../src/api/types'
import faker from 'faker'

faker.locale = 'zh_CN'

//模拟玩家数据
const playerCount = 100
const playerList: Player[] = []
for (let i = 1; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(10000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: Array.from(genWantoplay()),
    winningstreak: faker.random.number(10)
  })
}


// 模拟想用英雄:只有三个不能重复
function genWantoplay() {
  let wanttoplay: Set<Hero> = new Set();
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return wanttoplay;
}

//路由实现
export const getPlayers = (req: Request, res: Response) => {

  //从查询参数中获取分页、过滤关键词等参数
  const { name, nickname, page = 1, limit = 20 } = req.query
  let mockList = playerList.filter(item => {
    if (name && item.accountname.indexOf(name.toString()) < 0) return false
    return true
  })

  // 分页
  const pageList = mockList.filter((item, index) => index < 10 && index >= 0)

  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
}
//创建玩家
export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.params
  return res.json({
    code: 20000,
    data: {
      player
    }
  })
}

//更新玩家
export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params
  const { player } = req.body
  for (const v of playerList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: '没有找到玩家信息'
  })
}

//删除玩家
export const deletePlayer = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
  })
}

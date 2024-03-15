import { MapType } from "@/three/types/map"

export const MapData: Array<{
  value: MapType
  label: string
  [key: string]: any
}> = [
    {
      value: 'main',
      label: "主地图"
    },
    {
      value: 'dungeon_defend_base',
      label: '陌域-坚守阵地',
      fixed_dungeon: true
    },
    {
      value: 'dungeon_theif_cap',
      label: '陌域-歼灭战',
      fixed_dungeon: true
    },
    {
      value: 'dungeon_miner_convoy',
      label: "陌域-护卫前行",
      fixed_dungeon: true
    },
    {
      value: 'dungeon_boss_hunt',
      label: '陌域-对决',
      fixed_dungeon: true
    },
  ]
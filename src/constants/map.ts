import { MapType } from "@/three/types/map"

export const MapData: Array<{
  value: MapType
  label: string
}> = [
    {
      value: 'main',
      label: "主地图"
    },
    {
      value: 'dungeon_boss_hunt',
      label: '对决'
    },
    {
      value: 'dungeon_defend_base',
      label: '坚守阵地'
    },
    {
      value: 'dungeon_miner_convoy',
      label: "护卫前行"
    },
    {
      value: 'dungeon_theif_cap',
      label: '歼灭战'
    }
  ]
import { MapType } from "@/three/types/map";
import { atom } from "nanostores";

const mapType = atom<{
  map: MapType
}>({
  map: "main"
})

const setMapType = (map: MapType) => {
  mapType.set({ map })
}

export { mapType }
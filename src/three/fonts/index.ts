import { FontLoader } from "three/examples/jsm/Addons.js";
import SHSCN from "@/assets/three/fonts/思源黑体R_Regular.json?url"

const PROD_BUNDLE_URL = `${URL_BASE}assets/font/map_font.json`

const FINAL_URL = __DEV__ ? SHSCN : PROD_BUNDLE_URL

const loader = new FontLoader()

export const SourceHanSansCN_Regular = await loader.loadAsync(
  FINAL_URL
)
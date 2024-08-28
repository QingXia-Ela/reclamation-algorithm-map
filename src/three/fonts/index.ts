import { Font } from "three/examples/jsm/Addons.js";
import SHSCN from "@/assets/three/fonts/思源黑体R_Regular.json?url"
import fetchLocal from "@/utils/fetchLocal";

const PROD_BUNDLE_URL = `${URL_BASE}assets/font/map_font.json`

const FINAL_URL = __DEV__ ? SHSCN : PROD_BUNDLE_URL

export const SourceHanSansCN_Regular = new Font(
  await (await fetchLocal(FINAL_URL)).json()
)
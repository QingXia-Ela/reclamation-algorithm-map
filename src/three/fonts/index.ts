import { FontLoader } from "three/examples/jsm/Addons.js";
import SHSCN from '@/assets/three/fonts/思源黑体R_Regular.json?url'


const loader = new FontLoader()

export const SourceHanSansCN_Regular = await loader.loadAsync(SHSCN)
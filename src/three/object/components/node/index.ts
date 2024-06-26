import { NormalNodeProps, NodeType } from "@/three/types/node";
import * as THREE from "three";
import NodeCore from "./components/core";
import NodeTitle from "./components/title";
import NodeResource from "./components/resources";
import { NodeTypeData } from "@/constants";

// todo!: add rest type
function getSubTitleFromType(type: NodeType) {
  const defaultColor = 0xaaaaaa;
  let subTitle = "null";

  NodeTypeData.forEach((item) => {
    if (item.value === type) {
      subTitle = item.label;
      return
    }
  });

  return {
    subTitle,
    subTitleColor: defaultColor,
  };
}

function getTitleMoveBySize(size: NormalNodeProps["size"]) {
  let moveByX = 0;
  let moveByY = 0;

  switch (size) {
    case "small":
      moveByX = 4.7;
      moveByY = 0.6;
      break;

    case "large":
      moveByX = 5.5;
      moveByY = 0.8;
      break;

    default:
      break;
  }

  return {
    moveByX,
    moveByY,
  };
}

function getResouceMoveBySize(size: NormalNodeProps["size"]) {
  let moveByX = 0;
  let moveByY = 0;

  switch (size) {
    case "small":
      moveByX = 2.2;
      moveByY = -1.2;
      break;

    case "large":
      moveByX = 3;
      moveByY = -1;
      break;

    default:
      break;
  }

  return {
    moveByX,
    moveByY,
  };
}

function changeModelByMoveXY(
  model: THREE.Group,
  {
    moveByX,
    moveByY,
  }: {
    moveByX: number;
    moveByY: number;
  }
) {
  model.position.x += moveByX;
  model.position.y += moveByY;
}

class Node extends THREE.Group {
  nodeId: number;
  x: number;
  y: number;
  z = 0.3;
  selected = false;
  components: Record<string, THREE.Group> = {};
  options: NormalNodeProps;

  constructor(options: NormalNodeProps) {
    super();
    const { x, y, nodeId } = options;
    this.x = x;
    this.y = y;
    this.nodeId = nodeId;
    this.options = options;

    this.position.set(x, y, this.z);
    this._init(options);
  }

  /**
   * 展示当前节点标题/资源信息
   *
   * @param animate 是否开启动画
   */
  showInfo(animate?: boolean) {
    if (!animate) {
      this.components.title.visible = true;
      this.components.resources.visible = true;
    }
  }

  /**
   * 隐藏当前节点标题/资源信息
   *
   * @param animate 是否开启动画
   */
  hideInfo(animate?: boolean) {
    if (!animate) {
      this.components.title.visible = false;
      this.components.resources.visible = false;
    }
  }

  /**
   * 播放点击动画
   * 
   * @deprecated - 未完成
   */
  playClickAnimation() { }

  /**
   * 设置当前节点是否选中
   *
   * @param selected 是否选中
   * @param color 高亮颜色
   */
  setPointSelected(selected: boolean, color = 0xe53d12, iconColor = 0xffffff) {
    this.selected = selected;
    const finalColor = selected ? color : 0xefefef;
    const finalIconColor = selected ? iconColor : 0x000000;
    (this.components.core as NodeCore).changeBorderStyle(
      finalColor,
      selected ? 1 : 0.5
    ).changeContentColor(finalColor, finalIconColor);
  }

  /**
   * 设置当前节点类型背景颜色
   *
   * @param color 类型图标背景颜色
   * @param iconColor 图标颜色
   * @deprecated - 没完成，你用你嘛呢
   */
  setPointBackgroundColor(color = 0xefefef, iconColor = 0x000000) { }

  /**
   * 更新节点信息
   *
   * @param newOptions 新的节点配置
   */
  updateNode(newOptions: NormalNodeProps) {
    // 不使用 merge 合并是因为数组并不会用新值替换旧值
    this.options = newOptions

    Object.values(this.components).forEach((component) =>
      this.remove(component)
    );

    this._init(this.options);
  }

  /**
   * 移除 Node 类自身下的所有 3D 对象
   * 
   * **Note**: 请谨慎使用，从外部增加的 3D 对象不会被移除
   */
  // todo!: 调整名字防止歧义
  removeAllObjects() {
    Object.values(this.components).forEach((component) =>
      this.remove(component)
    );
  }

  private _getCore(options: NormalNodeProps) {
    return new NodeCore(options);
  }

  private _getNodeTitle({ name: title, weather, type, size }: NormalNodeProps) {
    const { subTitle, subTitleColor } = getSubTitleFromType(type);
    const titleObj = new NodeTitle({
      title,
      weather,
      subTitle,
      subTitleColor,
    });

    changeModelByMoveXY(titleObj, getTitleMoveBySize(size));

    return titleObj;
  }

  private _getResources(options: NormalNodeProps) {
    const resourceObj = new NodeResource(options);

    changeModelByMoveXY(resourceObj, getResouceMoveBySize(options.size));

    return resourceObj;
  }

  private _init(options: NormalNodeProps) {
    const core = this._getCore(options);

    const title = this._getNodeTitle(options);

    const resources = this._getResources(options);

    this.components = {
      core,
      title,
      resources,
    };

    this.add(core, title, resources);
  }
}

export default Node;

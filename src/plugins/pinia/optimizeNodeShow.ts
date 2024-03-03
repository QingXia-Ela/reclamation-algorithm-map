import { PiniaPluginContext } from "pinia";

export default function optimizeNodeShow({ app, store }: PiniaPluginContext) {
  // const originalToRaw = app.config.devtools.toRaw;
  // app.config.devtools.toRaw = (object) => {
  //   const raw = originalToRaw(object);
  //   if (store.$id === 'specificStoreId') {
  //     // 创建一个新的对象，排除掉一些属性
  //     const filteredRaw = {...raw};
  //     delete filteredRaw.complexObject; // 隐藏的属性
  //     return filteredRaw;
  //   }
  //   return raw;
  // };
  console.log(app);

}
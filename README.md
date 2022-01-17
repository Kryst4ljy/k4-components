# k4-components

在日常开发过程中，基于Vue封装的一些组件。

## 使用 Install
```
npm install k4-components
```

## 快速开始 Quick Start
```
import { VirtualList, SelectTree } from 'k4-components';

Vue.component(VirtualList.name, VirtualList);
```

## 组件列表 Components List
1. 虚拟列表组件 - VirtualList
2. 树形下拉框组件 - SelectTree

## 1.虚拟列表使用
```
import { VirtualList } from 'k4-components';

Vue.component(VirtualList.name, VirtualList);
```

### 入参说明
- data：虚拟列表的数据源；
- itemHeight：虚拟列表项每项初始高度；
- itemSizeGetter：虚拟列表项获取自身高度方法（自定义）

```
// itemSizeGetter示例
itemSizeGetter(obj) {
  let itemH = 0;
  const word = ['chat_at_time', 'level', 'server_name', 'type_word', 'role_name', 'vip_level', 'message']
  if(obj) {
    let wordL = 0;
    word.forEach((item, index) => {
      wordL += obj[item] ? obj[item].toString().length : 0;
    })
    wordL += 10;
    itemH = Math.ceil((wordL * 12.5) / this.$refs.box.$el.offsetWidth) * 30;
  } else {
    itemH = 30;
  }
  return 30;
},
```

## 2.树形下拉框使用

**树形组件是基于ElementUI的二次封装，所以使用此组件的项目必须使用Vue且引入过ElementUI**

```
import { SelectTree } from 'k4-components';

Vue.component(SelectTree.name, SelectTree);
```

### 入参说明
- value：树形组件接受绑定参数；
- width：树形组件输入框宽度；
- options：树形组件传入的选项数据，按照ElementUI的Tree组件options；
- placeholder：树形组件输入框占位符；



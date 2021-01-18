# k-virtuallist
虚拟列表vue组件

### 使用：
data：虚拟列表的数据源；
itemHeight：虚拟列表项每项初始高度；
itemSizeGetter：虚拟列表项获取自身高度方法（自定义）

```
// 示例
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

### 插槽
v-slot="{item}"

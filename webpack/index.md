## Webpack

### Webpack 自定义插件

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (stats) => {
        console.log('Hello World!');
      }
    );
  }
}
```
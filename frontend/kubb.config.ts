import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";

export default defineConfig(() => {
  return [
    {
      root: ".",
      input: {
        path: "../shared/openapi.json",
      },
      output: {
        path: "./src/gen",
        clean: true,
      },
      plugins: [pluginOas({}), pluginTs({}), pluginReactQuery({})],
    },
  ];
});

import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";

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
      plugins: [
        pluginOas({}),
        pluginTs({ enumType: "enum" }),
        pluginReactQuery({
          exclude: [{ type: "tag", pattern: "users" }],
          group: {
            type: "tag",
            name({ group }) {
              return `${group}Service`;
            },
          },
        }),
        pluginClient({
          importPath: "../../../client.ts",
          group: {
            type: "tag",
            name({ group }) {
              return `${group}Client`;
            },
          },
          exclude: [{ type: "tag", pattern: "users" }],
        }),
      ],
    },
  ];
});

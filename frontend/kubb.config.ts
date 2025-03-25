import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";

const typeIgnoreBanner = `
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
`;

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
          group: {
            type: "tag",
            name({ group }) {
              return group ? `${group}Service` : "";
            },
          },
          client: {
            importPath: "@/client",
          },
          exclude: [{ type: "path", pattern: "health" }],
          output: {
            path: "hooks",
            banner: typeIgnoreBanner,
          },
        }),
        pluginClient({
          group: {
            type: "tag",
            name({ group }) {
              return group ? `${group}Client` : "";
            },
          },
          importPath: "@/client",
          exclude: [{ type: "path", pattern: "health" }],
          output: {
            path: "clients",
            banner: typeIgnoreBanner,
          },
        }),
      ],
    },
  ];
});

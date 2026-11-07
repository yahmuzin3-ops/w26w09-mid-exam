import { type RouteConfig, index, layout  } from "@react-router/dev/routes"

export default [
  layout("routes/header.tsx", [
    index("routes/list.tsx"),
  ]),
] satisfies RouteConfig
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/applicationFromUrl')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/applicationFromUrl"!</div>
}

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Randka?" },
    { name: "description", content: "Zaproś mnie na randkę!" },
  ];
}

export default function Home() {
  return <Welcome />;
}

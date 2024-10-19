import { getAllItems } from "@/lib/dineOnCampusAPI";
import Image from "next/image";
import * as React from "react";

export default async function Home() {
  let items = await getAllItems("5b50c589f3eeb609b36a87eb", "24")

  return (
    <>
    {items.map((item: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; portion: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
      <div key={item.id}>
        <h2>{item.name}</h2>
        <p>{item.portion}</p>
      </div>
    ))}
    </>
  );
}

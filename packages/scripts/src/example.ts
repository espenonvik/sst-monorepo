import { Resource } from "sst";
import { Example } from "@sst-monorepo/core/example";

console.log(`${Example.hello()} Linked to ${Resource.Uploads.name}.`);

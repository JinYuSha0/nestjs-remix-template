import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import {
  type IndexBackend,
  useIndexLoader,
  useIndexAction,
} from './server/index.server';
import { useLoaderData } from 'nestjs-remix/client';

export const loader: LoaderFunction = (...args) => {
  return useIndexLoader(...args);
};

export const action: ActionFunction = (...args) => {
  return useIndexAction(...args);
};

export default function Index() {
  const data = useLoaderData<IndexBackend>();
  return <h1>{data}</h1>;
}

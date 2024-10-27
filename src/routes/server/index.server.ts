import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Injectable } from '@nestjs/common';
import { Loader, useAction, useLoader } from 'nestjs-remix';
import { AppService } from '~/modules/app/app.service';

@Injectable()
export class IndexBackend {
  constructor(private readonly appService: AppService) {}

  @Loader()
  loader() {
    return this.appService.getHello();
  }
}

export const useIndexLoader = (args: LoaderFunctionArgs) =>
  useLoader(IndexBackend)(args);

export const useIndexAction = (args: ActionFunctionArgs) =>
  useAction(IndexBackend)(args);

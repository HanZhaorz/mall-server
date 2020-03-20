// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportV1Home from '../../../app/controller/v1/home';
import ExportV1Users from '../../../app/controller/v1/users';

declare module 'egg' {
  interface IController {
    v1: {
      home: ExportV1Home;
      users: ExportV1Users;
    }
  }
}

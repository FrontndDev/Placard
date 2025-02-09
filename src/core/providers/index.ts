import compose from 'compose-function';

import { withEffectorNext } from './with-effector-next';
import {withMantine} from "./with-mantine";

export const withProviders = compose(
    withMantine,
  withEffectorNext,
);

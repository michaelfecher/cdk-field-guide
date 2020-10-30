#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { VpcStack } from './vpc-stack.ts';

const app = new cdk.App();
new VpcStack(app, 'vpc-stack');

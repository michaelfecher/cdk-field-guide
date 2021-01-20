import { App, Stack, StackProps } from '@aws-cdk/core';
import { IRestApi, RestApi } from "@aws-cdk/aws-apigateway";

export class InfrequentChangesStack extends Stack {
  readonly restApi: IRestApi

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    this.restApi = new RestApi(this, "RestApi", {
      restApiName: "RestApi with foundational settings, e.g. domain",
      deploy: false,
    });
  }
}

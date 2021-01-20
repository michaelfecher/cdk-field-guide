#!/usr/bin/env node
import 'source-map-support/register';
import { InfrequentChangesStack } from '../lib/stacks/infrequent-changes-stack';
import { AnimalStack } from '../lib/stacks/animal-stack';
import { RestApiDeploymentStack } from '../lib/stacks/rest-api-deployment-stack';
import { App } from '@aws-cdk/core';

const app = new App();
const infrequentChangesStack = new InfrequentChangesStack(app, 'SeparatedRestapiDefinitionsStack',);
const animalStack = new AnimalStack(app, "AnimalApiMethodDefinitionsStack", {
    restApi: infrequentChangesStack.restApi
});

// ... additional stack init here

const deploymentStack = new RestApiDeploymentStack(app, "RestApiDeploymentStack", {
    // you can add more methods from other entity stacks here
    endpointMethods: [...animalStack.methods],
    restApi: infrequentChangesStack.restApi,
    logGroupName: "ProdRestApi"
});








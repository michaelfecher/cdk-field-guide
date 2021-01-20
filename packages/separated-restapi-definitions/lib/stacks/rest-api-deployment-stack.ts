import { IRestApi, Method, Deployment, LogGroupLogDestination, AccessLogFormat, MethodLoggingLevel, Stage } from "@aws-cdk/aws-apigateway";
import { LogGroup } from "@aws-cdk/aws-logs";
import { StackProps, Stack, App } from "@aws-cdk/core";

interface DeploymentStackProps extends StackProps {
    restApi: IRestApi,
    endpointMethods: Method[],
    logGroupName: string;
}

export class RestApiDeploymentStack extends Stack {

    readonly baseUrl: string;

    constructor(scope: App, id: string, props: DeploymentStackProps) {
        super(scope, id, props);
        const { restApi, endpointMethods, logGroupName } = props;

        const deployment = new Deployment(this, 'Deployment', {
            api: restApi,
            description: "delayed/lazy deployment of all rest api resources"
        });

        (endpointMethods ?? []).forEach((method) => deployment.node.addDependency(method));

        const stageName = "prod";
        const apiGwLogGroup = new LogGroup(this, logGroupName);
        const stage = new Stage(this, 'ProdStage', {
            deployment,
            stageName,
            accessLogDestination: new LogGroupLogDestination(apiGwLogGroup),
            accessLogFormat: AccessLogFormat.jsonWithStandardFields(),
            loggingLevel: MethodLoggingLevel.INFO,
            dataTraceEnabled: true,
            metricsEnabled: true,
            tracingEnabled: true,
        });

        const apigwUrl = `https://${restApi.restApiId}.execute-api.${this.region}.amazonaws.com`;
        this.baseUrl = `${apigwUrl}/${stage}`;
    }
}
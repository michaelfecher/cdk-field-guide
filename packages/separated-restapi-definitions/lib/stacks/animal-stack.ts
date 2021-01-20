import { IRestApi, Method } from "@aws-cdk/aws-apigateway";
import { App, Stack, StackProps } from "@aws-cdk/core";

interface AnimalStackProps extends StackProps {
    restApi: IRestApi,
}

export class AnimalStack extends Stack {
    readonly methods: Method[] = [];

    constructor(scope: App, id: string, props: AnimalStackProps) {
        super(scope, id, props);
        const { restApi } = props;

        const animalEndpoint = restApi.root.addResource("animal");
        const methodGet = animalEndpoint.addMethod(
            "GET",
            // .. lambda handler or other integration
        );
        this.methods.push(methodGet);

        // .. other methods to add

    }
}

export class VpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // reading the value from the env. 
    // Obviously, you have to set it before or pass it before you call any cdk command
    const vpcCidr = process.env.VPC_CIDR;
    new Vpc(this, 'VPC', {
      maxAzs: 3,
      // using the value
      cidr: vpcCidr,
      subnetConfiguration: [
        {
          name: 'App',
          subnetType: SubnetType.PRIVATE,
          cidrMask: 24
        },
        // ...
      ]
    }
   }
}

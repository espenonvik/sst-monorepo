/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-monorepo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "eu-north-1",
      providers: {
        aws: {
          profile:
              input.stage === "production" ? "tidya-production" : "tidya-dev",
        },
      },
    };
  },
  async run(): Promise<any> {
    await import("./infra/storage");
    await import("./infra/api");
    const auth = await import("./infra/auth");

    return {
      UserPool: auth.userPool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
    };

  },
});

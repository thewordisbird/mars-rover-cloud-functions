/* eslint-disable require-jsdoc */
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

class SecretsReader {
  client = new SecretManagerServiceClient();

  PROJECT_NAME = "projects/176334541302/secrets/NASA_API_KEY/";

  async getSecretValue(version = "latest"): Promise<string | undefined> {
    const [secret] = await this.client.accessSecretVersion({
      name: `${this.PROJECT_NAME}versions/${version}`,
    });

    const payload = secret.payload?.data?.toString();
    return payload;
  }
}

export default SecretsReader;

import { IntegrationBase } from "@budibase/types"

import { BigQuery } from '@google-cloud/bigquery';

interface Query {
  statement: string
}

class CustomIntegration implements IntegrationBase {
  // private readonly credentialsFilePath: string
  private readonly clientEmail: string;
  private readonly privateKey: string;
  private readonly gcpProjectId: string;
  private readonly bqDatasetId: string;
  private readonly bqDatasetLocation: string;

  constructor(config: { 
      clientEmail: string,
      privateKey: string, 
      gcpProjectId: string,
      bqDatasetId: string,
      bqDatasetLocation: string
    }
    ) {
    this.clientEmail = config.clientEmail;
    this.privateKey = config.privateKey;

    this.gcpProjectId = config.gcpProjectId;
    this.bqDatasetId = config.bqDatasetId;
    this.bqDatasetLocation = config.bqDatasetLocation;
  }

  async getClient() {
    const bigqueryClient = new BigQuery({
      projectId: this.gcpProjectId,
      credentials: {
        type: "service_account",
        private_key: this.privateKey?.replace(/\\n/g, "\n"),
        client_email: this.clientEmail,
      }
    });

    return bigqueryClient;
  }

  async executeQuery(query: {sql: string }) {
    const bigqueryClient = await this.getClient();
    const options = {
      query: query.sql,
      location: this.bqDatasetLocation,
    };
    
    let [job] = await bigqueryClient.createQueryJob(options);

    const [rows] = await job.getQueryResults();
    return rows;
  }

  async executeCommand(query: { sql: string }) {
    const bigqueryClient = await this.getClient();
    const options = {
      query: query.sql,
      location: this.bqDatasetLocation,
    };
    
    let [job] = await bigqueryClient.createQueryJob(options);
    return [];
  }

  async create(query: { sql: string }) {
    return await this.executeCommand(query);
  }

  async read(query: { sql: string }) {
    return await this.executeQuery(query);
  }

  async update(query: { sql: string }) {
    return await this.executeCommand(query);
  }

  async delete(query: { sql: string }) {
    return await this.executeCommand(query);
  }
}

export default CustomIntegration

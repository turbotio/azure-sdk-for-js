/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/costsMappers";
import * as Parameters from "../models/parameters";
import { DevTestLabsClientContext } from "../devTestLabsClientContext";

/** Class representing a Costs. */
export class Costs {
  private readonly client: DevTestLabsClientContext;

  /**
   * Create a Costs.
   * @param {DevTestLabsClientContext} client Reference to the service client.
   */
  constructor(client: DevTestLabsClientContext) {
    this.client = client;
  }

  /**
   * Get cost.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param [options] The optional parameters
   * @returns Promise<Models.CostsGetResponse>
   */
  get(resourceGroupName: string, labName: string, name: string, options?: Models.CostsGetOptionalParams): Promise<Models.CostsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, name: string, callback: msRest.ServiceCallback<Models.LabCost>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, name: string, options: Models.CostsGetOptionalParams, callback: msRest.ServiceCallback<Models.LabCost>): void;
  get(resourceGroupName: string, labName: string, name: string, options?: Models.CostsGetOptionalParams | msRest.ServiceCallback<Models.LabCost>, callback?: msRest.ServiceCallback<Models.LabCost>): Promise<Models.CostsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.CostsGetResponse>;
  }

  /**
   * Create or replace an existing cost.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param labCost A cost item.
   * @param [options] The optional parameters
   * @returns Promise<Models.CostsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, labCost: Models.LabCost, options?: msRest.RequestOptionsBase): Promise<Models.CostsCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param labCost A cost item.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, labCost: Models.LabCost, callback: msRest.ServiceCallback<Models.LabCost>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param name The name of the cost.
   * @param labCost A cost item.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, labName: string, name: string, labCost: Models.LabCost, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.LabCost>): void;
  createOrUpdate(resourceGroupName: string, labName: string, name: string, labCost: Models.LabCost, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.LabCost>, callback?: msRest.ServiceCallback<Models.LabCost>): Promise<Models.CostsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        name,
        labCost,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.CostsCreateOrUpdateResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/costs/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.expand,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.LabCost
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/costs/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "labCost",
    mapper: {
      ...Mappers.LabCost,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.LabCost
    },
    201: {
      bodyMapper: Mappers.LabCost
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

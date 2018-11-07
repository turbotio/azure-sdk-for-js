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
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/environmentsMappers";
import * as Parameters from "../models/parameters";
import { DevTestLabsClientContext } from "../devTestLabsClientContext";

/** Class representing a Environments. */
export class Environments {
  private readonly client: DevTestLabsClientContext;

  /**
   * Create a Environments.
   * @param {DevTestLabsClientContext} client Reference to the service client.
   */
  constructor(client: DevTestLabsClientContext) {
    this.client = client;
  }

  /**
   * List environments in a given user profile.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnvironmentsListResponse>
   */
  list(resourceGroupName: string, labName: string, userName: string, options?: Models.EnvironmentsListOptionalParams): Promise<Models.EnvironmentsListResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, userName: string, callback: msRest.ServiceCallback<Models.DtlEnvironmentList>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, userName: string, options: Models.EnvironmentsListOptionalParams, callback: msRest.ServiceCallback<Models.DtlEnvironmentList>): void;
  list(resourceGroupName: string, labName: string, userName: string, options?: Models.EnvironmentsListOptionalParams | msRest.ServiceCallback<Models.DtlEnvironmentList>, callback?: msRest.ServiceCallback<Models.DtlEnvironmentList>): Promise<Models.EnvironmentsListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        userName,
        options
      },
      listOperationSpec,
      callback) as Promise<Models.EnvironmentsListResponse>;
  }

  /**
   * Get environment.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnvironmentsGetResponse>
   */
  get(resourceGroupName: string, labName: string, userName: string, name: string, options?: Models.EnvironmentsGetOptionalParams): Promise<Models.EnvironmentsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, userName: string, name: string, callback: msRest.ServiceCallback<Models.DtlEnvironment>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, labName: string, userName: string, name: string, options: Models.EnvironmentsGetOptionalParams, callback: msRest.ServiceCallback<Models.DtlEnvironment>): void;
  get(resourceGroupName: string, labName: string, userName: string, name: string, options?: Models.EnvironmentsGetOptionalParams | msRest.ServiceCallback<Models.DtlEnvironment>, callback?: msRest.ServiceCallback<Models.DtlEnvironment>): Promise<Models.EnvironmentsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        userName,
        name,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.EnvironmentsGetResponse>;
  }

  /**
   * Create or replace an existing environment. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param dtlEnvironment An environment, which is essentially an ARM template deployment.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnvironmentsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironment, options?: msRest.RequestOptionsBase): Promise<Models.EnvironmentsCreateOrUpdateResponse> {
    return this.beginCreateOrUpdate(resourceGroupName,labName,userName,name,dtlEnvironment,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.EnvironmentsCreateOrUpdateResponse>;
  }

  /**
   * Delete environment. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, labName: string, userName: string, name: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDeleteMethod(resourceGroupName,labName,userName,name,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Modify properties of environments.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param dtlEnvironment An environment, which is essentially an ARM template deployment.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnvironmentsUpdateResponse>
   */
  update(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironmentFragment, options?: msRest.RequestOptionsBase): Promise<Models.EnvironmentsUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param dtlEnvironment An environment, which is essentially an ARM template deployment.
   * @param callback The callback
   */
  update(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironmentFragment, callback: msRest.ServiceCallback<Models.DtlEnvironment>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param dtlEnvironment An environment, which is essentially an ARM template deployment.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironmentFragment, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DtlEnvironment>): void;
  update(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironmentFragment, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DtlEnvironment>, callback?: msRest.ServiceCallback<Models.DtlEnvironment>): Promise<Models.EnvironmentsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        userName,
        name,
        dtlEnvironment,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.EnvironmentsUpdateResponse>;
  }

  /**
   * Create or replace an existing environment. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param dtlEnvironment An environment, which is essentially an ARM template deployment.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginCreateOrUpdate(resourceGroupName: string, labName: string, userName: string, name: string, dtlEnvironment: Models.DtlEnvironment, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        labName,
        userName,
        name,
        dtlEnvironment,
        options
      },
      beginCreateOrUpdateOperationSpec,
      options);
  }

  /**
   * Delete environment. This operation can take a while to complete.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param userName The name of the user profile.
   * @param name The name of the environment.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDeleteMethod(resourceGroupName: string, labName: string, userName: string, name: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        labName,
        userName,
        name,
        options
      },
      beginDeleteMethodOperationSpec,
      options);
  }

  /**
   * List environments in a given user profile.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.EnvironmentsListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.EnvironmentsListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DtlEnvironmentList>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DtlEnvironmentList>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DtlEnvironmentList>, callback?: msRest.ServiceCallback<Models.DtlEnvironmentList>): Promise<Models.EnvironmentsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.EnvironmentsListNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/users/{userName}/environments",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.userName
  ],
  queryParameters: [
    Parameters.expand,
    Parameters.filter,
    Parameters.top,
    Parameters.orderby,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DtlEnvironmentList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/users/{userName}/environments/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.userName,
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
      bodyMapper: Mappers.DtlEnvironment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const updateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/users/{userName}/environments/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.userName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "dtlEnvironment",
    mapper: {
      ...Mappers.DtlEnvironmentFragment,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.DtlEnvironment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginCreateOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/users/{userName}/environments/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.userName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "dtlEnvironment",
    mapper: {
      ...Mappers.DtlEnvironment,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.DtlEnvironment
    },
    201: {
      bodyMapper: Mappers.DtlEnvironment
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginDeleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/users/{userName}/environments/{name}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName,
    Parameters.userName,
    Parameters.name
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DtlEnvironmentList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

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
import * as Mappers from "../models/serviceMappers";
import * as Parameters from "../models/parameters";
import { DataBoxManagementClientContext } from "../dataBoxManagementClientContext";

/** Class representing a Service. */
export class Service {
  private readonly client: DataBoxManagementClientContext;

  /**
   * Create a Service.
   * @param {DataBoxManagementClientContext} client Reference to the service client.
   */
  constructor(client: DataBoxManagementClientContext) {
    this.client = client;
  }

  /**
   * This method provides the list of available skus for the given subscription and location.
   * @param location The location of the resource
   * @param availableSkuRequest Filters for showing the available skus.
   * @param [options] The optional parameters
   * @returns Promise<Models.ServiceListAvailableSkusResponse>
   */
  listAvailableSkus(location: string, availableSkuRequest: Models.AvailableSkuRequest, options?: msRest.RequestOptionsBase): Promise<Models.ServiceListAvailableSkusResponse>;
  /**
   * @param location The location of the resource
   * @param availableSkuRequest Filters for showing the available skus.
   * @param callback The callback
   */
  listAvailableSkus(location: string, availableSkuRequest: Models.AvailableSkuRequest, callback: msRest.ServiceCallback<Models.AvailableSkusResult>): void;
  /**
   * @param location The location of the resource
   * @param availableSkuRequest Filters for showing the available skus.
   * @param options The optional parameters
   * @param callback The callback
   */
  listAvailableSkus(location: string, availableSkuRequest: Models.AvailableSkuRequest, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailableSkusResult>): void;
  listAvailableSkus(location: string, availableSkuRequest: Models.AvailableSkuRequest, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AvailableSkusResult>, callback?: msRest.ServiceCallback<Models.AvailableSkusResult>): Promise<Models.ServiceListAvailableSkusResponse> {
    return this.client.sendOperationRequest(
      {
        location,
        availableSkuRequest,
        options
      },
      listAvailableSkusOperationSpec,
      callback) as Promise<Models.ServiceListAvailableSkusResponse>;
  }

  /**
   * This method validates the customer shipping address and provide alternate addresses if any.
   * @param location The location of the resource
   * @param shippingAddress Shipping address of the customer.
   * @param deviceType Device type to be used for the job. Possible values include: 'DataBox',
   * 'DataBoxDisk', 'DataBoxHeavy'
   * @param [options] The optional parameters
   * @returns Promise<Models.ServiceValidateAddressMethodResponse>
   */
  validateAddressMethod(location: string, shippingAddress: Models.ShippingAddress, deviceType: Models.SkuName, options?: msRest.RequestOptionsBase): Promise<Models.ServiceValidateAddressMethodResponse>;
  /**
   * @param location The location of the resource
   * @param shippingAddress Shipping address of the customer.
   * @param deviceType Device type to be used for the job. Possible values include: 'DataBox',
   * 'DataBoxDisk', 'DataBoxHeavy'
   * @param callback The callback
   */
  validateAddressMethod(location: string, shippingAddress: Models.ShippingAddress, deviceType: Models.SkuName, callback: msRest.ServiceCallback<Models.AddressValidationOutput>): void;
  /**
   * @param location The location of the resource
   * @param shippingAddress Shipping address of the customer.
   * @param deviceType Device type to be used for the job. Possible values include: 'DataBox',
   * 'DataBoxDisk', 'DataBoxHeavy'
   * @param options The optional parameters
   * @param callback The callback
   */
  validateAddressMethod(location: string, shippingAddress: Models.ShippingAddress, deviceType: Models.SkuName, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AddressValidationOutput>): void;
  validateAddressMethod(location: string, shippingAddress: Models.ShippingAddress, deviceType: Models.SkuName, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AddressValidationOutput>, callback?: msRest.ServiceCallback<Models.AddressValidationOutput>): Promise<Models.ServiceValidateAddressMethodResponse> {
    return this.client.sendOperationRequest(
      {
        location,
        shippingAddress,
        deviceType,
        options
      },
      validateAddressMethodOperationSpec,
      callback) as Promise<Models.ServiceValidateAddressMethodResponse>;
  }

  /**
   * This method provides the list of available skus for the given subscription and location.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ServiceListAvailableSkusNextResponse>
   */
  listAvailableSkusNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.ServiceListAvailableSkusNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listAvailableSkusNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.AvailableSkusResult>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listAvailableSkusNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailableSkusResult>): void;
  listAvailableSkusNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.AvailableSkusResult>, callback?: msRest.ServiceCallback<Models.AvailableSkusResult>): Promise<Models.ServiceListAvailableSkusNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listAvailableSkusNextOperationSpec,
      callback) as Promise<Models.ServiceListAvailableSkusNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listAvailableSkusOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/availableSkus",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.location
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "availableSkuRequest",
    mapper: {
      ...Mappers.AvailableSkuRequest,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.AvailableSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const validateAddressMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.DataBox/locations/{location}/validateAddress",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.location
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: {
      shippingAddress: "shippingAddress",
      deviceType: "deviceType"
    },
    mapper: {
      ...Mappers.ValidateAddress,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.AddressValidationOutput
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listAvailableSkusNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
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
      bodyMapper: Mappers.AvailableSkusResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

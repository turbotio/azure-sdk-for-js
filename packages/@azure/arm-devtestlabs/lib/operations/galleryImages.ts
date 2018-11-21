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
import * as Mappers from "../models/galleryImagesMappers";
import * as Parameters from "../models/parameters";
import { DevTestLabsClientContext } from "../devTestLabsClientContext";

/** Class representing a GalleryImages. */
export class GalleryImages {
  private readonly client: DevTestLabsClientContext;

  /**
   * Create a GalleryImages.
   * @param {DevTestLabsClientContext} client Reference to the service client.
   */
  constructor(client: DevTestLabsClientContext) {
    this.client = client;
  }

  /**
   * List gallery images in a given lab.
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param [options] The optional parameters
   * @returns Promise<Models.GalleryImagesListResponse>
   */
  list(resourceGroupName: string, labName: string, options?: Models.GalleryImagesListOptionalParams): Promise<Models.GalleryImagesListResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, callback: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param labName The name of the lab.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(resourceGroupName: string, labName: string, options: Models.GalleryImagesListOptionalParams, callback: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): void;
  list(resourceGroupName: string, labName: string, options?: Models.GalleryImagesListOptionalParams | msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>, callback?: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): Promise<Models.GalleryImagesListResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        labName,
        options
      },
      listOperationSpec,
      callback) as Promise<Models.GalleryImagesListResponse>;
  }

  /**
   * List gallery images in a given lab.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.GalleryImagesListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GalleryImagesListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>, callback?: msRest.ServiceCallback<Models.ResponseWithContinuationGalleryImage>): Promise<Models.GalleryImagesListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.GalleryImagesListNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevTestLab/labs/{labName}/galleryimages",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.labName
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
      bodyMapper: Mappers.ResponseWithContinuationGalleryImage
    },
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
      bodyMapper: Mappers.ResponseWithContinuationGalleryImage
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

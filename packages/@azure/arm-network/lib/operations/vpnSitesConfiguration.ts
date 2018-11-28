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
import * as Mappers from "../models/vpnSitesConfigurationMappers";
import * as Parameters from "../models/parameters";
import { NetworkManagementClientContext } from "../networkManagementClientContext";

/** Class representing a VpnSitesConfiguration. */
export class VpnSitesConfiguration {
  private readonly client: NetworkManagementClientContext;

  /**
   * Create a VpnSitesConfiguration.
   * @param {NetworkManagementClientContext} client Reference to the service client.
   */
  constructor(client: NetworkManagementClientContext) {
    this.client = client;
  }

  /**
   * Gives the sas-url to download the configurations for vpn-sites in a resource group.
   * @param resourceGroupName The resource group name.
   * @param virtualWANName The name of the VirtualWAN for which configuration of all vpn-sites is
   * needed.
   * @param request Parameters supplied to download vpn-sites configuration.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  download(resourceGroupName: string, virtualWANName: string, request: Models.GetVpnSitesConfigurationRequest, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDownload(resourceGroupName,virtualWANName,request,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Gives the sas-url to download the configurations for vpn-sites in a resource group.
   * @param resourceGroupName The resource group name.
   * @param virtualWANName The name of the VirtualWAN for which configuration of all vpn-sites is
   * needed.
   * @param request Parameters supplied to download vpn-sites configuration.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDownload(resourceGroupName: string, virtualWANName: string, request: Models.GetVpnSitesConfigurationRequest, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        virtualWANName,
        request,
        options
      },
      beginDownloadOperationSpec,
      options);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const beginDownloadOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/vpnConfiguration",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualWANName0
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "request",
    mapper: {
      ...Mappers.GetVpnSitesConfigurationRequest,
      required: true
    }
  },
  responses: {
    200: {},
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { ComputeManagementClientContext } from "./computeManagementClientContext";


class ComputeManagementClient extends ComputeManagementClientContext {
  // Operation groups
  operations: operations.Operations;
  availabilitySets: operations.AvailabilitySets;
  virtualMachineExtensionImages: operations.VirtualMachineExtensionImages;
  virtualMachineExtensions: operations.VirtualMachineExtensions;
  virtualMachineImages: operations.VirtualMachineImages;
  usage: operations.UsageOperations;
  virtualMachines: operations.VirtualMachines;
  virtualMachineSizes: operations.VirtualMachineSizes;
  images: operations.Images;
  virtualMachineScaleSets: operations.VirtualMachineScaleSets;
  virtualMachineScaleSetExtensions: operations.VirtualMachineScaleSetExtensions;
  virtualMachineScaleSetRollingUpgrades: operations.VirtualMachineScaleSetRollingUpgrades;
  virtualMachineScaleSetVMs: operations.VirtualMachineScaleSetVMs;
  logAnalytics: operations.LogAnalytics;
  virtualMachineRunCommands: operations.VirtualMachineRunCommands;
  resourceSkus: operations.ResourceSkus;
  disks: operations.Disks;
  snapshots: operations.Snapshots;
  galleries: operations.Galleries;
  galleryImages: operations.GalleryImages;
  galleryImageVersions: operations.GalleryImageVersions;
  containerServices: operations.ContainerServices;

  /**
   * Initializes a new instance of the ComputeManagementClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure
   * subscription. The subscription ID forms part of the URI for every service call.
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials, subscriptionId: string, options?: Models.ComputeManagementClientOptions) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.availabilitySets = new operations.AvailabilitySets(this);
    this.virtualMachineExtensionImages = new operations.VirtualMachineExtensionImages(this);
    this.virtualMachineExtensions = new operations.VirtualMachineExtensions(this);
    this.virtualMachineImages = new operations.VirtualMachineImages(this);
    this.usage = new operations.UsageOperations(this);
    this.virtualMachines = new operations.VirtualMachines(this);
    this.virtualMachineSizes = new operations.VirtualMachineSizes(this);
    this.images = new operations.Images(this);
    this.virtualMachineScaleSets = new operations.VirtualMachineScaleSets(this);
    this.virtualMachineScaleSetExtensions = new operations.VirtualMachineScaleSetExtensions(this);
    this.virtualMachineScaleSetRollingUpgrades = new operations.VirtualMachineScaleSetRollingUpgrades(this);
    this.virtualMachineScaleSetVMs = new operations.VirtualMachineScaleSetVMs(this);
    this.logAnalytics = new operations.LogAnalytics(this);
    this.virtualMachineRunCommands = new operations.VirtualMachineRunCommands(this);
    this.resourceSkus = new operations.ResourceSkus(this);
    this.disks = new operations.Disks(this);
    this.snapshots = new operations.Snapshots(this);
    this.galleries = new operations.Galleries(this);
    this.galleryImages = new operations.GalleryImages(this);
    this.galleryImageVersions = new operations.GalleryImageVersions(this);
    this.containerServices = new operations.ContainerServices(this);
  }
}

// Operation Specifications

export {
  ComputeManagementClient,
  ComputeManagementClientContext,
  Models as ComputeManagementModels,
  Mappers as ComputeManagementMappers
};
export * from "./operations";

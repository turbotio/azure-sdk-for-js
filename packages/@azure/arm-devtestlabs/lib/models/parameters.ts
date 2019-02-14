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

export const acceptLanguage: msRest.OperationParameter = {
  parameterPath: "acceptLanguage",
  mapper: {
    serializedName: "accept-language",
    defaultValue: 'en-US',
    type: {
      name: "String"
    }
  }
};
export const apiVersion: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    serializedName: "api-version",
    defaultValue: '2019-10-11',
    type: {
      name: "String"
    }
  }
};
export const artifactSourceName: msRest.OperationURLParameter = {
  parameterPath: "artifactSourceName",
  mapper: {
    required: true,
    serializedName: "artifactSourceName",
    type: {
      name: "String"
    }
  }
};
export const expand: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "expand"
  ],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "String"
    }
  }
};
export const filter: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "filter"
  ],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};
export const labName: msRest.OperationURLParameter = {
  parameterPath: "labName",
  mapper: {
    required: true,
    serializedName: "labName",
    type: {
      name: "String"
    }
  }
};
export const locationName: msRest.OperationURLParameter = {
  parameterPath: "locationName",
  mapper: {
    required: true,
    serializedName: "locationName",
    type: {
      name: "String"
    }
  }
};
export const name: msRest.OperationURLParameter = {
  parameterPath: "name",
  mapper: {
    required: true,
    serializedName: "name",
    type: {
      name: "String"
    }
  }
};
export const nextPageLink: msRest.OperationURLParameter = {
  parameterPath: "nextPageLink",
  mapper: {
    required: true,
    serializedName: "nextLink",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const orderby: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "orderby"
  ],
  mapper: {
    serializedName: "$orderby",
    type: {
      name: "String"
    }
  }
};
export const policySetName: msRest.OperationURLParameter = {
  parameterPath: "policySetName",
  mapper: {
    required: true,
    serializedName: "policySetName",
    type: {
      name: "String"
    }
  }
};
export const resourceGroupName: msRest.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    required: true,
    serializedName: "resourceGroupName",
    type: {
      name: "String"
    }
  }
};
export const serviceFabricName: msRest.OperationURLParameter = {
  parameterPath: "serviceFabricName",
  mapper: {
    required: true,
    serializedName: "serviceFabricName",
    type: {
      name: "String"
    }
  }
};
export const subscriptionId: msRest.OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    required: true,
    serializedName: "subscriptionId",
    type: {
      name: "String"
    }
  }
};
export const top: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "top"
  ],
  mapper: {
    serializedName: "$top",
    type: {
      name: "Number"
    }
  }
};
export const userName: msRest.OperationURLParameter = {
  parameterPath: "userName",
  mapper: {
    required: true,
    serializedName: "userName",
    type: {
      name: "String"
    }
  }
};
export const virtualMachineName: msRest.OperationURLParameter = {
  parameterPath: "virtualMachineName",
  mapper: {
    required: true,
    serializedName: "virtualMachineName",
    type: {
      name: "String"
    }
  }
};

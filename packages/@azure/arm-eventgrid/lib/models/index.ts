/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };

/**
 * Contains the possible cases for EventSubscriptionDestination.
 */
export type EventSubscriptionDestinationUnion = EventSubscriptionDestination | WebHookEventSubscriptionDestination | EventHubEventSubscriptionDestination | StorageQueueEventSubscriptionDestination | HybridConnectionEventSubscriptionDestination;

/**
 * Information about the destination for an event subscription
 */
export interface EventSubscriptionDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "EventSubscriptionDestination";
}

/**
 * Filter for the Event Subscription
 */
export interface EventSubscriptionFilter {
  /**
   * An optional string to filter events for an event subscription based on a resource path prefix.
   * The format of this depends on the publisher of the events.
   * Wildcard characters are not supported in this path.
   */
  subjectBeginsWith?: string;
  /**
   * An optional string to filter events for an event subscription based on a resource path suffix.
   * Wildcard characters are not supported in this path.
   */
  subjectEndsWith?: string;
  /**
   * A list of applicable event types that need to be part of the event subscription.
   * If it is desired to subscribe to all event types, the string "all" needs to be specified as an
   * element in this list.
   */
  includedEventTypes?: string[];
  /**
   * Specifies if the SubjectBeginsWith and SubjectEndsWith properties of the filter
   * should be compared in a case sensitive manner. Default value: false.
   */
  isSubjectCaseSensitive?: boolean;
}

/**
 * Information about the retry policy for an event subscription
 */
export interface RetryPolicy {
  /**
   * Maximum number of delivery retry attempts for events.
   */
  maxDeliveryAttempts?: number;
  /**
   * Time To Live (in minutes) for events.
   */
  eventTimeToLiveInMinutes?: number;
}

/**
 * Contains the possible cases for DeadLetterDestination.
 */
export type DeadLetterDestinationUnion = DeadLetterDestination | StorageBlobDeadLetterDestination;

/**
 * Information about the dead letter destination for an event subscription. To configure a
 * deadletter destination, do not directly instantiate an object of this class. Instead,
 * instantiate an object of a derived class. Currently, StorageBlobDeadLetterDestination is the
 * only class that derives from this class.
 */
export interface DeadLetterDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "DeadLetterDestination";
}

/**
 * Definition of a Resource
 */
export interface Resource extends BaseResource {
  /**
   * Fully qualified identifier of the resource
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Name of the resource
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Type of the resource
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
}

/**
 * Information about the storage blob based dead letter destination.
 */
export interface StorageBlobDeadLetterDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "StorageBlob";
  /**
   * The Azure Resource ID of the storage account that is the destination of the deadletter events.
   * For example:
   * /subscriptions/{AzureSubscriptionId}/resourceGroups/{ResourceGroupName}/providers/microsoft.Storage/storageAccounts/{StorageAccountName}
   */
  resourceId?: string;
  /**
   * The name of the Storage blob container that is the destination of the deadletter events
   */
  blobContainerName?: string;
}

/**
 * Information about the webhook destination for an event subscription
 */
export interface WebHookEventSubscriptionDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "WebHook";
  /**
   * The URL that represents the endpoint of the destination of an event subscription.
   */
  endpointUrl?: string;
  /**
   * The base URL that represents the endpoint of the destination of an event subscription.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly endpointBaseUrl?: string;
}

/**
 * Information about the event hub destination for an event subscription
 */
export interface EventHubEventSubscriptionDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "EventHub";
  /**
   * The Azure Resource Id that represents the endpoint of an Event Hub destination of an event
   * subscription.
   */
  resourceId?: string;
}

/**
 * Information about the storage queue destination for an event subscription.
 */
export interface StorageQueueEventSubscriptionDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "StorageQueue";
  /**
   * The Azure Resource ID of the storage account that contains the queue that is the destination
   * of an event subscription.
   */
  resourceId?: string;
  /**
   * The name of the Storage queue under a storage account that is the destination of an event
   * subscription.
   */
  queueName?: string;
}

/**
 * Information about the HybridConnection destination for an event subscription.
 */
export interface HybridConnectionEventSubscriptionDestination {
  /**
   * Polymorphic Discriminator
   */
  endpointType: "HybridConnection";
  /**
   * The Azure Resource ID of an hybrid connection that is the destination of an event
   * subscription.
   */
  resourceId?: string;
}

/**
 * Event Subscription
 */
export interface EventSubscription extends Resource {
  /**
   * Name of the topic of the event subscription.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly topic?: string;
  /**
   * Provisioning state of the event subscription. Possible values include: 'Creating', 'Updating',
   * 'Deleting', 'Succeeded', 'Canceled', 'Failed', 'AwaitingManualAction'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: EventSubscriptionProvisioningState;
  /**
   * Information about the destination where events have to be delivered for the event
   * subscription.
   */
  destination?: EventSubscriptionDestinationUnion;
  /**
   * Information about the filter for the event subscription.
   */
  filter?: EventSubscriptionFilter;
  /**
   * List of user defined labels.
   */
  labels?: string[];
  /**
   * The retry policy for events. This can be used to configure maximum number of delivery attempts
   * and time to live for events.
   */
  retryPolicy?: RetryPolicy;
  /**
   * The DeadLetter destination of the event subscription.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
}

/**
 * Properties of the Event Subscription update
 */
export interface EventSubscriptionUpdateParameters {
  /**
   * Information about the destination where events have to be delivered for the event
   * subscription.
   */
  destination?: EventSubscriptionDestinationUnion;
  /**
   * Information about the filter for the event subscription.
   */
  filter?: EventSubscriptionFilter;
  /**
   * List of user defined labels.
   */
  labels?: string[];
  /**
   * The retry policy for events. This can be used to configure maximum number of delivery attempts
   * and time to live for events.
   */
  retryPolicy?: RetryPolicy;
  /**
   * The DeadLetter destination of the event subscription.
   */
  deadLetterDestination?: DeadLetterDestinationUnion;
}

/**
 * Full endpoint url of an event subscription
 */
export interface EventSubscriptionFullUrl {
  /**
   * The URL that represents the endpoint of the destination of an event subscription.
   */
  endpointUrl?: string;
}

/**
 * Information about an operation
 */
export interface OperationInfo {
  /**
   * Name of the provider
   */
  provider?: string;
  /**
   * Name of the resource type
   */
  resource?: string;
  /**
   * Name of the operation
   */
  operation?: string;
  /**
   * Description of the operation
   */
  description?: string;
}

/**
 * Represents an operation returned by the GetOperations request
 */
export interface Operation {
  /**
   * Name of the operation
   */
  name?: string;
  /**
   * Display name of the operation
   */
  display?: OperationInfo;
  /**
   * Origin of the operation
   */
  origin?: string;
  /**
   * Properties of the operation
   */
  properties?: any;
}

/**
 * Definition of a Tracked Resource
 */
export interface TrackedResource extends Resource {
  /**
   * Location of the resource
   */
  location: string;
  /**
   * Tags of the resource
   */
  tags?: { [propertyName: string]: string };
}

/**
 * EventGrid Topic
 */
export interface Topic extends TrackedResource {
  /**
   * Provisioning state of the topic. Possible values include: 'Creating', 'Updating', 'Deleting',
   * 'Succeeded', 'Canceled', 'Failed'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningState?: TopicProvisioningState;
  /**
   * Endpoint for the topic.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly endpoint?: string;
}

/**
 * Properties of the Topic update
 */
export interface TopicUpdateParameters {
  /**
   * Tags of the resource
   */
  tags?: { [propertyName: string]: string };
}

/**
 * Shared access keys of the Topic
 */
export interface TopicSharedAccessKeys {
  /**
   * Shared access key1 for the topic.
   */
  key1?: string;
  /**
   * Shared access key2 for the topic.
   */
  key2?: string;
}

/**
 * Topic regenerate share access key request
 */
export interface TopicRegenerateKeyRequest {
  /**
   * Key name to regenerate key1 or key2
   */
  keyName: string;
}

/**
 * Event Type for a subject under a topic
 */
export interface EventType extends Resource {
  /**
   * Display name of the event type.
   */
  displayName?: string;
  /**
   * Description of the event type.
   */
  description?: string;
  /**
   * Url of the schema for this event type.
   */
  schemaUrl?: string;
}

/**
 * Properties of a topic type info.
 */
export interface TopicTypeInfo extends Resource {
  /**
   * Namespace of the provider of the topic type.
   */
  provider?: string;
  /**
   * Display Name for the topic type.
   */
  displayName?: string;
  /**
   * Description of the topic type.
   */
  description?: string;
  /**
   * Region type of the resource. Possible values include: 'RegionalResource', 'GlobalResource'
   */
  resourceRegionType?: ResourceRegionType;
  /**
   * Provisioning state of the topic type. Possible values include: 'Creating', 'Updating',
   * 'Deleting', 'Succeeded', 'Canceled', 'Failed'
   */
  provisioningState?: TopicTypeProvisioningState;
  /**
   * List of locations supported by this topic type.
   */
  supportedLocations?: string[];
}

/**
 * An interface representing EventGridManagementClientOptions.
 */
export interface EventGridManagementClientOptions extends AzureServiceClientOptions {
  baseUri?: string;
}

/**
 * @interface
 * Result of the List EventSubscriptions operation
 * @extends Array<EventSubscription>
 */
export interface EventSubscriptionsListResult extends Array<EventSubscription> {
}

/**
 * @interface
 * Result of the List Operations operation
 * @extends Array<Operation>
 */
export interface OperationsListResult extends Array<Operation> {
}

/**
 * @interface
 * Result of the List Topics operation
 * @extends Array<Topic>
 */
export interface TopicsListResult extends Array<Topic> {
}

/**
 * @interface
 * Result of the List Event Types operation
 * @extends Array<EventType>
 */
export interface EventTypesListResult extends Array<EventType> {
}

/**
 * @interface
 * Result of the List Topic Types operation
 * @extends Array<TopicTypeInfo>
 */
export interface TopicTypesListResult extends Array<TopicTypeInfo> {
}

/**
 * Defines values for EventSubscriptionProvisioningState.
 * Possible values include: 'Creating', 'Updating', 'Deleting', 'Succeeded', 'Canceled', 'Failed',
 * 'AwaitingManualAction'
 * @readonly
 * @enum {string}
 */
export type EventSubscriptionProvisioningState = 'Creating' | 'Updating' | 'Deleting' | 'Succeeded' | 'Canceled' | 'Failed' | 'AwaitingManualAction';

/**
 * Defines values for TopicProvisioningState.
 * Possible values include: 'Creating', 'Updating', 'Deleting', 'Succeeded', 'Canceled', 'Failed'
 * @readonly
 * @enum {string}
 */
export type TopicProvisioningState = 'Creating' | 'Updating' | 'Deleting' | 'Succeeded' | 'Canceled' | 'Failed';

/**
 * Defines values for ResourceRegionType.
 * Possible values include: 'RegionalResource', 'GlobalResource'
 * @readonly
 * @enum {string}
 */
export type ResourceRegionType = 'RegionalResource' | 'GlobalResource';

/**
 * Defines values for TopicTypeProvisioningState.
 * Possible values include: 'Creating', 'Updating', 'Deleting', 'Succeeded', 'Canceled', 'Failed'
 * @readonly
 * @enum {string}
 */
export type TopicTypeProvisioningState = 'Creating' | 'Updating' | 'Deleting' | 'Succeeded' | 'Canceled' | 'Failed';

/**
 * Contains response data for the get operation.
 */
export type EventSubscriptionsGetResponse = EventSubscription & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscription;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type EventSubscriptionsCreateOrUpdateResponse = EventSubscription & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscription;
    };
};

/**
 * Contains response data for the update operation.
 */
export type EventSubscriptionsUpdateResponse = EventSubscription & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscription;
    };
};

/**
 * Contains response data for the getFullUrl operation.
 */
export type EventSubscriptionsGetFullUrlResponse = EventSubscriptionFullUrl & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionFullUrl;
    };
};

/**
 * Contains response data for the listGlobalBySubscription operation.
 */
export type EventSubscriptionsListGlobalBySubscriptionResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listGlobalBySubscriptionForTopicType operation.
 */
export type EventSubscriptionsListGlobalBySubscriptionForTopicTypeResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listGlobalByResourceGroup operation.
 */
export type EventSubscriptionsListGlobalByResourceGroupResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listGlobalByResourceGroupForTopicType operation.
 */
export type EventSubscriptionsListGlobalByResourceGroupForTopicTypeResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listRegionalBySubscription operation.
 */
export type EventSubscriptionsListRegionalBySubscriptionResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listRegionalByResourceGroup operation.
 */
export type EventSubscriptionsListRegionalByResourceGroupResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listRegionalBySubscriptionForTopicType operation.
 */
export type EventSubscriptionsListRegionalBySubscriptionForTopicTypeResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listRegionalByResourceGroupForTopicType operation.
 */
export type EventSubscriptionsListRegionalByResourceGroupForTopicTypeResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the listByResource operation.
 */
export type EventSubscriptionsListByResourceResponse = EventSubscriptionsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscriptionsListResult;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type EventSubscriptionsBeginCreateOrUpdateResponse = EventSubscription & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscription;
    };
};

/**
 * Contains response data for the beginUpdate operation.
 */
export type EventSubscriptionsBeginUpdateResponse = EventSubscription & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventSubscription;
    };
};

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = OperationsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: OperationsListResult;
    };
};

/**
 * Contains response data for the get operation.
 */
export type TopicsGetResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Topic;
    };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type TopicsCreateOrUpdateResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Topic;
    };
};

/**
 * Contains response data for the update operation.
 */
export type TopicsUpdateResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Topic;
    };
};

/**
 * Contains response data for the listBySubscription operation.
 */
export type TopicsListBySubscriptionResponse = TopicsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicsListResult;
    };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type TopicsListByResourceGroupResponse = TopicsListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicsListResult;
    };
};

/**
 * Contains response data for the listSharedAccessKeys operation.
 */
export type TopicsListSharedAccessKeysResponse = TopicSharedAccessKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicSharedAccessKeys;
    };
};

/**
 * Contains response data for the regenerateKey operation.
 */
export type TopicsRegenerateKeyResponse = TopicSharedAccessKeys & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicSharedAccessKeys;
    };
};

/**
 * Contains response data for the listEventTypes operation.
 */
export type TopicsListEventTypesResponse = EventTypesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventTypesListResult;
    };
};

/**
 * Contains response data for the beginCreateOrUpdate operation.
 */
export type TopicsBeginCreateOrUpdateResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Topic;
    };
};

/**
 * Contains response data for the beginUpdate operation.
 */
export type TopicsBeginUpdateResponse = Topic & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Topic;
    };
};

/**
 * Contains response data for the list operation.
 */
export type TopicTypesListResponse = TopicTypesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicTypesListResult;
    };
};

/**
 * Contains response data for the get operation.
 */
export type TopicTypesGetResponse = TopicTypeInfo & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: TopicTypeInfo;
    };
};

/**
 * Contains response data for the listEventTypes operation.
 */
export type TopicTypesListEventTypesResponse = EventTypesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: EventTypesListResult;
    };
};

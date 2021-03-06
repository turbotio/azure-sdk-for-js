// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  delay,
  SendableMessageInfo
} from "../lib";

import { TestMessage, getSenderReceiverClients, ClientType, purge } from "./testUtils";
import { Receiver, SessionReceiver } from "../lib/receiver";

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let ns: Namespace;
let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;

let receiver: Receiver | SessionReceiver;

async function beforeEachTest(
  senderType: ClientType,
  receiverType: ClientType,
  useSessions?: boolean
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  const clients = await getSenderReceiverClients(ns, senderType, receiverType);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  receiver = useSessions
    ? await receiverClient.getSessionReceiver({
        sessionId: TestMessage.sessionId
      })
    : receiverClient.getReceiver();
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("Simple Send", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testSimpleSend(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await senderClient.getSender().send(testMessages);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Simple Send", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSimpleSend();
  });

  it("Partitioned Topic: Simple Send", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSimpleSend();
  });

  it("Unpartitioned Queue: Simple Send", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSimpleSend();
  });

  it("Unpartitioned Topic: Simple Send", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSimpleSend();
  });

  it("Partitioned Queue with Sessions: Simple Send", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Partitioned Topic with Sessions: Simple Send", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Unpartitioned Queue with Sessions: Simple Send", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSimpleSend(true);
  });

  it("Unpartitioned Topic with Sessions: Simple Send", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSimpleSend(true);
  });
});

describe("Schedule single message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testScheduleMessage(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.getSender().scheduleMessage(scheduleTime, testMessages);

    const msgs = await receiver.receiveBatch(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(
      msgEnqueueTime - scheduleTime.valueOf() >= 0,
      true,
      "Enqueued time must be greater than scheduled time"
    ); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");

    await msgs[0].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testScheduleMessage();
  });

  it("Partitioned Topic: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testScheduleMessage();
  });

  it("Unpartitioned Queue: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testScheduleMessage();
  });

  it("Unpartitioned Topic: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testScheduleMessage();
  });

  it("Partitioned Queue with Sessions: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Partitioned Topic with Sessions: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Unpartitioned Queue with Sessions: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testScheduleMessage(true);
  });

  it("Unpartitioned Topic with Sessions: Schedule single message", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessage(true);
  });
});

describe("Schedule multiple messages", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  const messages: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
    }
  ];
  const messageWithSessions: SendableMessageInfo[] = [
    {
      body: "hello1",
      messageId: `test message ${Math.random()}`,
      sessionId: TestMessage.sessionId
    },
    {
      body: "hello2",
      messageId: `test message ${Math.random()}`,
      sessionId: TestMessage.sessionId
    }
  ];

  async function testScheduleMessages(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? messageWithSessions : messages;
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await senderClient.getSender().scheduleMessages(scheduleTime, testMessages);

    const msgs = await receiver.receiveBatch(2);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 2, "Unexpected number of messages");

    const msgEnqueueTime1 = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;
    const msgEnqueueTime2 = msgs[1].enqueuedTimeUtc ? msgs[1].enqueuedTimeUtc.valueOf() : 0;

    // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(
      msgEnqueueTime1 - scheduleTime.valueOf() >= 0,
      true,
      "msgEnqueueTime1 time must be greater than scheduled time"
    );
    should.equal(
      msgEnqueueTime2 - scheduleTime.valueOf() >= 0,
      true,
      "msgEnqueueTime2 time must be greater than scheduled time"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs[0].messageId),
      true,
      "MessageId of first message is different than expected"
    );
    should.equal(
      testMessages.some((x) => x.messageId === msgs[1].messageId),
      true,
      "MessageId of second message is different than expected"
    );

    await msgs[0].complete();
    await msgs[1].complete();

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Schedule multiple messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testScheduleMessages();
  });

  it("Partitioned Topic: Schedule multiple messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testScheduleMessages();
  });

  it("UnPartitioned Queue: Schedule multiple messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testScheduleMessages();
  });

  it("UnPartitioned Topic: Schedule multiple messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testScheduleMessages();
  });

  it("Partitioned Queue with Sessions: Schedule multiple messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Partitioned Topic with Sessions: Schedule multiple messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Unpartitioned Queue with Sessions: Schedule multiple messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testScheduleMessages(true);
  });

  it("Unpartitioned Topic with Sessions: Schedule multiple messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testScheduleMessages(true);
  });
});

describe("Cancel single Scheduled message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessage(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber = await senderClient
      .getSender()
      .scheduleMessage(scheduleTime, testMessages);

    await delay(2000);

    await senderClient.getSender().cancelScheduledMessage(sequenceNumber);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Cancel single Scheduled message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testCancelScheduleMessage();
  });

  it("Partitioned Topic: Cancel single Scheduled message", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testCancelScheduleMessage();
  });

  it("Unpartitioned Queue: Cancel single Scheduled message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testCancelScheduleMessage();
  });

  it("Unpartitioned Topic: Cancel single Scheduled message", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testCancelScheduleMessage();
  });

  it("Partitioned Queue with Sessions: Cancel single Scheduled message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Partitioned Topic with Sessions: Cancel single Scheduled message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Unpartitioned Queue with Sessions: Cancel single Scheduled message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });

  it("Unpartitioned Topic with Sessions: Cancel single Scheduled message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessage(true);
  });
});

describe("Cancel multiple Scheduled messages", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testCancelScheduleMessages(useSessions?: boolean): Promise<void> {
    const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();

    const sender = senderClient.getSender();
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const sequenceNumber1 = await sender.scheduleMessage(scheduleTime, testMessage);
    const sequenceNumber2 = await sender.scheduleMessage(scheduleTime, testMessage);

    await delay(2000);

    await sender.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testCancelScheduleMessages(false);
  });

  it("Partitioned Topic: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testCancelScheduleMessages(false);
  });

  it("Unpartitioned Queue: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testCancelScheduleMessages(false);
  });

  it("Unpartitioned Topic: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testCancelScheduleMessages(false);
  });

  it("Partitioned Queue with Sessions: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessages(true);
  });

  it("Partitioned Topic with Sessions: Cancel scheduled messages", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessages(true);
  });

  it("Unpartitioned Queue with Sessions: Cancel scheduled messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testCancelScheduleMessages(true);
  });

  it("Unpartitioned Topic with Sessions: Cancel scheduled messages", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testCancelScheduleMessages(true);
  });
});

describe("Message validations", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  it("MessageId validations", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    const sender = senderClient.getSender();
    let errorMessageIdDecimal = false;
    await sender.send({ body: "", messageId: 1.5 }).catch((err) => {
      errorMessageIdDecimal =
        err &&
        err.message === "'messageId must be a whole integer. Decimal points are not allowed.";
    });

    should.equal(
      errorMessageIdDecimal,
      true,
      "Error not thrown when messageId is not a whole number"
    );

    let errorMessageIdLongString = false;
    await sender
      .send({
        body: "",
        messageId:
          "A very very very very very very very very very very very very very very very very very very very very very very very very very long string."
      })
      .catch((err) => {
        errorMessageIdLongString =
          err &&
          err.message ===
            "Length of 'messageId' of type 'string' cannot be greater than 128 characters.";
      });

    should.equal(
      errorMessageIdLongString,
      true,
      "Error not thrown when messageId is not a whole number"
    );
  });
});

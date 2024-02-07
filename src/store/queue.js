import Messages from "@/store/messages";
import Threads from "@/store/threads";
/* eslint-disable no-unused-vars */
import { Table, UpdateSpec, TKey } from "dexie";
import { Store } from "vuex";

/** @type {Queue} */
export let messageQueue;
/** @type {Queue} */
export let threadMessageQueue;

/**
 * @param {Store} store
 */
export function initializeQueues(store) {
  messageQueue = new Queue(store, Messages.table, "messageQueue");
  threadMessageQueue = new Queue(store, Threads.table, "threadMessageQueue");
}

export function startQueuesProcessing() {
  messageQueue.processQueue();
  threadMessageQueue.processQueue();
}

class Queue {
  /** @type {Store} */
  store;
  /** @type {Table} */
  table;
  _queue = [];
  queueName = "";
  isProcessing = false;

  static DEFAULT_UPDATE_DEBOUNCE_INTERVAL = 100;
  debounceTime = Queue.DEFAULT_UPDATE_DEBOUNCE_INTERVAL;

  get queue() {
    return this._queue;
  }

  /**
   * @param {Store} store
   * @param {Table} table
   * @param {string} queueName
   */
  constructor(store, table, queueName = "") {
    this.table = table;
    this.store = store;
    this.queueName = queueName;
  }

  async processQueue() {
    if (!this.isProcessing && this.queue.length > 0) {
      this.isProcessing = true;

      this.setUpdateDebounceTime();

      const mergedMessages = [];
      /** @type {Array.<{key: TKey, changes: UpdateSpec}>} */
      const indexMap = {};

      // console.log(this.queueName);
      // console.table(
      //   this.queue.map((obj) => {
      //     return {
      //       index: obj.index,
      //       content: obj.message.content,
      //       done: obj.message.done,
      //     };
      //   }),
      // );

      const queueCopy = [...this.queue];
      for (const item of queueCopy) {
        const index = item.index;
        if (!indexMap[index]) {
          indexMap[index] = { key: index, changes: {} };
          mergedMessages.push(indexMap[index]);
        }
        for (const propKey in item.message) {
          indexMap[index].changes[propKey] = item.message[propKey];
        }
        this.queue.shift(); // remove from queue
      }

      // console.log(this.queueName + " result");
      // console.table(
      //   mergedMessages.map((obj) => {
      //     return {
      //       index: obj.key,
      //       content: obj.changes.content,
      //       done: obj.changes.done,
      //     };
      //   }),
      // );

      await this.table.bulkUpdate(mergedMessages);

      this.isProcessing = false;
    }
    setTimeout(this.processQueue.bind(this), this.debounceTime);
  }

  setUpdateDebounceTime() {
    if (typeof this.store.state.chat.updateDebounceInterval === "number") {
      this.debounceTime = this.store.state.chat.updateDebounceInterval;
    } else {
      this.debounceTime = Queue.DEFAULT_UPDATE_DEBOUNCE_INTERVAL;
    }
  }
}

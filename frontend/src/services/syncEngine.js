import { api } from './api';

const OFFLINE_QUEUE_KEY = 'storemind_offline_bills_queue';

export const syncEngine = {
  // Check browser online network state
  isOnline: () => typeof navigator !== 'undefined' && navigator.onLine,

  // Save bill to local offline queue
  queueOfflineBill: (billData) => {
    const queue = syncEngine.getOfflineQueue();
    const localBill = {
      ...billData,
      local_id: `offline_${Date.now()}`,
      created_at: new Date().toISOString()
    };
    queue.push(localBill);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    return localBill;
  },

  // Get all queued offline bills
  getOfflineQueue: () => {
    const data = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Push local queued bills to cloud DB
  syncPush: async () => {
    if (!syncEngine.isOnline()) return { synced: 0, reason: 'offline' };
    const queue = syncEngine.getOfflineQueue();
    if (queue.length === 0) return { synced: 0, reason: 'queue_empty' };

    try {
      const res = await api.post('/sync/push', { bills: queue });
      if (res.data?.status === 'success') {
        localStorage.removeItem(OFFLINE_QUEUE_KEY);
        return { synced: res.data.synced_bills_count, status: 'complete' };
      }
    } catch (err) {
      console.error('Offline push sync error:', err);
    }
    return { synced: 0, reason: 'sync_error' };
  },

  // Pull master catalog from cloud DB to local cache
  syncPull: async () => {
    if (!syncEngine.isOnline()) return null;
    try {
      const res = await api.get('/sync/pull');
      if (res.data) {
        localStorage.setItem('storemind_master_products', JSON.stringify(res.data.products));
        localStorage.setItem('storemind_master_customers', JSON.stringify(res.data.customers));
        return res.data;
      }
    } catch (err) {
      console.error('Offline pull sync error:', err);
    }
    return null;
  }
};

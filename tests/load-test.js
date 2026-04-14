import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function main() {
  const base = 'http://34.132.56.98:8080';

  const health = http.get(`${base}/health`);
  check(health, { 'health status 200': (r) => r.status === 200 });

  const items = http.get(`${base}/items`);
  check(items, { 'items status 200': (r) => r.status === 200 });

  sleep(1);
}

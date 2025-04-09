import { http, HttpResponse } from 'msw';
import { data as mockSpices } from './data/spices';
import { data as mockBlends } from './data/blends';
import { Blend } from '../types';

const blendsData: Blend[] = mockBlends();

export const handlers = [
  http.get('/api/v1/spices', () => {
    return HttpResponse.json(mockSpices());
  }),
  http.get('/api/v1/spices/:id', ({ params }) => {
    const spice = mockSpices().find((spice) => spice.id === Number(params.id));

    if (!spice) {
      return new HttpResponse('Not found', { status: 404 });
    }

    return HttpResponse.json(spice);
  }),
  http.get('/api/v1/blends', () => {
    return HttpResponse.json(mockBlends());
  }),
  http.post('/api/v1/blends', async ({ request }) => {
    let requestData = await request.json() as Blend;

    requestData = {
      ...requestData,
      id: blendsData.length,
    }

    blendsData.push(requestData);

    return HttpResponse.json(requestData);
  }),
  http.get('/api/v1/blends/:id', ({ params }: { params: { id: string } }) => {
    const blend = mockBlends().find((blend) => blend.id === Number(params.id));

    if (!blend) {
      return new HttpResponse('Not found', { status: 404 });
    }

    return HttpResponse.json(blend);
  }),
];
